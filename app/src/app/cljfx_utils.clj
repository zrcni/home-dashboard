(ns app.cljfx-utils
  (:require [cljfx.context :as ctx]
            [cljfx.api :as fx]))

(defn ctx-state
  "Get state value from context"
  [context]
  (::ctx/m context))

(defn update-state!
  "Update state within the context atom"
  [context f & args]
  (reset! context (apply fx/swap-context (concat [@context f] args)))
  nil)
