(ns scratch
  (:require [app.dev :refer [send-random-temperature-update]]
            [app.events.core :as events]
            [app.core :refer [start stop]]
            [app.state :refer [*state]]
            [app.events.api :refer [create-event]]
            [clojure.tools.namespace.repl :refer [refresh]]))

(events/dispatch (create-event :show-menu))
(events/dispatch (create-event :hide-menu))
(events/dispatch (create-event :activate-mode-static-image))
(events/dispatch (create-event :activate-mode-wolfenstein))
(events/dispatch (create-event :activate-mode-temperature))

(start)
(stop)

(events/dispatch (create-event :wolfenstein-image-updated {:img-n 1}))

@*state

;; toggle fullscreen
(swap! *state update :fullscreen? not)

;; RPi REPL session seems to become
;; frozen sometimes, so this kills it
(System/exit 0)

(require 'app.mqtt)
(app.mqtt/connect)
(require 'app.temperature-mode.mqtt)
(app.temperature-mode.mqtt/subscribe)

(send-random-temperature-update)
