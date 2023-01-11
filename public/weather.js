export async function getWeather(lat, lng, timezone) {
    const url = 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&'
                + new URLSearchParams({
                    latitude: lat,
                    longitude: lng,
                    timezone
                }).toString();

    return await fetch(url)
                .then( (response) => {
                    return response.json();
                })
                .then( (data) => {
                    console.log(data);
                    return {
                        current: getCurrentWeather(data),
                        daily: getDailyWeather(data),
                        hourly: getHourlyWeather(data)
                    };
                })
                .catch( (error) => {
                    console.error(error);
                });


}


function getCurrentWeather({current_weather, daily}) {
    console.log(current_weather)
    let {
            temperature: currentTemp,
            windspeed: windSpeed,
            weathercode: iconCode
        } = current_weather;

    let {
            temperature_2m_max: [high], 
            temperature_2m_min: [low],
            apparent_temperature_max: [maxFeelsLike], 
            apparent_temperature_min:[minFeelslike],
            precipitation_sum: [precip]
        } = daily;
    
    return {
        currentTemp: Math.round(currentTemp),
        high: Math.round(high),
        low: Math.round(low),
        maxFeelsLike: Math.round(maxFeelsLike),
        minFeelslike: Math.round(minFeelslike),
        windSpeed: Math.round(windSpeed),
        iconCode,
        precip: Math.round(precip * 100) / 100
    };
}


function getDailyWeather({daily}) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    });
}



function getHourlyWeather({ hourly, current_weather}) {
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: hourly.weathercode[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100) / 100
        }
    }).filter(({timestamp}) => timestamp >= current_weather.time * 1000);
}

