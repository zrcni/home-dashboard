(ns app.events.core
  (:require [app.state.core :refer [*context]]
            [app.events.factory :as factory]))
        
(def handle-event
  (factory/create-handler {:context *context}))

(def dispatch
  (factory/create-dispatcher handle-event))
