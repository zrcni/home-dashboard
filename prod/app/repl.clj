(ns app.repl
  (:require [nrepl.server :refer [start-server stop-server]]
            [nrepl.transport :as transport]
            [cider.nrepl :refer [cider-middleware]]
            [app.config :refer [cfg]]
            [app.logger :as log]))

(defonce *server (atom nil))

(defn start! []
  (let [port (:repl-port cfg)]
  (log/info (format "Starting nREPL on port %s" port))

  (reset! *server
          (start-server :port port
                        :transport-fn transport/tty
                        :greeting-fn transport/tty-greeting
                        :middleware [cider-middleware]))))

(defn stop! []
  (stop-server @*server)
  (reset! *server nil))
