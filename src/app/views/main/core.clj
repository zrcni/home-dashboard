(ns app.views.main.core
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.views.main.static-image :refer [static-image-view]]
            [app.views.main.wolfenstein :refer [wolfenstein-view]]
            [app.views.main.temperature :refer [temperature-view]]))

(defn main-view [{:keys [fx/context]}]
  (let [active-mode (fx/sub-ctx context subs/active-mode)]
    {:fx/type :v-box
     :alignment :center
     :style-class "main-view"
     :children (case active-mode
                 :static-image [{:fx/type static-image-view}]
                 :wolfenstein [{:fx/type wolfenstein-view}]
                 :temperature [{:fx/type temperature-view}]
                 [])}))
