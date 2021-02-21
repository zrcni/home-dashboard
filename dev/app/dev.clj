(ns app.dev
  (:import java.time.Instant)
  (:require [clojure.core.async :refer [put! <! timeout go-loop]]
   [app.state :refer [*state]]
            [app.styles :refer [style]]
            [app.temperature-mode.core :as temperature-mode]))

;; Refresh styles in state whenever they change to
;; make the app rerender with updated styles.
(add-watch #'style :refresh-styles (fn [_ _ _ _]
                                     (swap! *state assoc :style style)))

(defn rand-float [min max]
  (+ min (rand (- max min))))

(defn round1 [n]
  (Float/parseFloat (format "%.1f" n)))

(defn send-random-temperature-update []
  (put! temperature-mode/in-ch {:temperature (round1 (rand-float 20 25))
                                :humidity (round1 (rand-float 30 45))
                                :timestamp (/ (.toEpochMilli (Instant/now)) 1000)}))

;; send a temperature update with
;; randomized values every minute in dev
(go-loop []
  (send-random-temperature-update)
  (<! (timeout (* 60 1000)))
  (recur))
