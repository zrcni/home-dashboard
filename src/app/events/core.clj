(ns app.events.core
  (:require [app.logger :as log]
            [app.events.api :as events-api]
            [app.events.handlers :as handlers]
            [app.state :refer [*state]]))

(def *channels (atom {}))

(defn dispatch [event]
  (events-api/dispatch *channels event))

(defn subscribe [event-type callback]
  (events-api/subscribe *channels *state event-type callback))

(handlers/register subscribe)

(subscribe :global (fn [e & _]
                     ;; TODO: temporary
                     (when-not (= :update-temperature-date-format (:event/type e))
                       (log/debug e))))
