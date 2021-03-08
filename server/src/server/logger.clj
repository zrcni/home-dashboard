(ns server.logger
  (:require [taoensso.timbre :as timbre]))

(timbre/set-level! :debug)

(defn make-ns-symbol [level]
  (symbol (str "taoensso.timbre/" (name level))))

(defmacro log [level args]
  `(~(make-ns-symbol level) ~@args))



(defmacro info [& args]
  `(log :info ~args))

(defmacro infof [& args]
  `(log :infof ~args))


(defmacro error [& args]
  `(log :error ~args))

(defmacro errorf [& args]
  `(log :errorf ~args))


(defmacro warn [& args]
  `(log :warn ~args))

(defmacro warnf [& args]
  `(log :warnf ~args))


(defmacro debug [& args]
  `(log :debug ~args))

(defmacro debugf [& args]
  `(log :debugf ~args))
