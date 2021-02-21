(ns app.views.core
  (:require [app.views.menu.core :refer [menu-view]]
            [app.views.main.core :refer [main-view]]
            [app.events.api :refer [create-event]]))

(defn root [state]
  {:fx/type :stage
   :showing true
   ;; fullscreen state is controlled via UI buttons – no keybinds
   :full-screen (true? (:fullscreen? state))
   :full-screen-exit-key-combination "NO_MATCH"
   :full-screen-exit-hint ""
   :title "beep boop"
   :on-close-request (create-event :window-closed)
   :scene (if (:menu? state)
            (assoc state :fx/type menu-view)
            (assoc state :fx/type main-view))})
