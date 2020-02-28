let quotesData = [];

function getQuotes() {
    return $.ajax({
      headers: {
        Accept: "application/json"
      },
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function(jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
          quotesData = JSON.parse(jsonQuotes);
        }
      }
    });
  }

function getQuote() {
    let randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.length)];
    $("#text").html(randomQuote.quote);
    $("#author").html(randomQuote.author);
}

$(document).ready(() => {

    $("#new-quote").on("click", getQuote);
})