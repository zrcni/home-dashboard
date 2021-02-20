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

(defn toggle-fullscreen []
  (let [enabled? (:fullscreen? @*state)]
    (swap! *state assoc :fullscreen? (not enabled?))))

(toggle-fullscreen)

;; RPi REPL session seems to become
;; frozen sometimes, so this kills it
(System/exit 0)

(require 'app.mqtt)
(require 'app.temperature-mode.mqtt)
(app.mqtt/publish "/devices/rpi/events/temperature_updated" {:temperature 20.2 :humidity 30.1})

(put! temperature-mode/in-ch {:temperature 21.1
                         :humidity 40.1
                         :timestamp (.toEpochMilli (Instant/now))})
