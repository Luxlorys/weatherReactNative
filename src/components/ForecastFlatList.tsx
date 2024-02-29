import { FlatList } from "react-native";
import { WeatherForecast } from "../utils/constants";
import ForecastItem from "./ForecastItem";

export default function ForecastFlatList({ forecastWeather } : { forecastWeather: WeatherForecast}) {
    return (
        <FlatList
            data={forecastWeather.list}
            horizontal={true}
            style={{
                flexGrow: 0,
                height: 200,
                marginBottom: 50
            }}
            contentContainerStyle={{ 
                gap: 10,
                paddingHorizontal: 15
            }}
            renderItem={({ item }) => (<ForecastItem forecast={item}/>)}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}