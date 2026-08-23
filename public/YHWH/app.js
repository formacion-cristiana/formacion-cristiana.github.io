import { WORD_DATA } from "./palabras-es.js";
import { TEXT, t, EMOJI_MAP } from "./texto-es.js";

const $ = (id) => document.getElementById(id);

const state = {
  players: 2,
  turnTime: 120,
  rTot: 3,
  selectedCategories: [],
  words: [],
  usedWordIds: new Set(),
  currentWord: null,
  currentRound: 0,
  currentClueRound: 0,
  currentClueRoundAttempts: 0,
  currentPlayer: 0,
  roundStarter: 0,
  roundWordsCompleted: 0,
  scores: [],
  timerId: null,
  paused: false,
  selectedGuessCategory: "",
  guessedWordParts: [],
  guessedCategory: false,
  remainingSeconds: 120,
  gameOver: false,
  playerColors: [],
  revealType: null
};

function normalize(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

function equivalent(a, b) {
  const aa = normalize(a).replace(/\s+/g, "");
  const bb = normalize(b).replace(/\s+/g, "");
  if (!aa || !bb) return false;
  if (aa === bb) return true;
  if (Math.abs(aa.length - bb.length) > 1) return false;

  if (aa.length === bb.length) {
    let differences = 0;
    for (let i = 0; i < aa.length; i++) {
      if (aa[i] !== bb[i] && ++differences > 1) return false;
    }
    return differences === 1;
  }

  const longer = aa.length > bb.length ? aa : bb;
  const shorter = aa.length > bb.length ? bb : aa;
  let i = 0, j = 0, differences = 0;
  while (i < longer.length && j < shorter.length) {
    if (longer[i] === shorter[j]) { i++; j++; }
    else {
      differences++;
      if (differences > 1) return false;
      i++;
    }
  }
  if (i < longer.length) differences++;
  return differences <= 1;
}

function splitAnswer(word) {
  return String(word).split("&").map(x => x.trim()).filter(Boolean);
}

function stripVowels(s) {
  return String(s).replace(/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/g, "");
}

function revealVowels(s, count) {
  let shown = 0;
  return [...String(s)].map(ch => {
    if (/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/.test(ch) && shown < count) {
      shown++;
      return ch;
    }
    if (/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/.test(ch)) return "·";
    return ch;
  }).join("");
}

function flattenData() {
  const result = [];
  WORD_DATA.forEach((main, mainIndex) => {
    main.words.forEach((sub, subIndex) => {
      sub.words.forEach((word, i) => {
        result.push({
          id: `${mainIndex}-${subIndex}-${i}`,
          mainCategory: main.category,
          difficulty: main.dificultad,
          fortext: main.fortext,
          subcategory: sub.category,
          word,
          help: sub.help?.[i] ?? "",
          PN: sub.PN ?? true
        });
      });
    });
  });
  return result;
}

function init() {
  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  
  setText("subtitle", TEXT.subtitle);
  setText("start-title", t("startTitle"));
  setText("player-colors-title", t("playerColorsTitle"));
  setText("players-label", t("players"));
  setText("time-label", t("time"));
  setText("rounds-label", t("rounds"));
  setText("categories-title", t("categoriesTitle"));
  setText("random-categories", t("randomCategories"));
  setText("category-count", t("categoryCount"));
  setText("start-game", t("startGame"));
  setText("board-title-text", t("boardTitle"));
  setText("computer-badge", t("computer"));
  setText("reveal-title", t("specialRound"));
  setText("continue-reveal", t("continue"));
  setText("end-title", t("end"));
  setText("new-game", t("newGame"));
  setText("pause-time", t("pause"));
  setText("feedback-continue", t("continue"));
  setText("submit-guess", t("guess"));

  const rev1 = document.querySelector(".reveal-row:nth-child(1) .reveal-label");
  if (rev1) rev1.textContent = t("revealCategoryLabel");
  const rev2 = document.querySelector(".reveal-row:nth-child(2) .reveal-label");
  if (rev2) rev2.textContent = t("revealFortextLabel");
  const rev3 = document.querySelector(".reveal-row:nth-child(3) .reveal-label");
  if (rev3) rev3.textContent = t("revealWordLabel");
  const rev4 = document.querySelector(".reveal-row:nth-child(4) .reveal-label");
  if (rev4) rev4.textContent = t("revealHelpLabel");

  $("info-btn")?.addEventListener("click", () => {
    $("rules-modal")?.classList.remove("hidden");
  });
  $("close-rules")?.addEventListener("click", () => {
    $("rules-modal")?.classList.add("hidden");
  });

  const playersSelect = $("players");
  if (playersSelect) {
    playersSelect.innerHTML = "";
    for (let i = 1; i <= Math.max(1, WORD_DATA.length - 1); i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = i;
      playersSelect.appendChild(opt);
    }
    playersSelect.value = Math.min(2, WORD_DATA.length - 1);

    playersSelect.addEventListener("change", () => {
      const maxPlayers = Math.max(1, WORD_DATA.length - 1);
      if (Number(playersSelect.value) > maxPlayers) playersSelect.value = maxPlayers;
      ensurePlayerColors();
      renderPlayerColorSelection();
      renderCategorySelection();
    });
  }

  renderPlayerColorSelection();
  renderCategorySelection();
  renderGuessInputs();

  $("random-categories")?.addEventListener("click", randomCategories);
  $("start-game")?.addEventListener("click", startGame);
  $("submit-guess")?.addEventListener("click", submitGuess);
  $("pause-time")?.addEventListener("click", togglePause);
  $("feedback-continue")?.addEventListener("click", continueFeedback);
  $("continue-reveal")?.addEventListener("click", continueAfterReveal);
  $("new-game")?.addEventListener("click", () => location.reload());
}

const CATEGORY_COLORS = [
  "#ffd6d6", "#ffe3b3", "#fff3b0", "#d9f2d9", "#cfe6ff", "#e4d4ff", "#ffd5eb", "#d7f5f0", "#e7e7e7", "#f4d6b8"
];
const PLAYER_COLORS = [
  { name: "rojo", value: "#d62828" },
  { name: "naranja", value: "#f77f00" },
  { name: "amarillo", value: "#e9c46a" },
  { name: "verde", value: "#2a9d8f" },
  { name: "azul", value: "#4f7fc1" },
  { name: "violeta", value: "#9b59d0" },
  { name: "rosado", value: "#e76f9f" }
];
function categoryColor(index) {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}
function ensurePlayerColors() {
  const n = Number($("players")?.value) || 1;
  while (state.playerColors.length < n) state.playerColors.push(null);
  state.playerColors.length = n;
  const used = new Set(state.playerColors.filter(Boolean));
  for (let i = 0; i < n; i++) {
    if (!state.playerColors[i]) {
      const available = PLAYER_COLORS.map(x => x.value).filter(c => !used.has(c));
      state.playerColors[i] = available.length ? available[0] : PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)].value;
      used.add(state.playerColors[i]);
    }
  }
}
function renderPlayerColorSelection() {
  ensurePlayerColors();
  const box = $("player-colors");
  if (!box) return;
  const n = Number($("players")?.value) || 1;
  box.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "player-color-button";
    const color = state.playerColors[i];
    btn.style.borderColor = color;
    btn.style.background = color;
    btn.textContent = `${t("player")} ${i + 1}`;
    btn.addEventListener("click", () => openPlayerColorPicker(i));
    box.appendChild(btn);
  }
}
function openPlayerColorPicker(playerIndex) {
  const box = $("player-color-options");
  if (!box) return;
  box.innerHTML = `<strong>${t("choosePlayerColor", { n: playerIndex + 1 })}</strong>`;
  PLAYER_COLORS.forEach(color => {
    const usedByOther = state.playerColors.some((v, i) => i !== playerIndex && v === color.value);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-option";
    btn.style.background = color.value;
    btn.textContent = color.name;
    btn.disabled = usedByOther;
    btn.addEventListener("click", () => {
      state.playerColors[playerIndex] = color.value;
      renderPlayerColorSelection();
      box.innerHTML = "";
    });
    box.appendChild(btn);
  });
}

