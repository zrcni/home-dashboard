(ns app.views.main.core
  (:require [app.views.main.static-image :refer [static-image-view]]))

(defn main-view [{:keys [mode]}]
  {:fx/type :scene
   :root {:fx/type :v-box
          :alignment :center
          :children (case mode
                      :static-image [(static-image-view)]
                      [])}})
