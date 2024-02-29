import { View, Text, StyleSheet } from "react-native";
import dayjs from 'dayjs';
import { BlurView } from "expo-blur";
import { MainWeather } from "../utils/constants";

const ForecastItem = ({ forecast }: { forecast: { dt: string; main: MainWeather } }) => {
    return (
        <BlurView intensity={30} style={styles.container}>
            <View>
                <Text style={styles.temp}>
                    {Math.round(forecast.main.temp)}°
                </Text>
                <Text style={styles.date}>
                    {dayjs(parseInt(forecast.dt) * 1000).format('ddd ha')}
                </Text>
            </View>
        </BlurView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        aspectRatio: 9 / 16,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    temp: {
        fontWeight: '800',
        fontSize: 45,
        color: 'white',
        marginVertical: 10
    },
    date: {
        color: 'darkgray',
        fontSize: 16,
        fontWeight: '800'
    }
});


export default ForecastItem;