function renderCategorySelection() {
  const n = (Number($("players")?.value) || 1) + 1;
  const catCountEl = $("category-count");
  if (catCountEl) catCountEl.textContent = `${t("categoryCount")} (${n} necesarias)`;
  const container = $("categories");
  if (!container) return;
  container.innerHTML = "";

  WORD_DATA.forEach((cat, index) => {
    const selectedOrderIndex = state.selectedCategories.indexOf(index);
    const isSelected = selectedOrderIndex !== -1;

    const card = document.createElement("button");
    card.type = "button";
    card.className = `category-card ${isSelected ? "selected" : ""}`;

    if (isSelected) {
      const assignedColor = categoryColor(selectedOrderIndex);
      card.style.setProperty("--selected-bg", assignedColor);
    }

    card.innerHTML = `<h4>${escapeHtml(cat.category)}</h4>
      <span class="badge">Dificultad ${escapeHtml(cat.dificultad)}</span>
      <p>${escapeHtml(cat.fortext)}</p>`;
    card.addEventListener("click", () => toggleCategory(index));
    container.appendChild(card);
  });
}

function toggleCategory(index) {
  const n = (Number($("players")?.value) || 1) + 1;
  const i = state.selectedCategories.indexOf(index);
  if (i >= 0) state.selectedCategories.splice(i, 1);
  else if (state.selectedCategories.length < n) state.selectedCategories.push(index);
  else return;
  renderCategorySelection();
}

