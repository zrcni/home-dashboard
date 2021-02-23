(ns app.views.main.wolfenstein
  (:require [cljfx.api :as fx]
            [app.subs :as subs]))

(defn image [{:keys [image]}]
  {:fx/type :image-view
   :fit-width 480
   :preserve-ratio true
   :style-class "main-image"
   :image image})

(defn wolfenstein-view [{:keys [fx/context]}]
  (let [mode (fx/sub-ctx context subs/wolfenstein-mode)]
    {:fx/type image
     :image (:image mode)}))
