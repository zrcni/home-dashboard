(ns app.components.core
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]))

(defn toolbar-action [{:keys [fx/context text on-action]}]
  (let [toolbar-visible? (fx/sub-ctx context subs/toolbar-visible?)]
    {:fx/type :button
     :style-class (filterv #(some? %)
                           ["button" "toolbar-button"
                            (when-not toolbar-visible? "transparent")])
     :on-action (if toolbar-visible?
                  on-action
                  (create-event :toolbar/toggle-visibility))
     :text text}))

(def hide-button {:fx/type toolbar-action
                  :on-action (create-event :toolbar/toggle-visibility)
                  :visible? true
                  :text "X"})

;; TODO: fade out
(defn toolbar [{:keys [actions]}]
    {:fx/type :h-box
     :pick-on-bounds false
     :alignment :bottom-center
     :children (cons hide-button
                     (mapv #(merge % {:fx/type toolbar-action}) actions))})
