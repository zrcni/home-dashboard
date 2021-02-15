(ns scratch
  (:require [clojure.core.async :refer [go chan close!]]
            [user :refer [start stop rerender]]
            [app.events.core :as events]
            [app.state :refer [*state]]
            [app.events.api :refer [create-event]]
            [app.wolfenstein-mode.core :as wolfenstein]))

(events/dispatch (create-event :show-menu))
(events/dispatch (create-event :hide-menu))
(events/dispatch (create-event :activate-mode-static-image))
(events/dispatch (create-event :activate-mode-wolfenstein))

(start)
(stop)
(rerender)

(events/dispatch (create-event :wolfenstein-image-updated {:img-n 1}))

@*state
@wolfenstein/*chan
(wolfenstein/deactivate)

(reset! wolfenstein/*prev-image-n nil)
