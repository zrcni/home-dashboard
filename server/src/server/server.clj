(ns server.server
  (:require [reitit.ring :as ring]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [reitit.ring.middleware.exception :as exception]
            [reitit.ring.middleware.parameters :as parameters]
            [reitit.ring.coercion :as coercion]
            [reitit.coercion.spec]
            [ring.adapter.jetty :as jetty]
            [muuntaja.core :as m]
            [server.config :refer [cfg]]
            [server.handlers :as handlers]
            [server.logger :as log]))

(def app
  (ring/ring-handler
   (ring/router
    [["/api/dashboard_state" {:get {:handler #'handlers/get-dashboard-state}}]
     ["/api/change_dashboard_view" {:post {:handler #'handlers/change-dashboard-view}}]]
    {:data {:coercion reitit.coercion.spec/coercion
            :muuntaja m/instance
            :middleware [parameters/parameters-middleware
                         muuntaja/format-negotiate-middleware
                         muuntaja/format-response-middleware
                         exception/exception-middleware
                         muuntaja/format-request-middleware
                         coercion/coerce-response-middleware
                         coercion/coerce-request-middleware]}})))

(defn start []
  (log/info (str "Starting server on port " (:port cfg)))
  (jetty/run-jetty #'app {:port (:port cfg) :join? false}))
