(ns app.views.main.static-image
  (:require [cljfx.api :as fx]
            [app.subs :as subs]))

(defn image [{:keys [image]}]
  {:fx/type :image-view
   :style-class "main-image"
   :image image})

(defn static-image-view [{:keys [fx/context]}]
  (let [mode (fx/sub-ctx context subs/static-image-mode)]
    {:fx/type image
     :image (:image mode)}))
