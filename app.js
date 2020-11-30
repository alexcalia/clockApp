const clockApp = {}

// Caching
clockApp.quoteContainer = document.getElementById('quoteContainer');
clockApp.quote = document.getElementById('quote');
clockApp.author = document.getElementById('author');
clockApp.location = document.getElementById('location');
clockApp.timezone= document.getElementById('timezone');
clockApp.time = document.getElementById('time');
clockApp.tzShort = document.getElementById('tzShort');
clockApp.hour = document.getElementById('hour');
clockApp.minutes = document.getElementById('minutes');
clockApp.greeting = document.getElementById('greeting');
clockApp.sunMoon = document.getElementById('sunMoon');
clockApp.body = document.querySelector('body');
clockApp.geoData = document.getElementById('geoData');
clockApp.toggleGeo = false;
clockApp.moreLessText = document.getElementById('moreLessText');
clockApp.chevron = document.getElementById('chevron');
clockApp.clockSection = document.getElementById('clockSection');
clockApp.appWidth = window.innerWidth;

clockApp.setTimeStyles = (greeting, sunMoon, background, backgroundSize, geoBack) => {
    clockApp.greeting.innerHTML = greeting;
    clockApp.sunMoon.className = sunMoon;
    clockApp.body.style.background = background;
    clockApp.body.style.backgroundSize = backgroundSize
    clockApp.geoData.style.background = geoBack;
  }

// Get current time and create interval to update time
clockApp.currentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if (hour >= 12 && hour < 19) {
    clockApp.setTimeStyles("Afternoon", "fas fa-sun", `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)),
    url('./assets/dayBackground.jpg')`, "100% 100%", "rgba(197, 197, 197, 0.9)");
  } else if (hour >= 19) {
    clockApp.setTimeStyles("Evening", "fas fa-moon", `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)),
    url('./assets/nightBackground.jpg')`, "100% 100%");
  } else if (hour >= 0 && hour < 4) {
    clockApp.setTimeStyles("Evening", "fas fa-moon", `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)),
    url('./assets/nightBackground.jpg')`, "100% 100%");
  } else {
    clockApp.setTimeStyles("Morning", "fas fa-sun", `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)),
    url('./assets/dayBackground.jpg')`, "100% 100%", "rgba(197, 197, 197, 0.9)")
  }

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
          clockApp.quote.innerHTML = `"${data.quote}"`;
          clockApp.author.innerHTML = data.author
        });
};

//Method to get geolocation data based on IP
clockApp.getGeoData = async () => {
  await fetch(`http://ip-api.com/json/`)
        .then(response => response.json())
        .then(data => {
          clockApp.location.innerHTML = `${data.city}, ${data.country}`;
          clockApp.timezone.innerHTML = data.timezone;
        })
};

clockApp.moreLessButton = () => {
  if (!clockApp.toggleGeo) {
    if (clockApp.appWidth < 686) {
      clockApp.geoData.style.transform= "translateY(10vh)";
    } else if (clockApp.appWidth > 686) {
      clockApp.geoData.style.transform= "translateY(0)";
    }
    clockApp.quoteContainer.style.transform= "translateY(-45vh)"
    clockApp.clockSection.style.transform = "translateY(-45vh)";
    clockApp.toggleGeo = true;
    clockApp.moreLessText.innerHTML = "Less";
    clockApp.chevron.classList.remove("fa-chevron-down");
    clockApp.chevron.classList.add("fa-chevron-up");
  } else {
    clockApp.quoteContainer.style.transform= "translateY(0vh)"
    clockApp.geoData.style.transform= "translateY(50vh)";
    clockApp.clockSection.style.transform = "translateY(0)";
    clockApp.geoData.style.transform= "translateY(50vh)";
    clockApp.toggleGeo = false;
    clockApp.moreLessText.innerHTML = "More";
    clockApp.chevron.classList.remove("fa-chevron-up");
    clockApp.chevron.classList.add("fa-chevron-down");
  }
}

clockApp.eventListeners = () => {
  window.addEventListener('resize', () => {
    clockApp.appWidth = window.innerWidth;
    if (clockApp.appWidth > 686 && clockApp.toggleGeo) {
      clockApp.geoData.style.transform= "translateY(0)"
    } else if (clockApp.appWidth < 686 && clockApp.toggleGeo) {
      clockApp.geoData.style.transform= "translateY(10vh)"
    }
  })
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