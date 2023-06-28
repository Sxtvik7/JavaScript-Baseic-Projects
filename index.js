const temperatureField = document.querySelector(".weather1");
const cityName = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span")

const searchField = document.querySelector(".serchfield");
const form = document.querySelector("form");

let target = "mumbai"

const fetchData = async ()=>{

const url = `https://api.weatherapi.com/v1/current.json?key=661ab9f0c54648a88a263924232706&q=${target}`

const response = await fetch(url);
const data = await response.json();

console.log(data);

const {
    current: {temp_c, 
        condition:{icon, text}},
        location: {name, localtime},
} = data;

updateDom(temp_c, name, icon, text, localtime);
}

function updateDom(temp, city, emoji, text, time){

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    //console.log(exactDay)
    //console.log(getDayFullName(4))

    temperatureField.innerText = temp
    cityName.innerText = city
    emojiField.src = emoji
    weatherField.innerText = text 
    dateField.innerText = `${exactTime} - ${exactDay}  ${exactDate}`;
}

fetchData(target);

function search(e){
    e.preventDefault(e);

    target = searchField.value;

    fetchData(target);
}

form.addEventListener("submit",search);

function getDayFullName(num){
    switch(num){
        case 0:
        return "Sunday";

        case 1:
        return "Monday";

        case 2:
        return "Tueasday";

        case 3:
        return "Wednesday";

        case 4:
        return "Thursday";

        case 5:
        return "Friday";

        case 6:
        return "Saturday";

        default:
            return "Don't Know";
    }
}