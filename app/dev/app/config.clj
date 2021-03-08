(ns app.config)

(def cfg
  {:mqtt-broker-url "tcp://127.0.0.1:1883"
   :fullscreen? false
   :cursor? true
   :images-path (str (System/getenv "HOME") "/home_dashboard_test")})
