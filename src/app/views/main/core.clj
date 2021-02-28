(ns app.views.main.core
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.views.main.gallery :refer [gallery-view]]
            [app.views.main.wolfenstein :refer [wolfenstein-view]]
            [app.views.main.temperature :refer [temperature-view]]))

(defn main-view [{:keys [fx/context]}]
  (let [active-mode (fx/sub-ctx context subs/active-mode)]
    {:fx/type :v-box
     :alignment :center
     :style-class "main-view"
     :children (case active-mode
                 :gallery [{:fx/type gallery-view}]
                 :wolfenstein [{:fx/type wolfenstein-view}]
                 :temperature [{:fx/type temperature-view}]
                 [])}))
