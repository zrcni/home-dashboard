(ns app.dev
  (:import java.time.Instant)
  (:require [cljfx.api :as fx]
            [clojure.core.async :refer [put! <! timeout go-loop]]
            [app.state.core :refer [*context]]
            [app.styles :refer [style]]
            [app.conditions.core :as conditions]
            [app.shutdown :as shutdown]
            [app.renderer :as renderer]
            [app.events.core :refer [dispatch]]
            [app.events.api :refer [create-event]]
            [app.gallery.core :as gallery]))

;; Refresh styles in state whenever they change to
;; make the app rerender with updated styles.
(add-watch #'style :refresh-styles (fn [_ _ _ _]
                                     (swap! *context fx/swap-context assoc :style style)))

(defn rand-float [min max]
  (+ min (rand (- max min))))

(defn round1 [n]
  (Float/parseFloat (format "%.1f" n)))

(defn gen-conditions-updated-event []
  {:temperature (round1 (rand-float 20 25))
   :humidity (round1 (rand-float 30 45))
   :timestamp (/ (.toEpochMilli (Instant/now)) 1000)})

(defn send-mock-condition-update []
  (put! conditions/in-ch (gen-conditions-updated-event)))

;; send mocked condition updates with
;; randomized values every minute in dev
(defonce sender-ch
  (go-loop []
    (send-mock-condition-update)
    (<! (timeout (* 60 1000)))
    (recur)))

(shutdown/add-hook :renderer/unmount renderer/unmount!)
(shutdown/add-hook :clojure.core/shutdown-agents shutdown-agents)

(gallery/on-refresh #(dispatch (create-event :gallery/images-refreshed {:images %})))
