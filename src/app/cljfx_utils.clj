(ns app.cljfx-utils
  (:require [cljfx.context :as ctx]))

(defn ctx-state
  "Get state value from context"
  [context]
  (::ctx/m context))
