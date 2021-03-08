(ns app.core
  (:require [app.renderer :as renderer]
            [app.mqtt :as mqtt]
            [app.repl :as repl]
            [app.config :refer [cfg]]
            [app.conditions.mqtt :as conditions-mqtt]
            [app.shutdown :as shutdown]
            [app.logger :as log]
            [app.events.core :refer [dispatch]]
            [app.events.api :refer [create-event]]
            [app.state.core :as state]
            [app.gallery.core :as gallery]
            [clojure.pprint :refer [pprint]])
  (:gen-class))

(defn -main [& _args]
  (log/info "Starting the app")
  (log/info (with-out-str (pprint cfg)))

  (shutdown/add-hook :mqtt/disconnect mqtt/disconnect!)
  (shutdown/add-hook :renderer/unmount renderer/unmount!)
  (shutdown/add-hook :clojure.core/shutdown-agents shutdown-agents)
  (shutdown/add-hook :repl/stop repl/stop!)


  (state/on-updated (fn [state]
                      (mqtt/publish "home/dashboard/state_updated" state)))
  ;; TODO: use same code in dev and prod
  (gallery/on-refresh #(dispatch (create-event :gallery/images-refreshed {:images %})))
  (dispatch :show-view/dashboard)

  (repl/start!)
  (mqtt/connect!)
  (conditions-mqtt/subscribe)
  (renderer/mount!))
