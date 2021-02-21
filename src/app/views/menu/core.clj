(ns app.views.menu.core
  (:require [cljfx.css :as css]
            [app.events.api :refer [create-event]]))

(defn menu-button [{:keys [text on-action width]}]
  {:fx/type :button
   :style-class ["button" "menu-button"]
   :on-action on-action
   :text text
   :pref-height 100
   :pref-width (or width 480)})

(defn menu-control-button [{:keys [text on-action]}]
  {:fx/type menu-button
   :text text
   :on-action on-action
   :width 240})

(defn menu-controls [{:keys [fullscreen?]}]
  {:fx/type :h-box
   :alignment :center
   :children [(if-not fullscreen?
                {:fx/type menu-control-button
                 :text "Enter fullscreen"
                 :on-action (create-event :enter-fullscreen)}
                {:fx/type menu-control-button
                 :text "Exit fullscreen"
                 :on-action (create-event :exit-fullscreen)})
              {:fx/type menu-control-button
               :text "Hide menu"
               :on-action (create-event :hide-menu)}]})

(defn menu [{:keys [fullscreen? active-mode]}]
  {:fx/type :v-box
   :style-class "menu-view"
   :alignment :center
   :children [{:fx/type menu-controls
               :fullscreen? fullscreen?}
              {:fx/type menu-button
               :text "Image"
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
   :root {:fx/type menu
          :active-mode active-mode
          :fullscreen? fullscreen?}})
