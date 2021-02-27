(ns app.core
  (:require [app.renderer :refer [mount unmount]]
            [app.dev]))

(def start mount)
(def stop unmount)
