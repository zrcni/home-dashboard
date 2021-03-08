(ns user
  (:require [server.mqtt :as mqtt]
            [server.server :as server]
            [server.dashboard-api :as dashboard-api]
            [server.state :refer [*dashboard-state]]))

(mqtt/connect!)

(dashboard-api/on-state-updated
 (fn [state]
   (reset! *dashboard-state state)))

(server/start)
