(ns app.views.menu.core
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]))

(defn menu-button [{:keys [text on-action width]}]
  {:fx/type :button
   :style-class ["button" "menu-button"]
   :on-action on-action
   :text text
   :pref-height 100
   :pref-width (or width 480)})

#_(defn menu-control-button [{:keys [text on-action]}]
  {:fx/type menu-button
   :text text
   :on-action on-action
   :width 160})

(defn menu-controls [{:keys [fx/context]}]
  (let [fullscreen? (fx/sub-ctx context subs/fullscreen?)]
    {:fx/type :h-box
     :alignment :center
     :children [(if-not fullscreen?
                  {:fx/type menu-button
                   :text "Enter fullscreen"
                   :on-action (create-event :fullscreen/enter)}
                  {:fx/type menu-button
                   :text "Exit fullscreen"
                   :on-action (create-event :fullscreen/exit)})]}))

(defn image-mode-menu-button [{:keys []}]
  {:fx/type :h-box
   :alignment :center
   :children [{:fx/type menu-button
               :text "Image"
               :width 320
               :on-action (create-event :activate-mode-static-image)}
              {:fx/type menu-button
               :text "Select image"
               :width 160
               :on-action (create-event :image-mode-open-select)}]})

(defn menu-view [_]
  {:fx/type :v-box
   :style-class "menu-view"
   :alignment :center
   :children [{:fx/type menu-controls}
              {:fx/type image-mode-menu-button}
              {:fx/type menu-button
               :text "Wolfenstein"
               :on-action (create-event :activate-mode-wolfenstein)}
              {:fx/type menu-button
               :text "Temperature"
               :on-action (create-event :activate-mode-temperature)}]})
