(ns app.components.core)

;; TODO: fade out
(defn toolbar [{:keys [actions]}]
  {:fx/type :h-box
   :pick-on-bounds false
   :alignment :bottom-center
   :children (mapv (fn [a]
                     {:fx/type :button
                      :style-class ["button" "toolbar-button"]
                      :on-action (:on-action a)
                      :text (:text a)})
                   actions)})
