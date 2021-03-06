(ns app.config)

(def cfg
  {:fullscreen? false
   :cursor? true
   :src-images-path "./src/app/images/gallery"
   :images-path (str (System/getenv "HOME") "/home_dashboard_test")})
