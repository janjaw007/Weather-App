console.log("hello weather app");

const titleElement = document.querySelector(".content-title");
const latElement = document.querySelector(".content-lat");
const lngElement = document.querySelector(".content-lng");

function getLocation() {
  if (navigator.geolocation) {
    titleElement.textContent = "Loading Location...";
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
    titleElement.textContent = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  const latPos = position.coords.latitude;
  const lngPos = position.coords.longitude;

  const latPosRounded = latPos.toFixed(3);
  const lngPosRounded = lngPos.toFixed(3);
  const titleDisplay = `your location is lat:${latPosRounded} lng:${lngPosRounded}`;

  titleElement.textContent = titleDisplay;
}

function error() {
  alert("Sorry, No position Available");
  titleElement.textContent = "Sorry, No position Available";
}
getLocation();
