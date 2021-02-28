(ns app.subs
  (:require [cljfx.api :as fx]))

(defn fullscreen? [context]
  (fx/sub-val context :fullscreen?))

(defn menu? [context]
  (fx/sub-val context :menu?))

(defn style [context]
  (fx/sub-val context :style))

(defn active-view [context]
  (fx/sub-val context :active-view))

(defn gallery [context]
  (fx/sub-val context :gallery))

(defn wolfenstein [context]
  (fx/sub-val context :wolfenstein))

(defn conditions-last-updated-relative [context]
  (fx/sub-val context get-in [:conditions :last-updated-relative]))

(defn conditions [context]
  (fx/sub-val context :conditions))