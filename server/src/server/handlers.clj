(ns server.handlers
  (:require [server.state :refer [*dashboard-state]]
            [server.dashboard-api :as dashboard-api]))

(defn get-dashboard-state [_]
  {:status 200
   :body @*dashboard-state})

(defn change-dashboard-view [{:keys [body-params]}]
  (let [view (-> body-params :view keyword)]
    (dashboard-api/change-view view)
    {:status 204}))
