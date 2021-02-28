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

(defn gallery [context]
  (fx/sub-val context get-in [:modes :gallery]))

(defn wolfenstein-mode [context]
  (fx/sub-val context get-in [:modes :wolfenstein]))

(defn dashboard [context]
  (fx/sub-val context get-in [:modes :dashboard]))

(defn conditions-last-updated-relative [context]
  (fx/sub-val context get-in [:modes :dashboard :last-updated-relative]))
