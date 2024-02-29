import { Weather, WeatherForecast } from "../../utils/constants";

export interface IWeatherService {
    getForecast(latitude: number, longitude: number, units: string): Promise<WeatherForecast>;
    getCurrentWeather(latitude: number, longitude: number, units: string): Promise<Weather>;
    getWeatherForSpecificCity(city: string, units: string): Promise<{currentWeather: Weather; forecastWeather: WeatherForecast}>;
}