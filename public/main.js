import { getWeather } from "./weather.js";
import { ICON_MAP } from "./iconMap.js"
console.log('hello main')
getWeather(10,10, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then( (data) => {
        console.log(data);
        renderWeather(data)
    })
    .catch((error) => {
        console.error(error);
    });


function renderWeather({current, daily, hourly}) {
    renderCurrentWeather(current);
    renderDailyWeather(daily);
    renderHourlyWeather(hourly);

    document.body.classList.remove("blurred");
}

function renderCurrentWeather(current) {
    document.querySelector("[data-current-temp]").textContent = current.currentTemp;
    document.querySelector('[data-current-high]').textContent = current.high;
    document.querySelector('[data-current-low]').textContent = current.low;
    document.querySelector('[data-current-fl-high]').textContent = current.maxFeelsLike;
    document.querySelector('[data-current-fl-low]').textContent = current.minFeelslike;
    document.querySelector('[data-current-wind]').textContent = current.windSpeed;
    document.querySelector('[data-current-precip]').textContent = current.precip;

    document.querySelector('[data-current-icon]').src = `icons/${ICON_MAP.get(current.iconCode)}.svg`
}


function renderDailyWeather(daily) {

    const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long"})
    const dayCardTemplate = document.getElementById("day-card-template");
    document.querySelector('[data-day-section]').innerHTML = "";



    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true);
        element.querySelector('[data-temp]').textContent = day.maxTemp;
        element.querySelector('[data-date]').textContent = DAY_FORMATTER.format(day.timestamp);
        element.querySelector('[data-icon]').src = `icons/${ICON_MAP.get(day.iconCode)}.svg`;
        document.querySelector('[data-day-section]').append(element);
    })
}




function renderHourlyWeather(hourlyWeather) {
    const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long"});

    let hourTemplate = document.getElementById('hour-row-template');
    let hourSection = document.querySelector('[data-hour-section]');
    hourSection.innerHTML = "";

    hourlyWeather.forEach(hour => {
        const element = hourTemplate.content.cloneNode(true);

        element.querySelector('[data-icon]').src = `icons/${ICON_MAP.get(hour.iconCode)}.svg`;
        element.querySelector('[data-temp]').textContent = hour.temp;
        element.querySelector('[data-fl-temp]').textContent = hour.feelsLike
        element.querySelector('[data-wind]').textContent = hour.windSpeed
        element.querySelector('[data-precip]').textContent = hour.precip

        hourSection.append(element);
    })
}



