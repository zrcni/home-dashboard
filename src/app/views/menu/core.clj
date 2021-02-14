(ns app.views.menu.core
  (:require [cljfx.css :as css]
            [app.events :as events]))

(defn menu-button [{:keys [text on-action]}]
  {:fx/type :button
   :style-class ["button" "menu-button"]
   :on-action on-action
   :text text
   :pref-height 100
   :pref-width 400})

(defn menu [{:keys [active-mode]}]
  {:fx/type :v-box
   :alignment :center
   :children [{:fx/type menu-button
               :text "Hide menu"
               :on-action {:event/type ::events/hide-menu}}
              {:fx/type menu-button
               :text "Static image"
               :active? (= :static-image active-mode)
               :on-action {:event/type ::events/change-mode
                           :event/data {:mode :static-image}}}
              {:fx/type menu-button
               :text "Wolfenstein"
               :active? (= :wolfenstein active-mode)
               :on-action {:event/type ::events/change-mode
                           :event/data {:mode :wolfenstein}}}
              {:fx/type menu-button
               :text "Temperature"
               :active? (= :temperature active-mode)
               :on-action {:event/type ::events/change-mode
                           :event/data {:mode :temperature}}}]})

(defn menu-view [{:keys [style active-mode]}]
  {:fx/type :scene
   :stylesheets [(::css/url style)]
   :root {:fx/type :v-box
          :alignment :center
          :children [{:fx/type menu
                      :active-mode active-mode}]}})
