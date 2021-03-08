(ns server.dashboard-api
  (:require [server.mqtt :as mqtt]))

(defn change-view [view]
  (mqtt/publish "home/dashboard/change_view" {:view view}))

(defn on-state-updated [f]
  (mqtt/subscribe "home/dashboard/state_updated"
                  (fn [state]
                    (f state))))
