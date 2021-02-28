(ns app.config)

(def cfg
  {:mqtt-broker-addr "tcp://127.0.0.1:1883"
   :repl-port 22222
   :fullscreen? true
   :cursor? false
   :images-path (str (System/getenv "HOME") "/home_dashboard")})
