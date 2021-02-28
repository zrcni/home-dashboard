(ns app.state.default-state
  (:require [app.config :refer [cfg]]))

(def default-state
  {:menu? false
   :fullscreen? (:fullscreen? cfg)
   :active-mode :static-image
   :modes {:static-image {:image "app/images/static-image/tonnin-seteli.png"
                          :images []
                          :selecting? false}
           :wolfenstein {:image "app/images/wolfenstein/1.png"
                         :deactivate-fn nil}
           :temperature {:data nil
                         :last-updated nil
                         :last-updated-relative nil}}})
