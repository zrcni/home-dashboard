(ns app.events
  (:require [app.state :refer [*state]]))

(defn show-menu [e]
  (swap! *state assoc :menu? true))

(defn hide-menu [e]
  (swap! *state assoc :menu? false))

(defn change-mode [e]
  (case (-> e :event/data :mode)
    :static-image (swap! *state assoc :mode :static-image)
    nil))

(defn handle [e]
  (case (:event/type e)
    ::show-menu (show-menu e)
    ::hide-menu (hide-menu e)
    ::change-mode (change-mode e)
    (prn e)))

(defn emit [e]
  (handle e))
