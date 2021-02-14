(ns app.events
  (:require [app.state :refer [*state]]))

(defn show-menu [state & _]
  (assoc state :menu? true))

(defn hide-menu [state & _]
  (assoc state :menu? false))

(defn change-mode [state e]
  (-> (case (-> e :event/data :mode)
        :static-image (assoc state :mode :static-image)
        state)
      (hide-menu e)))

(defn window-closed [& _]
  (prn "Window was closed."))

(defn create-handle [*state]
  (fn [e]
    (case (:event/type e)
      ::show-menu (swap! *state show-menu e)
      ::hide-menu (swap! *state hide-menu e)
      ::change-mode (swap! *state change-mode e)
      ::window-closed (window-closed)
      (prn e))))

;; TODO: put channel between emit and handle or something

(def handle (create-handle *state))

(defn create-emit [handle]
  (fn [e]
    (handle e)))

(def emit (create-emit handle))
