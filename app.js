const clockApp = {}

// Caching
clockApp.quote = document.getElementById('quote');
clockApp.author = document.getElementById('author');
clockApp.location = document.getElementById('location');
clockApp.timezone= document.getElementById('timezone');
clockApp.time = document.getElementById('time');

// Time method
clockApp.currentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds()
  var tzName = date.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop();
  console.log(tzName);
}

// Method to get random quote
clockApp.getQuote = async () => {
  await fetch(`http://quotes.stormconsultancy.co.uk/random.json`)
        .then(response => response.json())
        .then(data => {
          clockApp.quote.innerHTML = data.quote;
          clockApp.author.innerHTML = `- ${data.author}`
        });
};

//Method to get geolocation data based on IP
clockApp.getGeoData = async () => {
  await fetch(`http://ip-api.com/json/`)
        .then(response => response.json())
        .then(data => {
          clockApp.location.innerHTML = `${data.city}, ${data.country}`;
          clockApp.timezone.innerHTML = data.timezone;
          console.log(data);
        })
};

clockApp.eventListeners = () => {

};

clockApp.init = () => {
  clockApp.eventListeners();
  clockApp.getQuote();
  clockApp.getGeoData();
  clockApp.currentTime();
};

document.addEventListener("DOMContentLoaded", () => {
  clockApp.init();
});