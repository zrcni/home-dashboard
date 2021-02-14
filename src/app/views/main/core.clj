(ns app.views.main.core
  (:require [cljfx.css :as css]
            [app.views.main.static-image :refer [static-image-view]]))

(defn main-view [{:keys [style mode]}]
  {:fx/type :scene
   :stylesheets [(::css/url style)]
   :root {:fx/type :v-box
          :alignment :center
          :children (case mode
                      :static-image [{:fx/type static-image-view}]
                      [])}})
