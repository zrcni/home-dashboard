(ns mobile.utils
  (:require [clojure.core.async :refer [<!]]))

#?(:cljs (defn error? [e]
           (instance? js/Error e))
   :clj (defn error? [e]
          (instance? Throwable e)))

 (defn throw-error [e]
  (when (error? e) (throw e))
  e)

(defmacro <? [ch]
  `(throw-error (<! ~ch)))
