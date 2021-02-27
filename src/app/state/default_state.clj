(ns app.state.default-state)

(def default-state
  {:menu? false
   :fullscreen? true
   :active-mode :static-image
   :modes {:static-image {:image "app/images/static-image/tonnin-seteli.png"}
           :wolfenstein {:image "app/images/wolfenstein/1.png"
                         :deactivate-fn nil}
           :temperature {:data nil
                         :last-updated nil
                         :last-updated-relative nil}}})
