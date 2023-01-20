
let controller = new AbortController();
let prevTimestamp = 0;

document.getElementById('search').addEventListener('input', (e) => {
    controller.abort();
    if (e.timeStamp - prevTimestamp > 2000) {
        let userInput = document.getElementById('search').value;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix=${userInput}&limit=10`, options)
            .then(response => response.json())
            .then(cities => {
                let searchCardTemplate = document.getElementById('search-card-template');
                let searchCardContainer = document.getElementById('search-card-container');
                searchCardContainer.innerHTML = "";
                cities.data.forEach(city => {
                    console.log(city);
                    const element = searchCardTemplate.content.cloneNode(true);
                    element.querySelector('[search-result]').textContent = city.name;
                    element.querySelector('[search-result').addEventListener('click', function(){
                        console.log(this.textContent);
                    });
                    searchCardContainer.append(element);
                });

            })
            .catch(err => console.error(err));

        prevTimestamp = e.timeStamp
    }
    

});
