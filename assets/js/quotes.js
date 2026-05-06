const quotes = [
  {
    text: "We shall not cease from exploration, and the end of all our exploring will be to arrive where we started and know the place for the first time.",
    attr: "— T. S. Eliot"
  },
  {
    text: "The secret of getting ahead is getting started.",
    attr: "— Mark Twain"
  },
  {
    text: "One must still have chaos in oneself to be able to give birth to a dancing star.",
    attr: "— Friedrich Nietzsche"
  },
  {
    text: "It is not the mountain we conquer, but ourselves.",
    attr: "— Edmund Hillary"
  },
  {
    text: "He who has a why to live can bear almost any how.",
    attr: "— Friedrich Nietzsche"
  },
  {
    text: "The obstacle is the way.",
    attr: "— Marcus Aurelius"
  },
  {
    text: "Knowing yourself is the beginning of all wisdom.",
    attr: "— Aristotle"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    attr: "— Albert Einstein"
  },
  {
    text: "What we plant in the soil of contemplation, we shall reap in the harvest of action.",
    attr: "— Meister Eckhart"
  },
  {
    text: "The unexamined life is not worth living.",
    attr: "— Socrates"
  }
];

let qi = 0;
const qText = document.getElementById('q-text');
const qAttr  = document.getElementById('q-attr');

function showQuote(idx) {
  qText.textContent = quotes[idx].text;
  qAttr.textContent = quotes[idx].attr;
}

function cycleQuote() {
  qText.classList.add('fading');
  qAttr.classList.add('fading');
  setTimeout(() => {
    qi = (qi + 1) % quotes.length;
    showQuote(qi);
    qText.classList.remove('fading');
    qAttr.classList.remove('fading');
  }, 650);
}

showQuote(0);
setInterval(cycleQuote, 6000);