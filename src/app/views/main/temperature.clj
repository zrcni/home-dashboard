(ns app.views.main.temperature)

(defn temperature [{:keys [temperature]}]
  {:fx/type :text
   :style-class "some-text"
   :text (str "Temperature: " temperature "°C")})

(defn humidity [{:keys [humidity]}]
  {:fx/type :text
   :style-class "some-text"
   :text (str "Humidity: " humidity "%")})

(defn no-temperature [_]
  {:fx/type :text
   :style-class "some-text"
   :text "No temperature data currently :("})

(defn last-updated [{:keys [date]}]
  {:fx/type :text
   :style-class "temperature-last-updated"
   ;; TODO: format like "2 minutes ago"
   :text (str "Last updated: " (.toString date))})

(defn temperature-view [{:keys [mode]}]
  {:fx/type :v-box
   :alignment :center
   :children (if (:data mode)
               [{:fx/type temperature
                 :temperature (-> mode :data :temperature)}
                {:fx/type humidity
                 :humidity (-> mode :data :humidity)}
                {:fx/type last-updated
                 :date (-> mode :last-updated)}]

               [{:fx/type no-temperature}])})
