(ns app.core
  (:import java.time.Instant)
  (:require [cljfx.api :as fx]
            [app.views.core :as views]
            [app.state :refer [*context]]
            [app.events.api :refer [create-event]]
            [app.events.core :refer [dispatch handle-event]]
            [app.temperature-mode.core :as temperature-mode]))

(temperature-mode/subscribe
 (fn [payload]
   (let [data (assoc payload :timestamp (Instant/ofEpochSecond (:timestamp payload)))]
     (dispatch (create-event :temperature-updated data)))))

(def renderer
  (fx/create-renderer
   :middleware (comp
                fx/wrap-context-desc
                (fx/wrap-map-desc (fn [_] {:fx/type views/root})))
   :opts {:fx.opt/type->lifecycle #(or (fx/keyword->lifecycle %)
                                       (fx/fn->lifecycle-with-context %))
          :fx.opt/map-event-handler handle-event}))

(defn mount []
  (fx/mount-renderer *context renderer))

(defn unmount []
  (fx/unmount-renderer *context renderer))

(def start mount)
(def stop unmount)
