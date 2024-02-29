import { 
    View, 
    Text, 
    StyleSheet
} from "react-native";
import { Weather } from "../utils/constants";

export default function MainWeatherInfo({ currentWeather }: { currentWeather: Weather }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.location}>{currentWeather.name}</Text>
            <Text style={styles.description}>{currentWeather.weather[0].description}</Text>
            <Text style={styles.temp}>{Math.round(currentWeather.main.temp)} °</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    location: {
        fontSize: 40,
        color: 'white',
        fontWeight: '800'
    },
    description: {
        fontSize: 24,
        color: 'snow',
        fontWeight: '500'
    },
    temp: {
        fontWeight: 'bold',
        fontSize: 70,
        color: 'white'
    },
});