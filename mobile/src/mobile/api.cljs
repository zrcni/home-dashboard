(ns mobile.api
  (:require [mobile.config :refer [cfg]]
            [clojure.spec.alpha :as s]
            [spec-tools.core :as st]
            [spec-tools.spec :as spec]
            [clojure.core.async :refer [go]]
            [clojure.core.async.interop :refer-macros [<p!]]))

(s/def ::dashboard-view (s/and keyword? #{:dashboard :gallery :wolfenstein}))
(s/def ::date spec/inst?)

(s/def ::active-view ::dashboard-view)
(s/def ::last-updated ::date)

(s/def ::dashboard-state (st/spec (s/keys :req-un [::active-view
                                                   ::last-updated])))

(defn get-state []
  (go (try (let [response (<p! (js/fetch (str (:api-url cfg) "/dashboard_state")))
                 body (<p! (.json response))
                 data (st/decode ::dashboard-state (js->clj body :keywordize-keys true) st/string-transformer)]
             data)
           (catch js/Error err
             err))))

(defn change-view [view]
  (go (try (<p! (js/fetch (str (:api-url cfg) "/change_dashboard_view")
                          (clj->js {:method "POST"
                                    :headers {"Content-Type" "application/json"}
                                    :body (js/JSON.stringify (clj->js {:view view}))})))
           (catch js/Error err
             err))))
