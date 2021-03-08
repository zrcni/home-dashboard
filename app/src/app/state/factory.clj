(ns app.state.factory
  (:require [cljfx.api :as fx]
            [clojure.core.cache :refer [lru-cache-factory]]))

(defn create-context
  ([state]
   (create-context state lru-cache-factory))
  ([state cache-factory]
   (fx/create-context state cache-factory)))
