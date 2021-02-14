(ns app.views.main.static-image
  (:require [app.events :as events]))


(defn image [{:keys [image on-click]}]
  {:fx/type :image-view
   :on-mouse-clicked on-click
   :image image})

(defn static-image-view []
  {:fx/type image
   :on-click {:event/type ::events/show-menu}
   :image "app/images/batmaaaaan.jpg"})
