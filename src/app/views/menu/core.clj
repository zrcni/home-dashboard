(ns app.views.menu.core
  (:require [cljfx.css :as css]
            [app.events :as events]))

(defn menu-button [{:keys [text on-action]}]
  {:fx/type :button
   :style-class ["button" "menu-button"]
   :on-action on-action
   :text text})

(defn menu [_]
  {:fx/type :v-box
   :alignment :center
   :children [{:fx/type menu-button
               :text "Hide menu"
               :on-action {:event/type ::events/hide-menu}}
              {:fx/type menu-button
               :text "Static image"
               :on-action {:event/type ::events/change-mode
                           :mode :static-image}}
              {:fx/type menu-button
               :text "Wolfenstein"
               :on-action {:event/type ::events/change-mode
                           :mode :wolfenstein}}
              {:fx/type menu-button
               :text "Temperature"
               :on-action {:event/type ::events/change-mode
                           :mode :temperature}}]})

(defn menu-view [{:keys [style]}]
  {:fx/type :scene
   :stylesheets [(::css/url style)]
   :root {:fx/type :v-box
          :alignment :center
          :children [{:fx/type menu}]}})