function randomCategories() {
  const n = (Number($("players")?.value) || 1) + 1;
  state.selectedCategories = [...WORD_DATA.keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, n);
  renderCategorySelection();
}

function startGame() {
  const players = Number($("players")?.value) || 1;
  const maxPlayers = Math.max(1, WORD_DATA.length - 1);
  const n = players + 1;
  if (players > maxPlayers) {
    if ($("start-error")) $("start-error").textContent = t("tooManyPlayers", { max: maxPlayers });
    return;
  }
  if (state.selectedCategories.length !== n) {
    if ($("start-error")) $("start-error").textContent = t("selectCategories", { n });
    return;
  }

  state.players = players;
  state.turnTime = Math.max(10, Number($("turn-time")?.value) || 120);
  state.rTot = Math.max(1, Number($("round-total")?.value) || 3);

  const selectedSet = new Set(state.selectedCategories);
  state.words = flattenData().filter(w => {
    const categoryIndex = WORD_DATA.findIndex(c => c.category === w.mainCategory);
    return selectedSet.has(categoryIndex);
  });

  if (state.words.length < state.players + 1) {
    if ($("start-error")) $("start-error").textContent = t("noWords");
    return;
  }

  ensurePlayerColors();
  state.scores = Array(state.players).fill(0);
  state.usedWordIds.clear();
  state.currentRound = 0;
  state.currentClueRound = 0;
  state.currentClueRoundAttempts = 0;
  state.currentPlayer = 0;
  state.roundStarter = 0;
  state.roundWordsCompleted = 0;
  state.gameOver = false;
  state.paused = false;
  state.selectedGuessCategory = "";
  state.guessedWordParts = [];
  state.guessedCategory = false;
  state.wordBlockScored = false;
  state.categoryBlockScored = false;
  state.revealType = "initial";

  $("screen-start")?.classList.add("hidden");
  $("screen-game")?.classList.remove("hidden");
  renderBoard();
  startComputerReveal("initial");
}

