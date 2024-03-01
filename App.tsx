import { useEffect, useState } from "react";
import { 
    View, 
    ImageBackground, 
    StyleSheet, 
    ActivityIndicator,
    Alert} from "react-native";
import * as Location from 'expo-location';
import WeatherService from "./src/services/api/WeatherService";
import MainWeatherInfo from "./src/components/MainWeatherInfo";
import ForecastFlatList from "./src/components/ForecastFlatList";
import { Weather, WeatherForecast } from "./src/utils/constants";
import Input from "./src/components/Input";

// POTENTIAL IMPROVEMENTS
// 1 Let Redux manage user's location and weather state
// 2 Complete unit changing (without fetching data again)
// 3 Secure app from DDOS attacks limiting number of request / second
// 4 Proper error handling
// 4.1 properly handle network errors
// store weather history to see previous cities



// not the best choice
// would be nice to follow of DI
const weatherService = new WeatherService();


export default function App() {
    const [currentWeather, setCurrentWeather] = useState<Weather>();
    const [forecastWeather, setForecastWeather] = useState<WeatherForecast>();

    const [units, setUnits] = useState<string>('metric')

    // location'd nice to store in StateManager like Redux
    const [errorMsg, setErrorMsg] = useState(null);

    // city state a user want find to
    const [specificCity, setSpecificCity] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const location = await Location.getCurrentPositionAsync({});
                const currentWeatherData = await weatherService.getCurrentWeather(location.coords.latitude, location.coords.longitude);
                const forecastWeatherData = await weatherService.getForecast(location.coords.latitude, location.coords.longitude);

                setCurrentWeather(currentWeatherData);
                setForecastWeather(forecastWeatherData);
            } catch (error) {
                setErrorMsg(error.message);
            }
        })();
    }, [specificCity]);

    const handleSeachCity = async () => {

        if (specificCity === '') {
            Alert.alert('Fill the city field, pleasy');
            return;
        }

        try {
            const { currentWeather, forecastWeather } = await weatherService.getWeatherForSpecificCity(specificCity, units);
            console.log(currentWeather);
            console.log(forecastWeather);
            setCurrentWeather(currentWeather);
            setForecastWeather(forecastWeather);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // City not found error
                setErrorMsg('City not found. Please try again.');
                Alert.alert(errorMsg);
                return;
            } else {
            // Handle other errors (e.g., network errors)
            console.error(error);
            setErrorMsg('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1526512340740-9217d0159da9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'}} 
            style={styles.container}>

            {/* obscure the background image */}
            <View 
            style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}/>

            {(!currentWeather || !forecastWeather) && (
                <ActivityIndicator />
            )}

            {currentWeather && forecastWeather && (
                <>
                    <Input 
                        value={specificCity}
                        onChangeText={(text: string) => {setSpecificCity(text)}}
                        placeholder='Enter your city here'
                        onPress={handleSeachCity}
                    />
                    <MainWeatherInfo currentWeather={currentWeather}/>
                    <ForecastFlatList forecastWeather={forecastWeather}/>
                </>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})