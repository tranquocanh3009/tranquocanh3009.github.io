let quotesData;
const color = ['#', '', '','', '', '', '', ''];

function getQuotes() {
  return $.ajax({
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: (jsonFile) => {quotesData = JSON.parse(jsonFile)}
  })
}

function getQuote() {
  let randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + randomQuote.quote + '"\n- ' + randomQuote.author));
  $(".quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#text').text(randomQuote.quote);
    }
  );

  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#author').html(randomQuote.author);
    }
  );
}

$(document).ready(() => {
    getQuotes().then(() => {
      getQuote();
    });

    $('#new-quote').on('click', getQuote);
})