(ns app.views.main.core
  (:require [cljfx.api :as fx]
            [cljfx.css :as css]
            [app.config :refer [cfg]]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]
            [app.views.main.static-image :refer [static-image-view]]
            [app.views.main.wolfenstein :refer [wolfenstein-view]]
            [app.views.main.temperature :refer [temperature-view]]))

(defn main-view [{:keys [fx/context]}]
  (let [style (fx/sub-ctx context subs/style)
        active-mode (fx/sub-ctx context subs/active-mode)]
    {:fx/type :scene
     :stylesheets [(::css/url style)]
     :cursor (if (:cursor? cfg) :default :none)
     :root {:fx/type :v-box
            :alignment :center
            :style-class "main-view"
            :on-mouse-clicked (create-event :show-menu)
            :children (case active-mode
                        :static-image [{:fx/type static-image-view}]
                        :wolfenstein [{:fx/type wolfenstein-view}]
                        :temperature [{:fx/type temperature-view}]
                        [])}}))
