(ns app.state.core
  (:require [app.state.default-state :refer [default-state]]
            [app.state.factory :refer [create-context]]
            [app.styles :refer [style]]))

(def *context
  (atom (create-context (merge default-state {:style style}))))
