(ns app.core
  (:import java.time.Instant)
  (:require [cljfx.api :as fx]
            [app.views.core :as views]
            [app.state :refer [*state]]
            [app.events.api :refer [create-event]]
            [app.events.core :refer [dispatch]]
            [app.temperature-mode.core :as temperature-mode]))

(temperature-mode/subscribe
 (fn [payload]
   (let [data (assoc payload :timestamp (Instant/ofEpochSecond (:timestamp payload)))]
     (dispatch (create-event :temperature-updated data)))))

(def renderer
  (fx/create-renderer
   :opts {:fx.opt/map-event-handler
          #(dispatch (select-keys % [:event/type :event/data]))}
   :middleware (fx/wrap-map-desc #'views/root)))

(defn mount []
  (fx/mount-renderer *state renderer))

(defn unmount []
  (fx/unmount-renderer *state renderer))

(def start mount)
(def stop unmount)
