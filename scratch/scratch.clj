(ns scratch
  (:require [app.dev :refer [send-mock-temperature-update]]
            [app.events.core :as events]
            [app.core :refer [start stop]]
            [app.state.core :refer [*context]]
            [app.cljfx-utils :refer [ctx-state]]
            [clojure.tools.namespace.repl :refer [refresh]]))

(start)
(stop)

(refresh)

(events/dispatch :show-menu)
(events/dispatch :hide-menu)
(events/dispatch :activate-mode-static-image)
(events/dispatch :activate-mode-wolfenstein)
(events/dispatch :activate-mode-temperature)
(events/dispatch :enter-fullscreen)
(events/dispatch :exit-fullscreen)

(if (:fullscreen? (ctx-state @*context))
  (events/dispatch :exit-fullscreen)
  (events/dispatch :enter-fullscreen))

(events/dispatch :wolfenstein-image-updated {:img-n 1})

@*context
(ctx-state @*context)
(:static-image (:modes (ctx-state @*context)))

;; RPi REPL session seems to become
;; frozen sometimes, so this kills it
(System/exit 0)

(require 'app.mqtt)
(app.mqtt/connect!)
(require 'app.temperature-mode.mqtt)
(app.temperature-mode.mqtt/subscribe)

(send-mock-temperature-update)
