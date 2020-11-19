const clockApp = {}

// Caching
clockApp.quote = document.getElementById('quote');
clockApp.author = document.getElementById('author');
clockApp.location = document.getElementById('location');
clockApp.timezone= document.getElementById('timezone');
clockApp.time = document.getElementById('time');
clockApp.tzShort = document.getElementById('tzShort');
clockApp.hour = document.getElementById('hour');
clockApp.minutes = document.getElementById('minutes');

// Get current time and create interval to update time
clockApp.currentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  clockApp.hour.innerHTML = clockApp.updateTime(hour);
  clockApp.minutes.innerHTML = clockApp.updateTime(minutes);
  const t = setTimeout(() => clockApp.currentTime(), 60000);
}

// add a 0 to the time if it's a single digit
clockApp.updateTime = (k) => {
  if (k < 10) {
    return "0" + k
  } else {
    return k
  }
}

// Get the shorthand timezone
clockApp.getTzShort = () => {
  const date = new Date();
  clockApp.tzShort.innerHTML = date.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop();
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
  clockApp.getTzShort();
  clockApp.currentTime();
};

document.addEventListener("DOMContentLoaded", () => {
  clockApp.init();
});