function nextWord() {
  if (state.roundWordsCompleted >= state.players) {
    startComputerReveal();
    return;
  }
  const available = state.words.filter(w => !state.usedWordIds.has(w.id));
  if (!available.length) {
    endGame();
    return;
  }

  state.currentWord = available[Math.floor(Math.random() * available.length)];
  state.currentClueRound = 0;
  state.currentClueRoundAttempts = 0;
  state.selectedGuessCategory = "";
  state.guessedWordParts = [];
  state.guessedCategory = false;
  state.wordBlockScored = false;
  state.categoryBlockScored = false;
  hideFeedbackModal();
  renderGuessInputs();
  updateRoundUI();
  startTimer();
  renderClue();
}

function getAnswerParts(word) {
  const raw = String(word ?? "");
  const parts = splitAnswer(raw);
  const explicitTargets = parts.map(part => {
    const matches = part.match(/[A-ZÁÉÍÓÚÜÑ]+(?:-[A-ZÁÉÍÓÚÜÑ]+)*/g);
    return matches ? matches.join(" ").trim() : "";
  }).filter(Boolean);

  if (explicitTargets.length) return explicitTargets;
  return parts;
}

function renderGuessInputs() {
  const container = $("guess-words");
  if (!container) return;
  container.innerHTML = "";

  const answers = state.currentWord ? getAnswerParts(state.currentWord.word) : [""];
  for (let i = 0; i < Math.max(1, answers.length); i++) {
    const input = document.createElement("input");
    input.className = "guess-word-input";
    input.id = `guess-word-${i}`;
    input.autocomplete = "off";
    input.placeholder = answers.length > 1
      ? t("guessPartPlaceholder", { n: i + 1 })
      : t("guessPlaceholder");
    if (state.guessedWordParts[i]) {
      input.value = answers[i];
      input.disabled = true;
      input.classList.add("already-guessed");
    }
    input.addEventListener("keydown", e => { if (e.key === "Enter") submitGuess(); });
    container.appendChild(input);
  }
}

function populateCategorySelect() {
  const container = $("guess-categories");
  if (!container) return;
  const current = state.selectedGuessCategory || "";
  container.innerHTML = "";

  state.selectedCategories.forEach((index, selectedOrderIndex) => {
    const cat = WORD_DATA[index];
    const assignedColor = categoryColor(selectedOrderIndex);

    const isCorrectCategory = state.guessedCategory &&
      normalize(state.currentWord.mainCategory) === normalize(cat.category);
    const isSelected = !state.guessedCategory && normalize(current) === normalize(cat.category);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `category-choice ${isSelected || isCorrectCategory ? "selected" : ""}`;
    btn.style.background = assignedColor;
    btn.style.setProperty("--category-choice-bg", assignedColor);
    btn.textContent = cat.category;

    if (state.guessedCategory) btn.disabled = true;
    btn.addEventListener("click", () => {
      if (state.guessedCategory) return;
      state.selectedGuessCategory = normalize(current) === normalize(cat.category) ? "" : cat.category;
      populateCategorySelect();
    });
    container.appendChild(btn);
  });
}

function updateRoundUI() {
  if ($("round-label")) $("round-label").textContent = `${t("round")}: ${state.currentClueRound + 1}/${state.rTot}`;
  if ($("turn-label")) $("turn-label").textContent = `${t("turn")} ${t("player")} ${state.currentPlayer + 1}`;
  renderScoreboard();
}

function renderScoreboard() {
  const el = $("scoreboard");
  if (!el) return;
  el.innerHTML = "";
  const maxScore = Math.max(0, ...state.scores);
  state.scores.forEach((score, i) => {
    const d = document.createElement("div");
    const color = state.playerColors[i] || PLAYER_COLORS[i % PLAYER_COLORS.length].value;
    const percent = maxScore > 0 ? Math.min(100, (score / maxScore) * 100) : 0;
    d.className = `score ${i === state.currentPlayer ? "active" : ""} ${score === 0 ? "zero" : ""}`;
    d.style.setProperty("--player-color", color);
    d.style.setProperty("--score-fill", `${percent}%`);
    d.innerHTML = `<strong>${t("player")} ${i + 1}</strong><span>${formatPoints(score)} ${t("points")}</span>`;
    el.appendChild(d);
  });
}

