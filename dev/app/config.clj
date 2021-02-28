(ns app.config)

(def cfg {:fullscreen? false
          :cursor? true
          :images-path (str (System/getenv "HOME") "/home_dashboard_test")})
