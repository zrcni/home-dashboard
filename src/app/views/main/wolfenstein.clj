(ns app.views.main.wolfenstein
  (:require [app.events :as events]))


(defn image [{:keys [image on-click]}]
  {:fx/type :image-view
   :on-mouse-clicked on-click
   :image image})

(defn wolfenstein-view [{:keys [mode]}]
  {:fx/type image
   :on-click {:event/type ::events/show-menu}
   :image (:image mode)})
