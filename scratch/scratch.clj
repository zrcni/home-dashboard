(ns scratch
  (:import java.time.Instant)
  (:require [clojure.core.async :refer [put!]]
            [user :refer [start stop rerender]]
            [app.events.core :as events]
            [app.state :refer [*state]]
            [app.events.api :refer [create-event]]
            [app.temperature-mode.core :as temperature-mode]))

(events/dispatch (create-event :show-menu))
(events/dispatch (create-event :hide-menu))
(events/dispatch (create-event :activate-mode-static-image))
(events/dispatch (create-event :activate-mode-wolfenstein))
(events/dispatch (create-event :activate-mode-temperature))

(start)
(stop)
(rerender)
 
(events/dispatch (create-event :wolfenstein-image-updated {:img-n 1}))

@*state

;; toggle fullscreen
(swap! *state update :fullscreen? not)

;; RPi REPL session seems to become
;; frozen sometimes, so this kills it
(System/exit 0)

(require 'app.mqtt)
(require 'app.temperature-mode.mqtt)
(app.mqtt/publish "/devices/rpi/events/temperature_updated" {:temperature 20.2 :humidity 30.1})

;; send mock temperature update
(let [rand-float (fn [min max] (+ min (rand (- max min))))
      round2 (fn [n] (Float/parseFloat (format "%.1f" n)))]
  (put! temperature-mode/in-ch {:temperature (round2 (rand-float 20 25))
                                :humidity (round2 (rand-float 30 45))
                                :timestamp (.toEpochMilli (Instant/now))}))

