(ns app.gallery.file-system
  (:import [javafx.scene.image Image])
  (:require [clojure.java.io :as io]))

(def ^:private supported-extensions #{"jpg" "jpeg" "png" "gif"})

(defn- file-extension [path]
  (second (re-find #"\.([a-zA-Z0-9]+)$" path)))

(defn supported-file-ext? [path]
  (contains? supported-extensions (file-extension path)))

(defn- get-files [path]
  (-> path
      (io/file) ;; get directory File
      (file-seq) ;; get Files in directory (incl. the directory itself)
      (->> (drop 1)))) ;; drop the directory

(defn get-images [path]
  (-> path
      (get-files)
      (->>
       (filter #(supported-file-ext? (str %)))
       (map #(-> % (io/input-stream) (Image.))))))
