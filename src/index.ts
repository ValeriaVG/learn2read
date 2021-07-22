import words from "./words/svenska";

const getRandomWord = (except?: Set<string>) => {
  const keys = [...words.keys()];
  const key = keys[Math.floor(Math.random() * (words.size - 1))];
  if (except && except.has(key)) return getRandomWord(except);
  return key;
};

window.addEventListener("DOMContentLoaded", async () => {
  const stats = {
    score: 0,
    words: 0,
    correct: 0,
  };
  document.body.setAttribute(
    "style",
    "text-align:center;margin-top:5rem; display:flex; flex-direction:column;"
  );
  const text = document.createElement("div");
  text.setAttribute(
    "style",
    "text-transform:uppercase; font-family:sans-serif; font-size:5rem"
  );

  document.body.appendChild(text);

  const list = document.createElement("ul");
  list.setAttribute(
    "style",
    "font-size:5rem; list-style-type:none; display:flex; padding:0;margin:1rem auto 0 auto"
  );
  document.body.appendChild(list);
  const scoreBoard = document.createElement("div");
  scoreBoard.setAttribute(
    "style",
    "font-size:3rem;margin-top:3rem; font-weight:bold; font:monospace;color:teal;"
  );
  document.body.appendChild(scoreBoard);

  let timer;
  const onAnsweredCorrectly = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(newQuestion, 1_000);
  };

  const newQuestion = () => {
    stats.words++;
    scoreBoard.innerText = stats.score.toString();
    let tries = 0;
    const word = getRandomWord();
    text.innerText = word;
    list.innerHTML = "";
    const correctAnswer = Math.floor(Math.random() * 3);
    const usedWords = new Set<string>([word]);
    for (let i = 0; i < 4; i++) {
      const li = document.createElement("li");
      const isCorrectAnswer = i === correctAnswer;
      const currentWord = isCorrectAnswer ? word : getRandomWord(usedWords);
      li.setAttribute(
        "style",
        "width:6rem;height:6rem;margin:0 0.5rem; cursor:pointer;"
      );
      li.innerText = words.get(currentWord);
      li.onclick = () => {
        if (isCorrectAnswer) {
          li.innerText = "✅";
          const delta = Math.ceil((Math.max(3 - tries, 0) * word.length) / 3);
          scoreBoard.innerHTML = `<em>+${delta}</em>`;
          stats.score += delta;
          stats.correct++;
          li.onclick = () => {};
          return onAnsweredCorrectly();
        }
        li.innerText = "❌";
        tries++;
      };
      usedWords.add(currentWord);
      list.appendChild(li);
    }
    console.log(usedWords);
  };

  newQuestion();
});
