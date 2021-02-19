(ns scratch
  (:require [clojure.core.async :refer [put! <! go-loop]]
            [user :refer [start stop rerender]]
            [app.events.core :as events]
            [app.state :refer [*state]]
            [app.events.api :refer [create-event]]
            [app.wolfenstein-mode.core :as wolfenstein]
            [app.temperature-mode.core :as temperature]))

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
@wolfenstein/*chan

(reset! wolfenstein/*prev-image-n nil)

;; RPi terminal session seems to become
;; frozen sometimes, so this kills it
(System/exit 0)

(require 'app.mqtt)
(require 'app.temperature-mode.mqtt)
(app.mqtt/publish "/devices/rpi/events/temperature_updated" {:temperature 20.2 :humidity 30.1})

(put! temperature/in-ch {:temperature 21.1
                         :humidity 40.1})

;; eval this in dev to simulate temperature
;; update requests when temperature mode is activated
(go-loop []
  (<! temperature/out-ch)
  (put! temperature/in-ch {:temperature 21.1
                           :humidity 40.1})
  (recur))
