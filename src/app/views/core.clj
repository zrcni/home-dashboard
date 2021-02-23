(ns app.views.core
  (:require [cljfx.api :as fx]
            [app.views.menu.core :refer [menu-view]]
            [app.views.main.core :refer [main-view]]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]))

(defn root [{:keys [fx/context]}]
  (let [fullscreen? (fx/sub-ctx context subs/fullscreen?)
        menu? (fx/sub-ctx context subs/menu?)]
    {:fx/type :stage
     :showing true
     ;; fullscreen state is controlled via UI buttons – no keybinds
     :full-screen (true? fullscreen?)
     :full-screen-exit-key-combination "NO_MATCH"
     :full-screen-exit-hint ""
     :title "beep boop"
     :on-close-request (create-event :window-closed)
     :scene {:fx/type (if menu?
                        menu-view
                        main-view)}}))
