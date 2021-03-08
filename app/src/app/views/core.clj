(ns app.views.core
  (:require [cljfx.api :as fx]
            [cljfx.css :as css]
            [app.gallery.view :as gallery-view]
            [app.dashboard.view :as dashboard-view]
            [app.wolfenstein.view :as wolfenstein-view]
            [app.config :refer [cfg]]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]))

(defn create-scene [active-view style]
  {:fx/type :scene
   :stylesheets [(::css/url style)]
   :cursor (if (:cursor? cfg) :default :none)
   :root {:fx/type (case active-view
                     :gallery gallery-view/root
                     :wolfenstein wolfenstein-view/root
                     :dashboard dashboard-view/root
                     nil)}})

(defn root [{:keys [fx/context]}]
  (let [style (fx/sub-ctx context subs/style)
        fullscreen? (fx/sub-ctx context subs/fullscreen?)
        active-view (fx/sub-ctx context subs/active-view)]
    {:fx/type :stage
     :showing true
     :full-screen fullscreen?
     :full-screen-exit-key-combination "NO_MATCH"
     :full-screen-exit-hint ""
     :title "beep boop"
     :on-close-request (create-event :window-closed)
     :scene (create-scene active-view style)}))
