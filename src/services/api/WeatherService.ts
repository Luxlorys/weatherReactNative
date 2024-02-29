import { WeatherForecast, Weather } from "../../utils/constants";
import { IWeatherService } from "./IWeatherService";


const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

class WeatherService implements IWeatherService {
    async getForecast(latitude: number, longitude: number, units: string = 'metric'): Promise<WeatherForecast> {
        const result = await fetch(`${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&cnt=15&appid=${API_KEY}&units=${units}`);
        const convertedData = await result.json();
        return convertedData;
    }

    async getCurrentWeather(latitude: number, longitude: number, units: string = 'metric'): Promise<Weather> {
        const result = await fetch(`${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`);
        const convertedData = await result.json();
        return convertedData;
    }

    async  getWeatherForSpecificCity(city: string, units: string = 'metric'): Promise<{ currentWeather: Weather; forecastWeather: WeatherForecast; }> {
        const currentWeatherResult = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`);
        const newWeatherData = await currentWeatherResult.json();

        const forecastWeatherData = await fetch(`${BASE_URL}/forecast?q=${city}&cnt=15&appid=${API_KEY}&units=${units}`);
        const newForecastData = await forecastWeatherData.json();

        return { currentWeather: newWeatherData, forecastWeather: newForecastData };
    }
}

export default WeatherService;