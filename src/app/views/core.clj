(ns app.views.core
  (:require [app.utils :refer [throttle-fn]]
            [app.javafx-event-utils :refer [key-released?]]
            [app.events.core :refer [dispatch]]
            [app.views.menu.core :refer [menu-view]]
            [app.views.main.core :refer [main-view]]
            [app.events.api :refer [create-event]]))

(def exit-fullscreen (throttle-fn #(dispatch (create-event :exit-fullscreen)) 100))

(defn root [state]
  {:fx/type :stage
   :showing true
   :full-screen (true? (:fullscreen? state))
   :title "beep boop"
   :on-close-request (create-event :window-closed)
   :event-handler (fn [e] (when (key-released? e :esc)
                            (exit-fullscreen)))
   :scene (if (:menu? state)
            (assoc state :fx/type menu-view)
            (assoc state :fx/type main-view))})
