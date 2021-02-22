(ns app.state
  (:import java.time.Instant)
  (:require [app.styles :refer [style]]))

(def default-state {:menu? false
                    :fullscreen? true
                    :active-mode :static-image
                    :time-now (Instant/now)
                    :modes {:static-image {:image "app/images/static-image/tonnin-seteli.png"}
                            :wolfenstein {:image "app/images/wolfenstein/1.png"
                                          :deactivate-fn nil}
                            :temperature {:data nil
                                          :last-updated nil
                                          :last-updated-formatted nil}}
                    :style style})
(def *state
  (atom default-state))

(defn reset []
  (reset! *state default-state))
