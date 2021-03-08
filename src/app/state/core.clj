(ns app.state.core
  (:require [app.state.default-state :refer [default-state]]
            [app.state.factory :refer [create-context]]
            [app.styles :refer [style]]
            [app.cljfx-utils :refer [ctx-state]]))

(def *context
  (atom (create-context (merge default-state {:style style}))))

;; TODO: use spec coercion to accomplish this
(defn deserialize-state [state]
  {:last-updated (-> state :conditions :last-updated (str))
   :active-view (-> state :active-view)})

;; TODO: debounce
(defn on-updated [f]
  (add-watch *context :state-updated (fn [_ _ _ new-context]
                                       (f (deserialize-state (ctx-state new-context))))))
