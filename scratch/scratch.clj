(ns scratch
  (:require [app.dev :refer [send-mock-temperature-update]]
            [app.events.core :as events]
            [app.core :refer [start stop]]
            [app.state :refer [*context]]
            [app.events.api :refer [create-event]]
            [app.cljfx-utils :refer [ctx-state]]
            [clojure.tools.namespace.repl :refer [refresh]]))

(start)
(stop)

(events/dispatch (create-event :show-menu))
(events/dispatch (create-event :hide-menu))
(events/dispatch (create-event :activate-mode-static-image))
(events/dispatch (create-event :activate-mode-wolfenstein))
(events/dispatch (create-event :activate-mode-temperature))
(events/dispatch (create-event :enter-fullscreen))
(events/dispatch (create-event :exit-fullscreen))


(if (:fullscreen? (ctx-state @*context))
  (events/dispatch (create-event :exit-fullscreen))
  (events/dispatch (create-event :enter-fullscreen)))

(events/dispatch (create-event :wolfenstein-image-updated {:img-n 1}))

@*context
(ctx-state @*context)

;; RPi REPL session seems to become
;; frozen sometimes, so this kills it
(System/exit 0)

(require 'app.mqtt)
(app.mqtt/connect)
(require 'app.temperature-mode.mqtt)
(app.temperature-mode.mqtt/subscribe)

(send-mock-temperature-update)
