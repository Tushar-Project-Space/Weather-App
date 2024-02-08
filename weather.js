const InputCity = document.querySelector("#inputCity");
const Card = document.querySelector(".card");
const WeatherForm = document.querySelector("#form");
const API = "2fc9acf8842a09d04799a92ccedfb333";

WeatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const City = InputCity.value;

    if(City){
        try {
            const weatherData = await getWeatherData(City);
            displayWeatherInfo(weatherData);
        } catch (error) {
            displayError(error);
        }
    }
    else{
        displayError("Please Enter City!");
    }
});

async function getWeatherData (City) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API}`;
    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Failed to fetch!");
    }
        return await response.json();
}

function displayWeatherInfo(data) {
    const {name:City, main:{temp, humidity}, weather:[{description, id}]} = data;
    Card.textContent = "";
    Card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = City;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("city");
    tempDisplay.classList.add("temprature");
    humidityDisplay.classList.add("humidity");
    descDisplay.classList.add("desc");
    emojiDisplay.classList.add("emoji");

    Card.appendChild(cityDisplay);
    Card.appendChild(tempDisplay);
    Card.appendChild(humidityDisplay);
    Card.appendChild(descDisplay);
    Card.appendChild(emojiDisplay);

}

function getWeatherEmoji(weatherId) {
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";

        case (weatherId >= 600 && weatherId < 700):
            return "❄️";

        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";

        case (weatherId === 800):
            return "☀️";

        case (weatherId >= 801 && weatherId < 810):
            return "☁️";

        default:
            return "❓";
    }
}

function displayError (message) {
    const Error = document.createElement("p");
    Error.textContent = message;
    Error.classList.add("#error");

    Card.textContent = "";
    Card.style.display = "flex";
    Card.appendChild(Error);

    Error.setAttribute('id' , "error");
}