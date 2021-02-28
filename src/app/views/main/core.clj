(ns app.views.main.core
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.views.main.gallery :refer [gallery-view]]
            [app.views.main.wolfenstein :refer [wolfenstein-view]]
            [app.views.main.dashboard :refer [dashboard-view]]))

(defn main-view [{:keys [fx/context]}]
  (let [active-view (fx/sub-ctx context subs/active-view)]
    {:fx/type :v-box
     :alignment :center
     :style-class "main-view"
     :children (case active-view
                 :gallery [{:fx/type gallery-view}]
                 :wolfenstein [{:fx/type wolfenstein-view}]
                 :dashboard [{:fx/type dashboard-view}]
                 [])}))
