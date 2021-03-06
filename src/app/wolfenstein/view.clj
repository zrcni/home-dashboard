(ns app.wolfenstein.view
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.components.core :refer [create-view-with-overlay]]))

(defn wolfenstein-image [{:keys [image]}]
  {:fx/type :image-view
   :fit-width 480
   :preserve-ratio true
   :style-class "main-image"
   :image image})

(defn root [{:keys [fx/context]}]
  (let [mode (fx/sub-ctx context subs/wolfenstein)]
    (create-view-with-overlay
     {:fx/type wolfenstein-image
      :style-class "main-view"
      :image (:image mode)})))
