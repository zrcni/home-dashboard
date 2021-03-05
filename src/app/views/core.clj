(ns app.views.core
  (:require [cljfx.api :as fx]
            [cljfx.css :as css]
            [app.views.menu :as menu-view]
            [app.views.main :as main-view]
            [app.config :refer [cfg]]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]))

(defn toggle-menu-button [{:keys [on-action]}]
  {:fx/type :button
   :style-class "toggle-menu-button"
   :pref-width 100
   :pref-height 100
   :opacity 0
   :on-action on-action})

(defn create-overlay-button [alignment]
  {:fx/type toggle-menu-button
   :stack-pane/alignment alignment
   :on-action (create-event :menu/toggle)})

(defn root [{:keys [fx/context]}]
  (let [style (fx/sub-ctx context subs/style)
        fullscreen? (fx/sub-ctx context subs/fullscreen?)
        menu? (fx/sub-ctx context subs/menu?)
        overlay-buttons (map #(create-overlay-button %) [:top-right :top-left :bottom-right :bottom-left])]
    {:fx/type :stage
     :showing true
     :full-screen fullscreen?
     :full-screen-exit-key-combination "NO_MATCH"
     :full-screen-exit-hint ""
     :title "beep boop"
     :on-close-request (create-event :window-closed)
     :scene {:fx/type :scene
             :stylesheets [(::css/url style)]
             :cursor (if (:cursor? cfg) :default :none)
             :root {:fx/type :stack-pane
                    :children (cons {:fx/type (if menu? menu-view/root main-view/root)}
                                    overlay-buttons)}}}))
