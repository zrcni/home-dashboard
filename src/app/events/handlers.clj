(ns app.events.handlers
  (:require [app.events.api :refer [create-event]]))

(defn show-menu [_ *state _]
  (swap! *state assoc :menu? true))

(defn hide-menu [_ *state _]
  (swap! *state assoc :menu? false))

(defn activate-mode-static-image [_ *state dispatch]
  (swap! *state assoc :active-mode :static-image)
  (dispatch (create-event :hide-menu)))

(defn activate-mode-wolfenstein [_ *state dispatch]
  (swap! *state assoc :active-mode :wolfenstein)
  (dispatch (create-event :hide-menu)))

(defn register [subscribe]
  (subscribe :show-menu show-menu)
  (subscribe :hide-menu hide-menu)
  (subscribe :activate-mode-static-image activate-mode-static-image)
  (subscribe :activate-mode-wolfenstein activate-mode-wolfenstein))
