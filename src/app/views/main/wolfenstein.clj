(ns app.views.main.wolfenstein)

(defn image [{:keys [image]}]
  {:fx/type :image-view
   :style-class "main-image"
   :image image})

(defn wolfenstein-view [{:keys [mode]}]
  {:fx/type image
   :image (:image mode)})