function renderClue() {
  const w = state.currentWord;
  let r = state.currentClueRound;

  const hasSubcategory = Boolean(w.subcategory && w.subcategory.trim() !== "");
  if (!hasSubcategory && r < 2) {
    r = 2;
  }

  const raw = String(w.word);
  const parts = splitAnswer(raw);

  let vowelCount = r >= 3 ? r - 2 : 0;
  let vowelBudget = vowelCount;
  const displayedParts = parts.map(part => {
    const targetMatches = part.match(/[A-ZÁÉÍÓÚÜÑ]+(?:-[A-ZÁÉÍÓÚÜÑ]+)*/g);
    if (!targetMatches) return part;

    let remaining = part;
    targetMatches.forEach(target => {
      const targetNorm = normalize(target);
      if (EMOJI_MAP && EMOJI_MAP[targetNorm]) {
        remaining = remaining.replace(target, EMOJI_MAP[targetNorm]);
      } else {
        const shown = vowelCount > 0 ? revealVowels(target, vowelBudget) : stripVowels(target);
        vowelBudget = Math.max(0, vowelBudget - (target.match(/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/g) || []).length);
        remaining = remaining.replace(target, shown);
      }
    });
    return remaining;
  });

  if (r < 3) {
    for (let i = 0; i < displayedParts.length; i++) {
      const part = parts[i];
      if (/[A-ZÁÉÍÓÚÜÑ]+/.test(part)) {
        displayedParts[i] = part.replace(/[A-ZÁÉÍÓÚÜÑ]+(?:-[A-ZÁÉÍÓÚÜÑ]+)*/g, m => {
          const norm = normalize(m);
          return (EMOJI_MAP && EMOJI_MAP[norm]) ? EMOJI_MAP[norm] : stripVowels(m);
        });
      }
    }
  }

  const clues = [];
  if (r >= 1 && w.help) clues.push(`<span class="hint-attention">${escapeHtml(t("hintHelp", { help: w.help }))}</span>`);
  if (r >= 2 && hasSubcategory) clues.push(`<span class="subcategory-attention">${escapeHtml(t("hintSubcategory", { category: w.subcategory }))}</span>`);
  if (r >= 3 || !hasSubcategory) clues.push(`<span class="hint-attention">${escapeHtml(t("hintVowel"))}</span>`);

  if ($("attempt-status")) $("attempt-status").innerHTML = clues.join(" ");
  if ($("clue-stage")) $("clue-stage").textContent = displayedParts.join(" & ");
  populateCategorySelect();
  updateRoundUI();
  renderTimer();
}

function getGuesses() {
  const inputs = [...document.querySelectorAll(".guess-word-input")];
  return inputs.map(input => input.value.trim());
}

function submitGuess() {
  if (!state.currentWord || state.gameOver || state.paused) return;

  const guesses = getGuesses();
  const answers = getAnswerParts(state.currentWord.word);
  const guessCategory = state.selectedGuessCategory || "";

  const newlyCorrectParts = [];
  answers.forEach((answer, i) => {
    const userGuess = (guesses[i] ?? "").trim();
    if (!state.guessedWordParts[i] && userGuess.length > 0 && equivalent(userGuess, answer)) {
      newlyCorrectParts.push(i);
    }
  });

  const categoryOK = !state.guessedCategory &&
    normalize(guessCategory) !== "" &&
    normalize(guessCategory) === normalize(state.currentWord.mainCategory);

  newlyCorrectParts.forEach(i => { state.guessedWordParts[i] = true; });
  if (categoryOK) state.guessedCategory = true;

  const wordDone = state.guessedWordParts.length === answers.length && state.guessedWordParts.every(Boolean);
  const allDone = wordDone && state.guessedCategory;

  const basePoints = Math.max(1, 2 * (state.rTot - state.currentClueRound));
  const blockPoints = basePoints / 2;
  const wordPartPoints = blockPoints / answers.length;

  let awarded = 0;
  if (newlyCorrectParts.length > 0) {
    awarded += newlyCorrectParts.length * wordPartPoints;
  }
  if (categoryOK) {
    awarded += blockPoints;
  }

  awarded = Math.max(0, awarded);
  state.scores[state.currentPlayer] += awarded;

  if (allDone) {
    showFeedback(`${t("correct")} +${formatPoints(awarded)} ${t("points")}.`, "good", "finish");
    return;
  }

  if (categoryOK && !wordDone) {
    showFeedback(`${t("incorrectWordCorrectCategory")} +${formatPoints(awarded)} ${t("points")}.`, "partial", "partial");
    return;
  }

  if (newlyCorrectParts.length > 0) {
    const parts = [];
    parts.push(answers.length > 1 && newlyCorrectParts.length < answers.length
      ? t("wordPartialCorrect")
      : t("wordBlockCorrect"));

    if (state.guessedCategory) parts.push(t("categoryCorrect"));
    showFeedback(`${parts.join(" ")} +${formatPoints(awarded)} ${t("points")}.`, "partial", "partial");
    return;
  }

  showFeedback(t("incorrect"), "bad", "fail");
}

