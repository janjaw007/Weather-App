console.log("hello weather app");

const titleElement = document.querySelector(".content-title");
const latElement = document.querySelector(".content-lat");
const lngElement = document.querySelector(".content-lng");
const weatherElement = document.querySelector(".content-weather");

const headers = {
  method: "GET",
  "content-type": "application/json",
  authorization: API_TOKEN,
};

function getCoordinate() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getLocation() {
  if (navigator.geolocation) {
    titleElement.textContent = "Loading Location...";
    const response = await getCoordinate();

    data = await response;
    console.log(data);
    resolve(data);
    getWeatherHourly(data.coords.latitude, data.coords.longitude);
  } else {
    alert("Geolocation is not supported by this browser.");
    titleElement.textContent = "Geolocation is not supported by this browser.";
  }
}

async function getWeatherHourly(lat, lng) {
  const url = `https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/at?lat=${lat}&lon=${lng}&fields=tc,tc_min,tc_max,cond,rain&duration=5`;

  try {
    weatherElement.textContent = "Loading Weather ...";

    const response = await fetch(url, { headers });
    console.log("response =>", response);

    //check status
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const forecasts = result.WeatherForecasts[0].forecasts;
    weatherElement.textContent = ""; // clear before inserting
    forecasts.forEach((el) => {
      const time = el.time;
      const temp = el.data.tc;
      const rain = el.data.rain;
      const cond = el.data.cond;

      const ptag = `<p>this is ${time} and tempurature is ${temp} chance of rain is ${rain} the weather is in ${cond}</p>`;

      weatherElement.insertAdjacentHTML("afterbegin", ptag);
    });
  } catch (error) {
    console.error("Weather fetch failed:", error);
  }
}

function resolve(position) {
  const latPos = position.coords.latitude;
  const lngPos = position.coords.longitude;

  const latPosRounded = latPos.toFixed(3);
  const lngPosRounded = lngPos.toFixed(3);
  const titleDisplay = `your location is lat:${latPosRounded} lng:${lngPosRounded}`;

  titleElement.textContent = titleDisplay;
}

function reject() {
  alert("Sorry, No position Available");
  titleElement.textContent = "Sorry, No position Available";
}

getLocation();
