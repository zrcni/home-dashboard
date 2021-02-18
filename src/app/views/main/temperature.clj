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

(defn temperature-view [{:keys [mode]}]
  {:fx/type :v-box
   :alignment :center
   :children (if (:data mode)
               [{:fx/type temperature
                 :temperature (-> mode :data :temperature)}
                {:fx/type humidity
                 :humidity (-> mode :data :humidity)}]

               [{:fx/type no-temperature}])})
