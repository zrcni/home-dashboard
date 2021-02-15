(ns app.views.main.static-image)

(defn image [{:keys [image]}]
  {:fx/type :image-view
   :style-class "main-image"
   :image image})

(defn static-image-view [{:keys [mode]}]
  {:fx/type image
   :image (:image mode)})
