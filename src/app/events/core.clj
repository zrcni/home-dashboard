(ns app.events.core
  (:require [cljfx.api :as fx]
            [app.cljfx-utils :refer [ctx-state]]
            [app.events.handlers :as handlers]
            [app.state :refer [*context]]
            [app.events.effects :as effects]))

(def handle-event
  (-> handlers/handle-event
      (fx/wrap-co-effects
       {:fx/context (fx/make-deref-co-effect *context)
        :state #(ctx-state @*context)})
      (fx/wrap-effects
       {:context (fx/make-reset-effect *context)
        :dispatch fx/dispatch-effect
        :dispatch-n effects/dispatch-n
        :activate-mode-wolfenstein! effects/activate-mode-wolfenstein!
        :deactivate-mode-wolfenstein! effects/deactivate-mode-wolfenstein!})))

(defn dispatch [event]
  (handle-event event))