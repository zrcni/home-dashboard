(ns scratch
  (:require [app.dev :refer [send-mock-condition-update]]
            [app.events.core :as events]
            [app.core :refer [start stop]]
            [app.state.core :refer [*context]]
            [app.cljfx-utils :refer [ctx-state]]
            [clojure.tools.namespace.repl :refer [refresh]]))

(start)
(stop)

(refresh)

#_:clj-kondo/ignore
(require '[app.events.core :as events])
(events/dispatch :menu/show)
(events/dispatch :menu/hide)
(events/dispatch :show-view/gallery)
(events/dispatch :show-view/wolfenstein)
(events/dispatch :show-view/dashboard)
(events/dispatch :fullscreen/enter)
(events/dispatch :fullscreen/exit)
(events/dispatch :toolbar/toggle-visibility)

(if (:fullscreen? (ctx-state @*context))
  (events/dispatch :fullscreen/exit)
  (events/dispatch :fullscreen/enter))

(events/dispatch :wolfenstein/image-updated {:img-n 1})

@*context
#_:clj-kondo/ignore
(require '[app.state.core :refer [*context]]
         '[app.cljfx-utils :refer [ctx-state]])
(ctx-state @*context)
(:gallery (ctx-state @*context))

;; RPi REPL session seems to become
;; frozen sometimes, so this kills it
(System/exit 0)

(require 'app.mqtt)
(app.mqtt/connect!)
(require 'app.conditions.mqtt)
(app.conditions.mqtt/subscribe)

(send-mock-condition-update)
