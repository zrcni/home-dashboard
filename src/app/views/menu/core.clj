(ns app.views.menu.core
  (:require [cljfx.css :as css]
            [app.events.api :refer [create-event]]))

(defn menu-button [{:keys [text on-action cancel?]}]
  {:fx/type :button
   :style-class ["button" "menu-button"]
   :on-action on-action
   :text text
   :pref-height 100
   :cancel-button (true? cancel?)
   :pref-width 400})

(defn menu [{:keys [fullscreen? active-mode]}]
  {:fx/type :v-box
   :style-class "menu-view"
   :alignment :center
   :children [(if-not fullscreen?
                {:fx/type menu-button
                 :text "Enter fullscreen"
                 :on-action (create-event :enter-fullscreen)}
                {:fx/type menu-button
                 :text "Exit fullscreen"
                 :on-action (create-event :exit-fullscreen)})
              {:fx/type menu-button
               :text "Hide menu"
               :on-action (create-event :hide-menu)}
              {:fx/type menu-button
               :text "Static image"
               :active? (= :static-image active-mode)
               :on-action (create-event :activate-mode-static-image)}
              {:fx/type menu-button
               :text "Wolfenstein"
               :active? (= :wolfenstein active-mode)
               :on-action (create-event :activate-mode-wolfenstein)}
              {:fx/type menu-button
               :text "Temperature"
               :active? (= :temperature active-mode)
               :on-action (create-event :activate-mode-temperature)}]})

(defn menu-view [{:keys [style fullscreen? active-mode]}]
  {:fx/type :scene
   :stylesheets [(::css/url style)]
   :root {:fx/type :v-box
          :alignment :center
          :children [{:fx/type menu
                      :active-mode active-mode
                      :fullscreen? fullscreen?}]}})
