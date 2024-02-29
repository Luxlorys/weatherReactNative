// create separate file to define a type
export type MainWeather = {
    temp: number,
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}


// create separate file to define a type
export type Weather = {
    name: string;
    main: MainWeather;
    weather: [{
        main: string;
        description: string;
    }]
}

// create separate file to define a type
export type WeatherForecast = {
    list: {
      dt: string;
      main: MainWeather;
    }[];
};