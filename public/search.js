import { getWeather } from './weather.js';
import { renderWeather } from './main.js';




let prevTimestamp = 0;

document.getElementById('search').addEventListener('input', (e) => {
    let userInput = document.getElementById('search').value;
    if (userInput) {
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
                let town = city.admin2;
                let state = city.admin1;
                let country = city.country_code;
                if (town === undefined && state === undefined) {
                    return;
                }
                let location = `${town || ''}, ${state || ''}, ${country || ''}`
                while (location.charAt(0) === ',' || location.charAt(0) === ' '){
                    location = location.substr(1);
                }


                console.log(city);
                const element = searchCardTemplate.content.cloneNode(true);
                element.querySelector('[search-result]').textContent = location;
                element.querySelector('[search-result').addEventListener('click', function(){
                    getWeather(city.latitude, city.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
                    .then( data => {
                        renderWeather(data);
                        document.querySelector('[city]').textContent = `Location: ${location}`;
                    })
                });
                searchCardContainer.append(element);
            });
        })
        .catch(error => {
            console.error(error);
        })
        

    }

});

let input = document.getElementById('search');
console.log(input);

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