(ns app.views.main.wolfenstein
  (:require [app.events.api :refer [create-event]]))

(defn image [{:keys [image on-click]}]
  {:fx/type :image-view
   :on-mouse-clicked on-click
   :image image})

(defn wolfenstein-view [{:keys [mode]}]
  {:fx/type image
   :on-click (create-event :show-menu)
   :image (:image mode)})
