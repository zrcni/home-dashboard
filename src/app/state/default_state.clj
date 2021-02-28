(ns app.state.default-state
  (:require [app.config :refer [cfg]]))

(def default-state
  {:menu? false
   :fullscreen? (:fullscreen? cfg)
   :active-mode :gallery
   :modes {:gallery {:image "app/images/gallery/tonnin-seteli.png"
                     :images []
                     :selecting? false}
           :wolfenstein {:image "app/images/wolfenstein/1.png"
                         :deactivate-fn nil}
           :dashboard {:data nil
                       :last-updated nil
                       :last-updated-relative nil}}})
