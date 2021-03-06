(ns app.gallery.core
  (:require [app.config :refer [cfg]]
            [app.gallery.file-system :refer [get-images get-image]]))

(def default-image (get-image "images/gallery/default.png"))

(def *images (atom (cons default-image
                         (get-images (:images-path cfg)))))

;; TODO: Need to handle a case where currently selected file is removed.
;; Probably somewhere other than here.

(defn on-refresh [f]
  (f @*images)

  (add-watch *images :gallery-images
             (fn [_ _ _ new-val]
               (f new-val))))
