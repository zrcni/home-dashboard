(ns app.conditions.core
  (:import java.time.Instant)
  (:require [app.logger :as log]
            [clojure.core.async :refer [chan go-loop <!]]
            [app.events.core :refer [dispatch]]
            [app.events.api :refer [create-event]]))

(def *callbacks (atom #{}))

(def in-ch (chan))

(defn subscribe [callback]
  (swap! *callbacks conj callback)
  (fn [] (swap! *callbacks disj callback)))

(defn on-msg [msg]
  (doseq [callback @*callbacks]
    (try 
      (callback msg)
      (catch Exception err
        (log/error err)))))

(defonce receiver-ch
  (go-loop []
    (on-msg (<! in-ch))
    (recur)))

(defn format-payload [payload]
  (assoc payload :timestamp (Instant/ofEpochSecond (:timestamp payload))))

(subscribe
 (fn [payload]
   (dispatch (create-event :conditions/updated (format-payload payload)))))
