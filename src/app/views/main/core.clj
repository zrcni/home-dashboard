(ns app.views.main.core
  (:require [cljfx.css :as css]
            [app.events.api :refer [create-event]]
            [app.views.main.static-image :refer [static-image-view]]
            [app.views.main.wolfenstein :refer [wolfenstein-view]]))

(defn main-view [{:keys [style active-mode modes]}]
  {:fx/type :scene
   :stylesheets [(::css/url style)]
   :root {:fx/type :v-box
          :alignment :center
          :style-class "main-view"
          :on-mouse-clicked (create-event :show-menu)
          :children (case active-mode
                      :static-image [{:fx/type static-image-view
                                      :mode (:static-image modes)}]
                      :wolfenstein [{:fx/type wolfenstein-view
                                     :mode (:wolfenstein modes)}]
                      [])}})
