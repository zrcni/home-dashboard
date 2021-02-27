(ns app.events.core
  (:require [app.state.core :refer [*context]]
            [app.events.factory :as factory]
            [app.events.effects :as effects]))
        
(def handle-event
  (factory/create-handler {:context *context
                           :effects {:activate-mode-wolfenstein! effects/activate-mode-wolfenstein!
                                     :deactivate-mode-wolfenstein! effects/deactivate-mode-wolfenstein!}}))

(def dispatch (factory/create-dispatcher handle-event))
