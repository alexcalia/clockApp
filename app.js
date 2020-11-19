const clockApp = {}

// Caching
clockApp.quoteDOM = document.getElementById('quote');
clockApp.authorDOM = document.getElementById('author');

// Vartiables
clockApp.quote = "";
clockApp.author = "";

clockApp.getQuote = async () => {
  await fetch(`http://quotes.stormconsultancy.co.uk/random.json`)
        .then(response => response.json())
        .then(data => {
          clockApp.quoteDOM.innerHTML = data.quote;
          clockApp.authorDOM.innerHTML = `- ${data.author}`
        });
};

clockApp.eventListeners = () => {

};

clockApp.init = () => {
  clockApp.eventListeners();
  clockApp.getQuote();
};

document.addEventListener("DOMContentLoaded", () => {
  clockApp.init();
});