(ns app.views.menu
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

(defn gallery-menu-button [{:keys []}]
  {:fx/type :h-box
   :alignment :center
   :children [{:fx/type menu-button
               :text "Gallery"
               :width 320
               :on-action (create-event :show-view/gallery)}
              {:fx/type menu-button
               :text "Select image"
               :width 160
               :on-action (create-event :gallery/open-select)}]})

(defn root [_]
  {:fx/type :v-box
   :style-class "menu-view"
   :alignment :center
   :children [{:fx/type menu-controls}
              {:fx/type gallery-menu-button}
              {:fx/type menu-button
               :text "Wolfenstein"
               :on-action (create-event :show-view/wolfenstein)}
              {:fx/type menu-button
               :text "Dashboard"
               :on-action (create-event :show-view/dashboard)}]})
