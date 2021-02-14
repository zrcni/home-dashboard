(ns app.views.core
  (:require [app.views.menu.core :refer [menu-view]]
            [app.views.main.core :refer [main-view]]
            [app.events.api :refer [create-event]]))

(defn root [state]
  {:fx/type :stage
   :showing true
  ;;  :full-screen true
   :title "beep boop"
   :on-close-request (create-event :window-closed)
   :scene (if (:menu? state)
            (assoc state :fx/type menu-view)
            (assoc state :fx/type main-view))})