function formatPoints(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

function showFeedback(message, kind, action) {
  stopTimer();
  state.feedbackAction = action;
  if ($("feedback-message")) {
    $("feedback-message").textContent = message;
    $("feedback-message").className = `feedback ${kind}`;
  }
  $("feedback-modal")?.classList.remove("hidden");
}

function hideFeedbackModal() {
  $("feedback-modal")?.classList.add("hidden");
  if ($("feedback-message")) $("feedback-message").textContent = "";
}

function continueFeedback() {
  hideFeedbackModal();

  if (state.feedbackAction === "finish") {
    finishWord();
    return;
  }

  if (state.feedbackAction === "partial" || state.feedbackAction === "fail") {
    advanceFailedAttempt();
  }
  if (state.feedbackAction === "revealed") {
    if (state.roundWordsCompleted >= state.players) startComputerReveal();
    else nextWord();
  }
}

function finishWord() {
  stopTimer();
  state.usedWordIds.add(state.currentWord.id);
  state.roundWordsCompleted++;
  state.currentPlayer = (state.currentPlayer + 1) % state.players;
  renderBoard();

  setTimeout(() => {
    if (state.roundWordsCompleted >= state.players) startComputerReveal();
    else nextWord();
  }, 650);
}

function advanceFailedAttempt() {
  state.currentPlayer = (state.currentPlayer + 1) % state.players;
  state.currentClueRoundAttempts++;

  if (state.currentClueRoundAttempts >= state.players) {
    state.currentClueRoundAttempts = 0;
    state.currentClueRound++;

    if (state.currentClueRound >= state.rTot) {
      stopTimer();
      startComputerReveal("exhausted", state.currentWord);
      return;
    }
  }

  startTimer();
  renderClue();
}

function startTimer() {
  stopTimer();
  state.remainingSeconds = state.turnTime;
  state.paused = false;
  updatePauseButton();
  renderTimer();
  state.timerId = setInterval(() => {
    if (state.paused) return;
    state.remainingSeconds--;
    renderTimer();
    if (state.remainingSeconds <= 0) {
      stopTimer();
      showFeedback(t("timeout"), "bad", "fail");
    }
  }, 1000);
}

function togglePause() {
  if (!state.currentWord || state.gameOver) return;
  state.paused = !state.paused;
  updatePauseButton();
}

function updatePauseButton() {
  const btn = $("pause-time");
  if (!btn) return;
  btn.textContent = state.paused ? t("resume") : t("pause");
  btn.setAttribute("aria-label", btn.textContent);
}

function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function renderTimer() {
  const min = Math.floor(state.remainingSeconds / 60);
  const sec = state.remainingSeconds % 60;
  if ($("timer")) {
    $("timer").textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    $("timer").classList.toggle("warning", state.remainingSeconds <= 10);
  }
}

function startComputerReveal(type = "computer", word = null) {
  stopTimer();
  const available = state.words.filter(w => !state.usedWordIds.has(w.id));
  const revealWord = word || available[Math.floor(Math.random() * available.length)];
  if (!revealWord) { endGame(); return; }

  state.currentWord = revealWord;
  state.revealType = type;
  $("screen-game")?.classList.add("hidden");
  $("screen-reveal")?.classList.remove("hidden");

  if ($("revealed-category")) $("revealed-category").textContent = `${state.currentWord.mainCategory} · ${state.currentWord.subcategory}`;
  if ($("reveal-fortext")) $("reveal-fortext").textContent = state.currentWord.fortext || "";
  if ($("revealed-word")) $("revealed-word").textContent = state.currentWord.word;
  if ($("reveal-help")) $("reveal-help").textContent = state.currentWord.help || "";
  if ($("reveal-title")) $("reveal-title").textContent = type === "exhausted" ? t("revealedUnansweredTitle") : t("specialRound");
}

function continueAfterReveal() {
  const type = state.revealType;

  if (type === "exhausted") {
    state.usedWordIds.add(state.currentWord.id);
    state.roundWordsCompleted++;
    renderBoard();
  } else if (type === "computer" || type === "initial") {
    state.usedWordIds.add(state.currentWord.id);
  }

  state.roundWordsCompleted = 0;
  state.currentRound++;

  if (type !== "initial") {
    state.roundStarter = (state.roundStarter + 1) % state.players;
  }
  state.currentPlayer = state.roundStarter;
  state.currentClueRound = 0;
  state.currentClueRoundAttempts = 0;
  state.paused = false;
  state.revealType = null;

  $("screen-reveal")?.classList.add("hidden");
  $("screen-game")?.classList.remove("hidden");
  renderBoard();

  if (state.usedWordIds.size >= state.words.length) endGame();
  else nextWord();
}

function renderBoard() {
  const container = $("board-categories");
  if (!container) return;
  container.innerHTML = "";
  const countEl = $("discovered-count");
  if (countEl) countEl.textContent = state.usedWordIds.size;

  state.selectedCategories.forEach((index, selectedOrderIndex) => {
    const main = WORD_DATA[index];
    const assignedColor = categoryColor(selectedOrderIndex);

    const block = document.createElement("section");
    block.className = "board-category";
    block.style.setProperty("--category-bg", assignedColor);

    const discovered = state.words.filter(w =>
      w.mainCategory === main.category && state.usedWordIds.has(w.id)
    );

    block.innerHTML = `<h3>${escapeHtml(main.category)}</h3>
      <div class="fortext">${escapeHtml(main.fortext)}</div>
      <div class="word-list"></div>`;

    const list = block.querySelector(".word-list");
    discovered.forEach(w => {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      chip.innerHTML = `<strong>${escapeHtml(w.word)}</strong>
        <small>${escapeHtml(w.subcategory)}</small>`;
      list.appendChild(chip);
    });
    if (!discovered.length) list.innerHTML = `<span class="word-chip">—</span>`;
    container.appendChild(block);
  });
}

function endGame() {
  stopTimer();
  state.gameOver = true;
  $("screen-game")?.classList.add("hidden");
  $("screen-reveal")?.classList.add("hidden");
  $("screen-end")?.classList.remove("hidden");

  const sorted = state.scores.map((score, i) => ({ i, score })).sort((a, b) => b.score - a.score);
  const best = sorted[0]?.score ?? 0;
  if ($("final-scores")) {
    $("final-scores").innerHTML = sorted.map(x =>
      `<div class="final-score"><strong>${t("player")} ${x.i + 1}</strong><span>${x.score} ${t("points")}</span></div>`
    ).join("") + `<p>${best > 0 ? `${t("won")}: ${t("player")} ${sorted[0].i + 1}` : t("tie")}</p>`;
  }
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

window.addEventListener("DOMContentLoaded", init);
