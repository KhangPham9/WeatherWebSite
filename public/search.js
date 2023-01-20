import { getWeather } from './weather.js';
import { renderWeather } from './main.js';




let prevTimestamp = 0;

document.getElementById('search').addEventListener('input', (e) => {

    let userInput = document.getElementById('search').value;

    const url = 'https://geocoding-api.open-meteo.com/v1/search?' + new URLSearchParams( {
        name: userInput
    });
    fetch(url)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        let searchCardTemplate = document.getElementById('search-card-template');
        let searchCardContainer = document.getElementById('search-card-container');
        searchCardContainer.innerHTML = "";
        data.results.forEach(city => {
            console.log(city);
            const element = searchCardTemplate.content.cloneNode(true);
            element.querySelector('[search-result]').textContent = `${city.admin2}, ${city.admin1}, ${city.country_code}`;
            element.querySelector('[search-result').addEventListener('click', function(){
                getWeather(city.latitude, city.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
                .then( data => {
                    renderWeather(data);
                })
            });
            searchCardContainer.append(element);
        });
    })
    .catch(error => {
        console.error(error);
    })
    

});

//     if (e.timeStamp - prevTimestamp > 2000) {
//         let userInput = document.getElementById('search').value;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '',
//                 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//             }
//         };
//         fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix=${userInput}&limit=10`, options)
//             .then(response => response.json())
//             .then(cities => {
//                 let searchCardTemplate = document.getElementById('search-card-template');
//                 let searchCardContainer = document.getElementById('search-card-container');
//                 searchCardContainer.innerHTML = "";
//                 cities.data.forEach(city => {
//                     console.log(city);
//                     const element = searchCardTemplate.content.cloneNode(true);
//                     element.querySelector('[search-result]').textContent = city.name;
//                     element.querySelector('[search-result').addEventListener('click', function(){
//                         console.log(this.textContent);
//                     });
//                     searchCardContainer.append(element);
//                 });
// 
//             })
//             .catch(err => console.error(err));
// 
//         prevTimestamp = e.timeStamp
//     }