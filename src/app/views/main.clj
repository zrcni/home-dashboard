(ns app.views.main
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.gallery.view :as gallery-view]
            [app.wolfenstein.view :as wolfenstein-view]
            [app.dashboard.view :as dashboard-view]))

(defn root [{:keys [fx/context]}]
  (let [active-view (fx/sub-ctx context subs/active-view)]
    {:fx/type :v-box
     :alignment :center
     :style-class "main-view"
     :children (case active-view
                 :gallery [{:fx/type gallery-view/root}]
                 :wolfenstein [{:fx/type wolfenstein-view/root}]
                 :dashboard [{:fx/type dashboard-view/root}]
                 [])}))
