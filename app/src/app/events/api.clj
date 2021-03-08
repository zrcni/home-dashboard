(ns app.events.api)

(defn coerce-event
  "Coerce event description to an event map.

   Produces a map with key :event/type
   and optionally :event/data"
  ([event-type event-data]
   {:event/type event-type
    :event/data event-data})
  ([e]
   (if (keyword? e)
     {:event/type e}
     e)))

(def create-event coerce-event)

(comment
  (require '[app.events.api :refer [coerce-event]])
  (coerce-event :some-event)

  (coerce-event :some-event {:some :data})

  (coerce-event {:event/type :some-event})

  (coerce-event {:event/type :some-event
                 :event/data {:some :data}}))
