(ns app.state
  (:require [app.styles :refer [style]]))

(def default-state {:menu? false
                    :full-screen? true
                    :active-mode :static-image
                    :modes {:static-image {:image "app/images/static-image/tonnin-seteli.png"}
                            :wolfenstein {:image "app/images/wolfenstein/1.png"
                                          :deactivate-fn nil}
                            :temperature {:data nil
                                          :last-updated nil}}
                    :style style})
(def *state
  (atom default-state))

(defn reset []
  (reset! *state default-state))
