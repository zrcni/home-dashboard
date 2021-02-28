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

(defn gallery-mode [context]
  (fx/sub-val context get-in [:modes :gallery]))

(defn wolfenstein-mode [context]
  (fx/sub-val context get-in [:modes :wolfenstein]))

(defn temperature-mode [context]
  (fx/sub-val context get-in [:modes :temperature]))

(defn temperature-last-updated-relative [context]
  (fx/sub-val context get-in [:modes :temperature :last-updated-relative]))
