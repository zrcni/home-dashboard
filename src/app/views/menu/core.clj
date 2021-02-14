(ns app.views.menu.core
  (:require [app.events :as events]))

(defn menu [props]
  {:fx/type :v-box
   :alignment :center
   :children [{:fx/type :button
               :on-action {:event/type ::events/hide-menu}
               :text "Hide menu"}
              {:fx/type :button
               :on-action {:event/type ::events/change-mode
                           :mode :static-image}
               :text "Static image"}
              {:fx/type :button
               :on-action {:event/type ::events/change-mode
                           :mode :wolfenstein}
               :text "Wolfenstein"}
              {:fx/type :button
               :on-action {:event/type ::events/change-mode
                           :mode :temperature}
               :text "Temperature"}]})

(defn menu-view []
  {:fx/type :scene
   :root {:fx/type :v-box
          :alignment :center
          :children [{:fx/type menu}]}})
