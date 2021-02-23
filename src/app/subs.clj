(ns app.subs
  (:require [cljfx.api :as fx]))

(defn fullscreen? [context]
  (fx/sub-val context :fullscreen?))

(defn menu? [context]
  (fx/sub-val context :menu?))

(defn style [context]
  (fx/sub-val context :style))

(defn active-mode [context]
  (fx/sub-val context :active-mode))

(defn static-image-mode [context]
  (fx/sub-val context get-in [:modes :static-image]))

(defn wolfenstein-mode [context]
  (fx/sub-val context get-in [:modes :wolfenstein]))

(defn temperature-mode [context]
  (fx/sub-val context get-in [:modes :temperature]))

(defn time-now [context]
  (fx/sub-val context :time-now))
