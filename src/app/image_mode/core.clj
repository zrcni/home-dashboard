(ns app.image-mode.core
  (:require [app.config :refer [cfg]]
            [app.image-mode.file-system :refer [get-images]]))

(def *images (atom (get-images (:images-path cfg))))

;; TODO: Need to handle a case where currently selected file is removed.
;; Probably somewhere other than here.

(defn on-refresh [f]
  (f @*images)

  (add-watch *images :image-mode-images
             (fn [_ _ _ new-val]
               (f new-val))))
