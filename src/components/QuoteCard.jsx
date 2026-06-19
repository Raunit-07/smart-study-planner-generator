function QuoteCard() {
  const quotes = [
    "Success is the sum of small efforts repeated daily.",
    "Stay focused and never give up.",
    "Consistency beats motivation.",
    "Every study session counts."
  ];

  const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

  return (
  <div className="quote-card">
    <h3>Daily Motivation</h3>

    <p>"{randomQuote}"</p>

    <small>
      Keep moving forward. Small progress every day compounds into success.
    </small>
    </div>
    );
}

export default QuoteCard;