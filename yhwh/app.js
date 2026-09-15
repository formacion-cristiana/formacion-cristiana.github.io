let currentLang = "es";
let WORD_DATA = [];
let TEXT = {};
let t = (k, v) => TEXT[k] || k; // Actualizado para buscar en TEXT por defecto
let EMOJI_MAP = {};

const $ = (id) => document.getElementById(id);

const state = {
  players: 2,
  playerNames: [],
  turnTime: 120,
  rTot: 3,
  suggestedCategories: 3,
  selectedCategories: [],
  words: [],
  usedWordIds: new Set(),
  currentWord: null,
  currentRound: 0,
  currentClueRound: 0,
  primaryPlayer: 0,
  currentPlayer: 0,
  roundWordsCompleted: 0,
  scores: [],
  timerId: null,
  paused: false,
  selectedGuessCategory: "",
  guessedWordParts: [],
  guessedCategory: false,
  failedSubcategories: new Set(),
  selectedTag: "todos",
  remainingSeconds: 120,
  gameOver: false,
  playerColors: [],
  revealType: null,
  lastAwardedPoints: 0,
  categorySortOrder: "az"
};


async function loadLanguage(lang) {
  try {
    const wordMod = await import(`./palabras-${lang}.js`);
    const textMod = await import(`./texto-${lang}.js`);
    
    WORD_DATA = wordMod.WORD_DATA || [];
    TEXT = textMod.TEXT || {};
    
    if (typeof textMod.t === "function") {
      t = textMod.t;
    } else {
      t = (k) => TEXT[k] || k;
    }
    
    EMOJI_MAP = textMod.EMOJI_MAP || {};

    // Validar si el tag seleccionado existe en el nuevo idioma; de lo contrario, volver a "todos"
    if (state.selectedTag !== "todos") {
      const diffPrefix = t("difficultyTagPrefix") || "Dificultad";
      const availableTags = new Set();
      WORD_DATA.forEach(cat => {
        if (Array.isArray(cat.tags)) {
          cat.tags.forEach(tag => availableTags.add(tag.trim().toLowerCase()));
        }
        if (cat.dificultad !== undefined) {
          availableTags.add(`${diffPrefix.toLowerCase()} ${cat.dificultad}`);
        }
      });
      if (!availableTags.has(state.selectedTag.toLowerCase())) {
        state.selectedTag = "todos";
      }
    }

    updatePlayersOptions();
    updateUIElements();
    renderGlossary(); // Renderizado principal al cargar el idioma

    if ($("screen-game") && !$("screen-game").classList.contains("hidden")) {
      updateGameUIOnLangChange();
    }
  } catch (err) {
    console.error(`Error cargando los módulos para "${lang}":`, err);
    const container = $("glossary-container");
    if (container) {
      container.innerHTML = `<p style="color:red;">Error al cargar datos (${lang})</p>`;
    }
  }
}

// Diccionarios por idioma ampliados para la detección automática
const DICT_NOMBRES = {
  es: {
    patrones: /\b(HIJO DE|HIJA DE|DE TARSO|EL BAUTISTA|PADRE DE|MADRE DE)\b/i,
    nombres: new Set([
      "EMANUEL","ESAU","ZOROBABEL","ZACARIAS","ZEBEDEO","TIMEO","SAUL",
      "JESUS", "JESUCRISTO", "MARIA", "JOSE", "PEDRO", "PABLO", "JUAN", "SIMON", "SANTIAGO", 
      "ANDRES", "FELIPE", "BARTOLOME", "TOMAS", "MATEO", "JUDAS", "TADEO", "MOISES", "ABRAHAM", 
      "DAVID", "SALOMON", "NOE", "ADAN", "EVA", "AARON", "EZEQUIEL", "ISAIAS", "JEREMIAS", 
      "DANIEL", "ELIAS", "PILATO", "HERODES", "LAZARO", "MARTA", "MAGDALENA", "ISAAC", "ISABEL", 
      "ISMAEL", "JAIRO", "JACOB", "JEHOVA", "JONATAN", "JUDA", "JORDAN", "LEVI", "LUCAS", 
      "MATIAS", "NAZARENO", "PUBLICANOS", "REBECA", "RAQUEL", "ROMANOS", "SADUCEOS", 
      "SAMARITANOS", "SAMUEL", "SANSON", "SARA", "SARAH", "SEM", "YAHVEH",
      "ABEL", "ANA", "BALTASAR", "BELEN", "BENJAMIN", "FENICIOS", "FARISEOS", "GABRIEL", 
      "GASPAR", "GRIEGOS", "HERODIANOS", "HINDUISMO", "ISLAM", "JUDAISMO", "MELCHOR"
    ])
  },
  it: {
    patrones: /\b(FIGLIO DI|FIGLIA DI|DI TARSO|IL BATTISTA|PADRE DI|MADRE DI)\b/i,
    nombres: new Set([
      "GESU", "CRISTO", "MARIA", "GIUSEPPE", "PIETRO", "PAOLO", "GIOVANNI", "SIMONE", "GIACOMO", 
      "ANDREA", "FILIPPO", "BARTOLOMEO", "TOMMASO", "MATTEO", "GIUDA", "TADDEO", "MOISE", 
      "ABRAMO", "DAVIDE", "SALOMONE", "NOE", "ADAMO", "EVA", "ARONNE", "EZECHIELE", "ISAIA", 
      "GEREMIA", "DANIELE", "ELIA", "PILATO", "ERODE", "LAZZARO", "MARTA", "MADDALENA", "ISACCO", 
      "ELISABETTA", "ISMAELE", "JAIRO", "GIACOBBE", "GEOVA", "GIONATA", "GIUDA", "GIORDANO", 
      "LEVI", "LUCA", "MATTIA", "NAZARENO", "PUBBLICANI", "REBECCA", "RACHELE", "ROMANI", 
      "SADDUCEI", "SAMARITANI", "SAMUELE", "SANSONE", "SARA", "SEM", "YAHWEH",
      "ABELE", "ANNA", "BALDASSARRE", "BETLEMME", "BENIAMINO", "FENICI", "FARISEI", "GABRIELE", 
      "GASPARE", "GRECI", "ERODIANI", "INDUISMO", "ISLAM", "GIUDAISMO", "MELCHIORRE"
    ])
  },
  en: {
    patrones: /\b(SON OF|DAUGHTER OF|OF TARSUS|THE BAPTIST|FATHER OF|MOTHER OF)\b/i,
    nombres: new Set([
      "JESUS", "CHRIST", "MARY", "JOSEPH", "PETER", "PAUL", "JOHN", "SIMON", "JAMES", 
      "ANDREW", "PHILIP", "BARTHOLOMEW", "THOMAS", "MATTHEW", "JUDAS", "THADDEUS", "MOSES", 
      "ABRAHAM", "DAVID", "SOLOMON", "NOAH", "ADAM", "EVE", "AARON", "EZEKIEL", "ISAIAH", 
      "JEREMIAH", "DANIEL", "ELIJAH", "PILATE", "HEROD", "LAZARUS", "MARTHA", "MAGDALENE", 
      "ISAAC", "ELIZABETH", "ISHMAEL", "JAIRUS", "JACOB", "JEHOVAH", "JONATHAN", "JUDAH", 
      "JORDAN", "LEVI", "LUKE", "MATTHIAS", "NAZARENE", "PUBLICANS", "REBEKAH", "RACHEL", 
      "ROMANS", "SADDUCEES", "SAMARITANS", "SAMUEL", "SAMSON", "SARAH", "SHEM", "YAHWEH",
      "ABEL", "ANNA", "BALTHAZAR", "BETHLEHEM", "BENJAMIN", "PHOENICIANS", "PHARISEES", "GABRIEL", 
      "CASPAR", "GREEKS", "HERODIANS", "HINDUISM", "ISLAM", "JUDAISM", "MELCHIOR"
    ])
  }
};

// Nueva función de extracción flexible para prefijos ("el CENTURIÓN", "Hijo de ABRAHAM")
function parseWordStructure(text) {
  const trimmed = text.trim();
  
  // Coincide con cualquier prefijo inicial (minúsculas o palabras con minúsculas tipo "Hijo de")
  // seguido por la palabra principal totalmente en MAYÚSCULAS.
  const match = trimmed.match(/^(.*?)\s+([A-ZÁÉÍÓÚÜÑ\d–—\-]{2,}.*)$/);
  
  if (match && match[1].trim() !== "") {
    // Si la primera parte no es totalmente mayúscula, la tratamos como prefijo
    if (match[1] !== match[1].toUpperCase()) {
      return {
        leadingLower: match[1].trim(),
        mainText: match[2].trim()
      };
    }
  }

  return {
    leadingLower: "",
    mainText: trimmed
  };
}

function esNombrePropio(item, lang = "es") {
  if (item.esNombre === true) return true;

  if (Array.isArray(item.tags)) {
    const validTags = new Set(["nombre", "nombres", "name", "names", "nome", "nomi"]);
    if (item.tags.some(t => validTags.has(String(t).trim().toLowerCase()))) return true;
  }

  const langConfig = DICT_NOMBRES[lang] || DICT_NOMBRES.es;
  
  // normalizar elimina automáticamente las tildes (ej: "BENJAMÍN" -> "BENJAMIN")
  const textoLimpio = normalize(item.mainText);

  if (langConfig.patrones && langConfig.patrones.test(item.mainText)) return true;

  const palabras = textoLimpio.split(" ");
  return palabras.some(p => langConfig.nombres.has(p));
}

// Función que desglosa frases complejas en palabras/nombres independientes con su contexto
function extractMultipleWords(text) {
  const trimmed = text.trim();
  const results = [];

  // Expresión regular que detecta: [palabra MAYÚSCULA] + opcionalmente [prefijo/conector] + [palabra MAYÚSCULA]
  // Ejemplo: "JESÚS hijo de JOSÉ" -> Captura "JESÚS" y "hijo de JOSÉ"
  const regex = /([A-ZÁÉÍÓÚÜÑ\d–—\-]{2,})(?:\s+([a-zà-ü\s]+)\s+([A-ZÁÉÍÓÚÜÑ\d–—\-]{2,}))?/g;
  let match;

  // Si tiene la estructura "PALABRA1 conector PALABRA2" (ej. JESÚS hijo de JOSÉ)
  const fullMatch = trimmed.match(/^([A-ZÁÉÍÓÚÜÑ\d–—\-]{2,})\s+([a-zà-ü\s]+)\s+([A-ZÁÉÍÓÚÜÑ\d–—\-]{2,})$/);

  if (fullMatch) {
    const word1 = fullMatch[1].trim();      // "JESÚS"
    const connector = fullMatch[2].trim();  // "hijo de"
    const word2 = fullMatch[3].trim();      // "JOSÉ"

    // 1. Primera palabra limpia
    results.push({
      leadingLower: "",
      mainText: word1
    });

    // 2. Segunda palabra con el conector entre paréntesis
    results.push({
      leadingLower: connector,
      mainText: word2
    });

    return results;
  }

  // Si es del tipo "el CENTURIÓN" o "visitar al ENFERMO"
  const singleMatch = trimmed.match(/^(.*?)\s+([A-ZÁÉÍÓÚÜÑ\d–—\-]{2,}.*)$/);
  if (singleMatch && singleMatch[1].trim() !== "") {
    if (singleMatch[1] !== singleMatch[1].toUpperCase()) {
      results.push({
        leadingLower: singleMatch[1].trim(),
        mainText: singleMatch[2].trim()
      });
      return results;
    }
  }

  // Palabra o frase única en mayúsculas sin conectores
  results.push({
    leadingLower: "",
    mainText: trimmed
  });

  return results;
}

function getGroupLetter(str) {
  const norm = normalize(str);
  if (!norm) return "#";
  const first = norm.charAt(0).toUpperCase();
  return /^[A-ZÑ]$/.test(first) ? first : "#";
}


function renderGlossary() {
  const namesContainer = $("glossary-names-container");
  const wordsContainer = $("glossary-words-container");
  const categoriesContainer = $("glossary-categories-container");
  
  const namesNav = $("names-alphabet-nav");
  const wordsNav = $("words-alphabet-nav");
  const categoriesNav = $("categories-alphabet-nav");

  if (!namesContainer || !wordsContainer) return;

  namesContainer.innerHTML = "";
  wordsContainer.innerHTML = "";
  if (categoriesContainer) categoriesContainer.innerHTML = "";

  if (namesNav) namesNav.innerHTML = "";
  if (wordsNav) wordsNav.innerHTML = "";
  if (categoriesNav) categoriesNav.innerHTML = "";

  const diffPrefix = t("difficultyTagPrefix") || "Dificultad";
  const filteredWordData = WORD_DATA.filter(cat => {
    if (state.selectedTag === "todos") return true;
    const tags = Array.isArray(cat.tags) ? cat.tags.map(t => String(t).trim().toLowerCase()) : [];
    if (cat.dificultad !== undefined) {
      tags.push(`${diffPrefix.toLowerCase()} ${cat.dificultad}`);
    }
    return tags.includes(state.selectedTag);
  });

  const rawData = [];
  filteredWordData.forEach((main, mainIndex) => {
    if (!main || !Array.isArray(main.words)) return;
    main.words.forEach((sub, subIndex) => {
      if (!sub || !Array.isArray(sub.words)) return;
      sub.words.forEach((word, i) => {
        rawData.push({
          id: `${mainIndex}-${subIndex}-${i}`,
          mainCategory: main.category || "",
          difficulty: main.dificultad || 1,
          fortext: main.fortext || "",
          subcategory: sub.category || "",
          word: word || "",
          help: (sub.help && sub.help[i]) ? sub.help[i] : "",
          PN: sub.PN ?? true
        });
      });
    });
  });

  if (!rawData || rawData.length === 0) {
    if (namesContainer) namesContainer.innerHTML = "<p style='opacity:0.6; font-size: 0.9rem;'>Sin entradas.</p>";
    if (wordsContainer) wordsContainer.innerHTML = "<p style='opacity:0.6; font-size: 0.9rem;'>Sin entradas.</p>";
    if (categoriesContainer) categoriesContainer.innerHTML = "<p style='opacity:0.6; font-size: 0.9rem;'>Sin categorías disponibles.</p>";
    return;
  }

  // -------------------------------------------------------------
  // HELPER DE PARSEO: Requiere mínimo 2 MAYÚSCULAS para la palabra base
  // -------------------------------------------------------------
  function parseWordEntry(rawStr) {
    const cleanStr = rawStr.trim();
    if (!cleanStr) return null;

    // Detectar palabra de al menos 2 letras MAYÚSCULAS (evita tomar "Te", "We", "El" como base)
    const uppercaseMatch = cleanStr.match(/[A-ZÁÉÍÓÚÑ]{2,}(?:-[A-ZÁÉÍÓÚÑ]{2,})*/);
    if (!uppercaseMatch) return null;

    const mainBase = uppercaseMatch[0].trim();

    const baseIdx = cleanStr.indexOf(mainBase);
    const rawBefore = cleanStr.slice(0, baseIdx).replace(/[\(\)]/g, " ").trim();
    const rawAfter = cleanStr.slice(baseIdx + mainBase.length).replace(/[\(\)]/g, " ").trim();

    const beforeWords = rawBefore ? rawBefore.split(/\s+/).filter(Boolean) : [];
    const afterWords = rawAfter ? rawAfter.split(/\s+/).filter(Boolean) : [];

    if (beforeWords.length + afterWords.length > 2) {
      return { mainBase, prefix: "", suffix: "" };
    }

    return {
      mainBase,
      prefix: beforeWords.join(" "),
      suffix: afterWords.join(" ")
    };
  }

  // -------------------------------------------------------------
  // 1. PROCESAMIENTO Y AGRUPACIÓN
  // -------------------------------------------------------------
  const namesMap = new Map();
  const wordsMap = new Map();

  rawData.forEach(item => {
    if (!item.word) return;

    const subWords = item.word.split("&").map(w => w.trim()).filter(Boolean);

    subWords.forEach(subW => {
      const parsed = parseWordEntry(subW);
      if (!parsed) return;

      const mainCatObj = WORD_DATA.find(c => c.category === item.mainCategory) || {};
      const subCatObj = mainCatObj.words?.find(s => s.category === item.subcategory) || {};
      const combinedTags = [...(mainCatObj.tags || []), ...(subCatObj.tags || [])];
      const esNombreFlag = subCatObj.esNombre ?? mainCatObj.esNombre;

      const itemCandidate = {
        mainText: parsed.mainBase,
        esNombre: esNombreFlag,
        tags: combinedTags
      };

      const isPN = esNombrePropio(itemCandidate, currentLang);
      const map = isPN ? namesMap : wordsMap;
      
      const groupKey = normalize(parsed.mainBase);

      if (!map.has(groupKey)) {
        map.set(groupKey, {
          sortKey: groupKey,
          mainBase: parsed.mainBase,
          prefixes: new Set(),
          suffixes: new Set(),
          entries: []
        });
      }

      const group = map.get(groupKey);

      if (parsed.prefix) group.prefixes.add(parsed.prefix);
      if (parsed.suffix) group.suffixes.add(parsed.suffix);

      const isDup = group.entries.some(
        c => c.mainCategory === item.mainCategory && c.subcategory === item.subcategory && c.help === item.help
      );

      if (!isDup) {
        group.entries.push({
          mainCategory: item.mainCategory,
          subcategory: item.subcategory,
          help: item.help || ""
        });
      }
    });
  });

  // -------------------------------------------------------------
  // 2. RENDERIZADO DE SECCIONES (NOMBRES Y PALABRAS)
  // -------------------------------------------------------------
  const buildGlossarySection = (itemsMap, targetContainer, navContainer, prefix) => {
    const sortedList = Array.from(itemsMap.values()).sort((a, b) => 
      a.sortKey.localeCompare(b.sortKey, currentLang, { sensitivity: "base" })
    );

    if (sortedList.length === 0) {
      targetContainer.innerHTML = "<p style='opacity:0.6; font-size: 0.9rem;'>Sin entradas.</p>";
      return;
    }

    const availableLetters = new Set(
      sortedList.map(entry => getGroupLetter(entry.sortKey))
    );

    if (navContainer) {
      const alphabet = ["#", ..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")];
      alphabet.forEach(letter => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = letter;
        btn.style.padding = "2px 6px";
        btn.style.fontSize = "0.8rem";
        btn.style.border = "1px solid var(--line, #ccc)";
        btn.style.borderRadius = "3px";
        btn.style.background = "var(--bg-card, #f8f9fa)";
        btn.style.cursor = "pointer";

        if (availableLetters.has(letter)) {
          btn.style.fontWeight = "bold";
          btn.style.color = "var(--primary, #2b6cb0)";
          btn.addEventListener("click", () => {
            const targetId = `${prefix}-letter-${letter === "#" ? "symbol" : letter}`;
            const headerEl = $(targetId);
            if (headerEl) {
              headerEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });
        } else {
          btn.style.opacity = "0.3";
          btn.disabled = true;
        }
        navContainer.appendChild(btn);
      });
    }

    let currentLetter = "";
    let currentListEl = null;

    sortedList.forEach(entry => {
      const groupLetter = getGroupLetter(entry.sortKey);

      if (groupLetter !== currentLetter) {
        currentLetter = groupLetter;

        const headerContainer = document.createElement("div");
        headerContainer.id = `${prefix}-letter-${currentLetter === "#" ? "symbol" : currentLetter}`;
        headerContainer.style.display = "flex";
        headerContainer.style.alignItems = "center";
        headerContainer.style.gap = "12px";
        headerContainer.style.margin = "16px 0 6px 0";
        headerContainer.style.borderBottom = "2px solid var(--primary, #2b6cb0)";

        const letterHeader = document.createElement("span");
        letterHeader.style.fontSize = "1.8rem";
        letterHeader.style.fontWeight = "bold";
        letterHeader.style.color = "var(--primary, #2b6cb0)";
        letterHeader.textContent = currentLetter;
        headerContainer.appendChild(letterHeader);

        const topBtn = document.createElement("button");
        topBtn.type = "button";
        topBtn.innerHTML = "↑ Inicio";
        topBtn.title = "Volver arriba";
        topBtn.style.padding = "2px 8px";
        topBtn.style.fontSize = "0.75rem";
        topBtn.style.cursor = "pointer";
        topBtn.style.border = "1px solid var(--line, #ccc)";
        topBtn.style.borderRadius = "12px";
        topBtn.style.background = "var(--bg-card, #f8f9fa)";
        topBtn.style.color = "var(--primary, #2b6cb0)";

        topBtn.addEventListener("click", () => {
          if (navContainer) {
            navContainer.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });

        headerContainer.appendChild(topBtn);
        targetContainer.appendChild(headerContainer);

        currentListEl = document.createElement("ul");
        currentListEl.style.listStyle = "none";
        currentListEl.style.padding = "0";
        currentListEl.style.margin = "0 0 12px 0";
        targetContainer.appendChild(currentListEl);
      }

      const li = document.createElement("li");
      li.style.marginBottom = "14px";
      li.style.paddingBottom = "8px";
      li.style.borderBottom = "1px dotted rgba(128,128,128,0.25)";

      // Construcción del título con paréntesis en gris (opacidad atenuada)
      const prefixPart = Array.from(entry.prefixes).map(p => `(${p})`).join(" ");
      const suffixPart = Array.from(entry.suffixes).map(s => `(${s})`).join(" ");

      const titleEl = document.createElement("strong");
      titleEl.style.fontSize = "1.05rem";
      titleEl.style.color = "var(--primary, #2b6cb0)";
      titleEl.style.display = "block";

      let titleHTML = "";

      if (prefixPart) {
        titleHTML += `<span style="color: #718096; font-weight: normal; opacity: 0.85;">${formatWordWithEmojis(prefixPart)}</span> `;
      }

      titleHTML += formatWordWithEmojis(entry.mainBase);

      if (suffixPart) {
        titleHTML += ` <span style="color: #718096; font-weight: normal; opacity: 0.85;">${formatWordWithEmojis(suffixPart)}</span>`;
      }

      titleEl.innerHTML = titleHTML;
      li.appendChild(titleEl);

      const catsUl = document.createElement("ul");
      catsUl.style.margin = "4px 0 0 16px";
      catsUl.style.padding = "0";

      const helpLabelText = t("revealHelpLabel") || "Ayuda";

      entry.entries.forEach(cat => {
        const catLi = document.createElement("li");
        catLi.style.margin = "4px 0";
        catLi.style.fontSize = "0.85rem";
        catLi.style.opacity = "0.85";

        let catText = `${formatWordWithEmojis(cat.mainCategory)} › ${formatWordWithEmojis(cat.subcategory)}`;
        if (cat.help) {
          catText += ` — ${helpLabelText}: ${cat.help}`;
        }
        catLi.textContent = catText;
        catsUl.appendChild(catLi);
      });

      li.appendChild(catsUl);
      currentListEl.appendChild(li);
    });
  };

  buildGlossarySection(namesMap, namesContainer, namesNav, "names");
  buildGlossarySection(wordsMap, wordsContainer, wordsNav, "words");

  // -------------------------------------------------------------
  // 3. GLOSARIO DE CATEGORÍAS
  // -------------------------------------------------------------
  if (!categoriesContainer) return;

  const sortedCategories = [...filteredWordData].filter(c => c && c.category).sort((a, b) => 
    a.category.localeCompare(b.category, currentLang, { sensitivity: "base" })
  );

  if (sortedCategories.length === 0) {
    categoriesContainer.innerHTML = "<p style='opacity:0.6; font-size: 0.9rem;'>Sin categorías disponibles.</p>";
    return;
  }

  const availableCatLetters = new Set(
    sortedCategories.map(cat => getGroupLetter(cat.category))
  );

  if (categoriesNav) {
    const alphabet = ["#", ..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")];
    alphabet.forEach(letter => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = letter;
      btn.style.padding = "2px 6px";
      btn.style.fontSize = "0.8rem";
      btn.style.border = "1px solid var(--line, #ccc)";
      btn.style.borderRadius = "3px";
      btn.style.background = "var(--bg-card, #f8f9fa)";
      btn.style.cursor = "pointer";

      if (availableCatLetters.has(letter)) {
        btn.style.fontWeight = "bold";
        btn.style.color = "var(--primary, #2b6cb0)";
        btn.addEventListener("click", () => {
          const targetId = `cat-letter-${letter === "#" ? "symbol" : letter}`;
          const headerEl = $(targetId);
          if (headerEl) {
            headerEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      } else {
        btn.style.opacity = "0.3";
        btn.disabled = true;
      }
      categoriesNav.appendChild(btn);
    });
  }

  let currentCatLetter = "";
  let currentCatListEl = null;

  sortedCategories.forEach(mainCat => {
    const groupLetter = getGroupLetter(mainCat.category);

    if (groupLetter !== currentCatLetter) {
      currentCatLetter = groupLetter;

      const headerContainer = document.createElement("div");
      headerContainer.id = `cat-letter-${currentCatLetter === "#" ? "symbol" : currentCatLetter}`;
      headerContainer.style.display = "flex";
      headerContainer.style.alignItems = "center";
      headerContainer.style.gap = "12px";
      headerContainer.style.margin = "16px 0 6px 0";
      headerContainer.style.borderBottom = "2px solid var(--primary, #2b6cb0)";

      const letterHeader = document.createElement("span");
      letterHeader.style.fontSize = "1.8rem";
      letterHeader.style.fontWeight = "bold";
      letterHeader.style.color = "var(--primary, #2b6cb0)";
      letterHeader.textContent = currentCatLetter;
      headerContainer.appendChild(letterHeader);

      const topBtn = document.createElement("button");
      topBtn.type = "button";
      topBtn.innerHTML = "↑ Inicio";
      topBtn.title = "Volver arriba";
      topBtn.style.padding = "2px 8px";
      topBtn.style.fontSize = "0.75rem";
      topBtn.style.cursor = "pointer";
      topBtn.style.border = "1px solid var(--line, #ccc)";
      topBtn.style.borderRadius = "12px";
      topBtn.style.background = "var(--bg-card, #f8f9fa)";
      topBtn.style.color = "var(--primary, #2b6cb0)";

      topBtn.addEventListener("click", () => {
        if (categoriesNav) {
          categoriesNav.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      headerContainer.appendChild(topBtn);
      categoriesContainer.appendChild(headerContainer);

      currentCatListEl = document.createElement("ul");
      currentCatListEl.style.listStyle = "none";
      currentCatListEl.style.padding = "0";
      currentCatListEl.style.margin = "0 0 12px 0";
      categoriesContainer.appendChild(currentCatListEl);
    }

    const catLi = document.createElement("li");
    catLi.style.marginBottom = "14px";
    catLi.style.paddingBottom = "8px";
    catLi.style.borderBottom = "1px dotted rgba(128,128,128,0.25)";

    const catTitle = document.createElement("strong");
    catTitle.style.fontSize = "1.05rem";
    catTitle.style.color = "var(--primary, #2b6cb0)";
    
    let catTitleText = formatWordWithEmojis(mainCat.category);
    if (mainCat.fortext) {
      catTitleText += ` (${mainCat.fortext})`;
    }
    catTitle.textContent = catTitleText;
    catLi.appendChild(catTitle);

    const subCats = Array.isArray(mainCat.words) ? [...mainCat.words] : [];
    subCats.sort((a, b) => (a.category || "").localeCompare(b.category || "", currentLang, { sensitivity: "base" }));

    if (subCats.length > 0) {
      const subUl = document.createElement("ul");
      subUl.style.margin = "4px 0 0 16px";
      subUl.style.padding = "0";

      subCats.forEach(sub => {
        const subLi = document.createElement("li");
        subLi.style.margin = "6px 0";
        subLi.style.fontSize = "0.9rem";

        let subTitleText = formatWordWithEmojis(sub.category || "");
        if (sub.fortext) {
          subTitleText += ` (${sub.fortext})`;
        }

        const subTitle = document.createElement("span");
        subTitle.style.fontWeight = "600";
        subTitle.textContent = subTitleText;
        subLi.appendChild(subTitle);

        if (Array.isArray(sub.words) && sub.words.length > 0) {
          const wordsDiv = document.createElement("div");
          wordsDiv.style.fontSize = "0.85rem";
          wordsDiv.style.opacity = "0.85";
          wordsDiv.style.margin = "2px 0 0 8px";
          
          const formattedWords = sub.words.map(w => formatWordWithEmojis(w)).join(", ");
          wordsDiv.textContent = formattedWords;
          subLi.appendChild(wordsDiv);
        }

        subUl.appendChild(subLi);
      });

      catLi.appendChild(subUl);
    }

    currentCatListEl.appendChild(catLi);
  });
}

function init() {
  $("info-btn")?.addEventListener("click", openRules);
  $("close-rules")?.addEventListener("click", closeRules);

  $("config-btn")?.addEventListener("click", () => {
    $("config-panel")?.classList.toggle("hidden");
  });

  // Re-renderizar si el usuario abre o cierra el <details>
  const detailsEl = $("glossary-details");
  if (detailsEl) {
    detailsEl.addEventListener("toggle", () => {
      if (detailsEl.open) {
        renderGlossary();
      }
    });
  }

  const langScroll = $("lang-scroll");
  if (langScroll) {
    langScroll.value = currentLang;
    langScroll.addEventListener("change", async (e) => {
      currentLang = e.target.value;
      await loadLanguage(currentLang);
    });
  }

  const playersSelect = $("players");
  if (playersSelect) {
    playersSelect.addEventListener("change", () => {
      const p = Number(playersSelect.value) || 1;
      const catInput = $("config-cat-count");
      if (catInput) {
        catInput.value = p + 1;
      }
      ensurePlayerColorsAndNames();
      renderPlayerColorSelection();
      renderCategorySelection();
    });
  }

  $("config-cat-count")?.addEventListener("input", () => {
    renderCategorySelection();
  });
  $("config-cat-sort")?.addEventListener("change", (e) => {
    state.categorySortOrder = e.target.value;
    renderCategorySelection();
  });

  // Cargar lenguaje e invocar render de manera asíncrona
  loadLanguage(currentLang).then(() => {
    renderPlayerColorSelection();
    renderTagsCloud();
    renderCategorySelection();
    renderGuessInputs();
    renderGlossary(); // Forzamos ejecución tras cumplir la promesa de idioma
  });

  $("random-categories")?.addEventListener("click", randomCategories);
  $("start-game")?.addEventListener("click", startGame);
  $("submit-guess")?.addEventListener("click", submitGuess);
  $("reveal-hint-btn")?.addEventListener("click", revealHintManual);
  $("pause-time")?.addEventListener("click", togglePause);
  $("feedback-continue")?.addEventListener("click", continueFeedback);
  $("continue-reveal")?.addEventListener("click", continueAfterReveal);
  $("new-game")?.addEventListener("click", () => location.reload());
}

function updateUIElements() {
  const setText = (id, val) => { const el = $(id); if (el && val !== undefined) el.textContent = val; };

  setText("subtitle", TEXT.subtitle);
  setText("start-title", t("startTitle"));
  setText("player-colors-title", t("playerColorsTitle") || "Nombres y colores de los jugadores");
  setText("players-label", t("players"));
  setText("time-label", t("time"));
  setText("rounds-label", t("rounds"));
  setText("glos-name-title", t("glosNameTitle"));
  setText("glos-title", t("glosTitle"));
  setText("categories-title", t("categoriesTitle"));
  setText("random-categories", t("randomCategories"));
  setText("start-game", t("startGame"));
  setText("board-title-text", t("boardTitle"));
  setText("computer-badge", t("computer"));
  setText("reveal-title", t("specialRound"));
  setText("continue-reveal", t("continue"));
  setText("end-title", t("end"));
  setText("new-game", t("newGame"));
  setText("sort-categories-label", t("sortCategoriesLabel") || "Ordenar categorías");
  setText("sort-opt-az", t("sortAZ") || "A-Z (default)");
  setText("sort-opt-difficulty", t("sortDifficulty") || "Dificultad (creciente)");
  setText("sort-opt-random", t("sortRandom") || "Azar");

  updatePauseButton();

  setText("feedback-continue", t("continue"));
  setText("submit-guess", t("guess"));

  const rulesTitleText = t("rulesTitle") || TEXT.rulesTitle;
  const rulesBodyText = t("rulesBody") || TEXT.rulesBody;
  const closeRulesText = t("closeRules") || TEXT.closeRules;

  const rulesTitleEl = $("rules-title") || document.querySelector("#rules-modal h2");
  const rulesBodyEl = $("rules-body") || document.querySelector("#rules-modal .rules-content");
  const closeRulesEl = $("close-rules");

  if (rulesTitleText && rulesTitleEl) rulesTitleEl.textContent = rulesTitleText;
  if (rulesBodyText && rulesBodyEl) rulesBodyEl.innerHTML = rulesBodyText;
  if (closeRulesText && closeRulesEl) closeRulesEl.textContent = closeRulesText;

  if (rulesTitleText && $("info-btn")) $("info-btn").title = rulesTitleText;

  const rev1 = document.querySelector(".reveal-row:nth-child(1) .reveal-label");
  if (rev1) rev1.textContent = t("revealCategoryLabel");
  const rev2 = document.querySelector(".reveal-row:nth-child(2) .reveal-label");
  if (rev2) rev2.textContent = t("revealFortextLabel");
  const rev3 = document.querySelector(".reveal-row:nth-child(3) .reveal-label");
  if (rev3) rev3.textContent = t("revealWordLabel");
  const rev4 = document.querySelector(".reveal-row:nth-child(4) .reveal-label");
  if (rev4) rev4.textContent = t("revealHelpLabel");

  renderTagsCloud();
  renderCategorySelection();
  renderPlayerColorSelection();
}

function updateGameUIOnLangChange() {
  if (state.currentWord) {
    const flattened = flattenData();
    const updatedWord = flattened.find(w => w.id === state.currentWord.id);
    if (updatedWord) {
      state.currentWord = updatedWord;
    }
  }

  const selectedSet = new Set(state.selectedCategories);
  state.words = flattenData().filter(w => {
    const categoryIndex = WORD_DATA.findIndex(c => c.category === w.mainCategory);
    return selectedSet.has(categoryIndex);
  });

  renderBoard();
  renderClue();
  renderScoreboard();
}

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

  if (bb.length <= 3 || aa.length <= 3) {
    return aa === bb;
  }

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

const VOWEL_REGEX = /[AEIOUÁÉÍÓÚÜÀÈÌÒÙaeiouáéíóúüàèìòù]/g;
const VOWEL_TEST_REGEX = /[AEIOUÁÉÍÓÚÜÀÈÌÒÙaeiouáéíóúüàèìòù]/;

function stripVowels(s) {
  return String(s).replace(VOWEL_REGEX, "");
}

function maskVowelsWithDots(s) {
  return String(s).replace(VOWEL_REGEX, "·");
}

function revealVowels(s, count) {
  let shown = 0;
  return [...String(s)].map(ch => {
    if (VOWEL_TEST_REGEX.test(ch)) {
      if (shown < count) {
        shown++;
        return ch;
      }
      return "·";
    }
    return ch;
  }).join("");
}

function formatWordWithEmojis(text) {
  if (!text) return "";
  return String(text).replace(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g, m => {
    const isAllLowercase = m === m.toLowerCase();
    return (isAllLowercase && EMOJI_MAP && EMOJI_MAP[m]) ? EMOJI_MAP[m] : m;
  });
}

function flattenData() {
  const result = [];
  if (!Array.isArray(WORD_DATA)) return result;

  WORD_DATA.forEach((main, mainIndex) => {
    if (!main || !Array.isArray(main.words)) return;

    main.words.forEach((sub, subIndex) => {
      if (!sub || !Array.isArray(sub.words)) return;

      sub.words.forEach((word, i) => {
        result.push({
          id: `${mainIndex}-${subIndex}-${i}`,
          mainCategory: main.category || "",
          difficulty: main.dificultad || 1,
          fortext: main.fortext || "",
          subcategory: sub.category || "",
          word: word || "",
          help: (sub.help && sub.help[i]) ? sub.help[i] : "",
          PN: sub.PN ?? true
        });
      });
    });
  });

  return result;
}


function updatePlayersOptions() {
  const playersSelect = $("players");
  if (!playersSelect) return;
  const currentVal = playersSelect.value || 2;
  playersSelect.innerHTML = "";
  const maxPlayers = Math.max(1, WORD_DATA.length - 1);
  for (let i = 1; i <= maxPlayers; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    playersSelect.appendChild(opt);
  }
  playersSelect.value = Math.min(currentVal, maxPlayers);
}

function openRules() { $("rules-modal")?.classList.remove("hidden"); }
function closeRules() { $("rules-modal")?.classList.add("hidden"); }

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

function ensurePlayerColorsAndNames() {
  const n = Number($("players")?.value) || 1;
  while (state.playerColors.length < n) state.playerColors.push(null);
  while (state.playerNames.length < n) state.playerNames.push("");
  
  state.playerColors.length = n;
  state.playerNames.length = n;
  
  const used = new Set(state.playerColors.filter(Boolean));
  for (let i = 0; i < n; i++) {
    if (!state.playerColors[i]) {
      const available = PLAYER_COLORS.map(x => x.value).filter(c => !used.has(c));
      state.playerColors[i] = available.length ? available[0] : PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)].value;
      used.add(state.playerColors[i]);
    }
    if (!state.playerNames[i]) {
      state.playerNames[i] = `${t("player")} ${i + 1}`;
    }
  }
}

function getPlayerName(index) {
  return state.playerNames[index] || `${t("player")} ${index + 1}`;
}

function renderPlayerColorSelection() {
  ensurePlayerColorsAndNames();
  const box = $("player-colors");
  if (!box) return;
  const n = Number($("players")?.value) || 1;
  box.innerHTML = "";
  
  for (let i = 0; i < n; i++) {
    const card = document.createElement("div");
    card.className = "player-card-edit";

    const input = document.createElement("input");
    input.type = "text";
    input.value = state.playerNames[i];
    input.placeholder = `${t("player")} ${i + 1}`;
    input.addEventListener("input", (e) => {
      state.playerNames[i] = e.target.value.trim() || `${t("player")} ${i + 1}`;
    });

    const colorPickerContainer = document.createElement("div");
    colorPickerContainer.className = "player-color-picker";

    PLAYER_COLORS.forEach(color => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `color-option ${state.playerColors[i] === color.value ? "selected" : ""}`;
      btn.style.background = color.value;
      btn.addEventListener("click", () => {
        state.playerColors[i] = color.value;
        renderPlayerColorSelection();
      });
      colorPickerContainer.appendChild(btn);
    });

    card.appendChild(input);
    card.appendChild(colorPickerContainer);
    box.appendChild(card);
  }
}

function renderTagsCloud() {
  const container = $("tags-cloud");
  if (!container) return;
  container.innerHTML = "";

  const diffPrefix = t("difficultyTagPrefix") || "Dificultad";
  const tagCounts = {};

  WORD_DATA.forEach(cat => {
    if (Array.isArray(cat.tags)) {
      cat.tags.forEach(tag => {
        const normalizedTag = tag.trim().toLowerCase();
        if (normalizedTag) {
          tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1;
        }
      });
    }
    if (cat.dificultad !== undefined) {
      const diffTag = `${diffPrefix.toLowerCase()} ${cat.dificultad}`;
      tagCounts[diffTag] = (tagCounts[diffTag] || 0) + 1;
    }
  });

  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
  const allTags = ["todos", ...sortedTags];

  const maxCount = Math.max(1, ...Object.values(tagCounts));
  const minCount = Math.min(1, ...Object.values(tagCounts));

  const tagsAllLabel = t("tagsAll") || "Todos";

  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.type = "button";
    
    let fontSize = "0.9rem";
    if (tag !== "todos") {
      const count = tagCounts[tag] || 1;
      const weight = (count - minCount) / (maxCount - minCount || 1);
      const size = 0.85 + weight * 0.75;
      fontSize = `${size.toFixed(2)}rem`;
    } else {
      fontSize = "1.1rem";
    }

    btn.className = `tag-chip ${state.selectedTag === tag ? "selected" : ""}`;
    btn.style.fontSize = fontSize;
    btn.textContent = (tag === "todos" ? tagsAllLabel : tag).toUpperCase();

    btn.addEventListener("click", () => {
      state.selectedTag = tag;
      renderTagsCloud();
      renderCategorySelection();
      renderGlossary();
    });

    container.appendChild(btn);
  });
}

function getFilteredCategoryIndices() {
  const diffPrefix = t("difficultyTagPrefix") || "Dificultad";
  
  let filteredIndices = WORD_DATA.map((cat, index) => {
    if (state.selectedTag === "todos") return index;
    const tags = Array.isArray(cat.tags) ? cat.tags.map(t => t.trim().toLowerCase()) : [];
    if (cat.dificultad !== undefined) {
      tags.push(`${diffPrefix.toLowerCase()} ${cat.dificultad}`);
    }
    return tags.includes(state.selectedTag) ? index : -1;
  }).filter(index => index !== -1);

  if (state.categorySortOrder === "difficulty") {
    return filteredIndices.sort((a, b) => {
      const diffA = Number(WORD_DATA[a].dificultad) || 0;
      const diffB = Number(WORD_DATA[b].dificultad) || 0;
      if (diffA !== diffB) return diffA - diffB;
      return WORD_DATA[a].category.localeCompare(WORD_DATA[b].category);
    });
  } else if (state.categorySortOrder === "random") {
    return filteredIndices.sort(() => Math.random() - 0.5);
  } else {
    return filteredIndices.sort((a, b) => WORD_DATA[a].category.localeCompare(WORD_DATA[b].category));
  }
}

function renderCategorySelection() {
  const suggested = Number($("config-cat-count")?.value) || ((Number($("players")?.value) || 1) + 1);
  const catCountEl = $("category-count");
  if (catCountEl) catCountEl.textContent = `Selecciona las categorías que entrarán en juego. (${suggested} sugeridas)`;
  
  const container = $("categories");
  if (!container) return;
  container.innerHTML = "";

  const validIndices = getFilteredCategoryIndices();

  validIndices.forEach((index) => {
    const cat = WORD_DATA[index];
    if (!cat) return;

    const selectedOrderIndex = state.selectedCategories.indexOf(index);
    const isSelected = selectedOrderIndex !== -1;

    const card = document.createElement("button");
    card.type = "button";
    card.className = `category-card ${isSelected ? "selected" : ""}`;

    if (isSelected) {
      const assignedColor = categoryColor(selectedOrderIndex);
      card.style.setProperty("--selected-bg", assignedColor);
    }

    card.innerHTML = `<h4>${escapeHtml(formatWordWithEmojis(cat.category))}</h4>
      <span class="badge">Dificultad ${escapeHtml(cat.dificultad)}</span>
      <p>${escapeHtml(cat.fortext)}</p>`;
    card.addEventListener("click", () => toggleCategory(index));
    container.appendChild(card);
  });
}

function toggleCategory(index) {
  const i = state.selectedCategories.indexOf(index);
  if (i >= 0) state.selectedCategories.splice(i, 1);
  else state.selectedCategories.push(index);
  renderCategorySelection();
}

function randomCategories() {
  const n = Number($("config-cat-count")?.value) || ((Number($("players")?.value) || 1) + 1);
  const validIndices = getFilteredCategoryIndices();
  
  state.selectedCategories = [...validIndices]
    .sort(() => Math.random() - 0.5)
    .slice(0, n);
  renderCategorySelection();
}

function moveHeaderControlsToGame() {
  const startControls = document.querySelector("#screen-start .header-controls-right");
  const inGameTarget = $("in-game-header-controls");
  if (startControls && inGameTarget) {
    inGameTarget.appendChild(startControls);
  }
}

function startGame() {
  const players = Number($("players")?.value) || 1;

  if (state.selectedCategories.length === 0) {
    randomCategories();
  }

  state.players = players;
  state.turnTime = Math.max(10, Number($("turn-time")?.value) || 120);
  state.rTot = Math.max(1, Number($("round-total")?.value) || 3);

  const selectedSet = new Set(state.selectedCategories);
  state.words = flattenData().filter(w => {
    const categoryIndex = WORD_DATA.findIndex(c => c.category === w.mainCategory);
    return selectedSet.has(categoryIndex);
  });

  if (state.words.length === 0) {
    if ($("start-error")) $("start-error").textContent = t("noWords");
    return;
  }

  ensurePlayerColorsAndNames();
  state.scores = Array(state.players).fill(0);
  state.usedWordIds.clear();
  state.currentRound = 0;
  state.currentClueRound = 0;
  
  state.primaryPlayer = 0;
  state.currentPlayer = 0;
  
  state.roundWordsCompleted = 0;
  state.gameOver = false;
  state.paused = false;
  state.selectedGuessCategory = "";
  state.guessedWordParts = [];
  state.guessedCategory = false;
  state.failedSubcategories = new Set();
  state.revealType = "initial";
  state.lastAwardedPoints = 0;

  moveHeaderControlsToGame();
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
  state.currentPlayer = state.primaryPlayer;
  
  state.selectedGuessCategory = "";
  state.guessedWordParts = [];
  state.guessedCategory = false;
  state.failedSubcategories = new Set();
  state.lastAwardedPoints = 0;
  hideFeedbackModal();
  renderGuessInputs();
  updateRoundUI();
  startTimer();
  renderClue();
}

function getAnswerParts(word) {
  const raw = String(word ?? "");
  const parts = splitAnswer(raw);
  const explicitTargets = [];

  parts.forEach(part => {
    const uppercaseMatches = part.match(/[A-ZÁÉÍÓÚÜÑ]{2,}(?:-[A-ZÁÉÍÓÚÜÑ]{2,})*/g);
    if (uppercaseMatches) {
      explicitTargets.push(...uppercaseMatches);
    }
  });

  if (explicitTargets.length) return explicitTargets;

  return parts.map(part => {
    const matches = part.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:-[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*/g);
    return matches ? matches.join(" ").trim() : "";
  }).filter(Boolean);
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

function updateRoundUI() {
  if ($("round-label")) $("round-label").textContent = `${t("round")}: ${state.currentClueRound + 1}/${state.rTot}`;
  if ($("turn-label")) $("turn-label").textContent = `${t("turn")} ${getPlayerName(state.currentPlayer)}`;
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
    d.className = `score ${i === state.currentPlayer ? "active" : ""}`;
    d.style.setProperty("--player-color", color);
    d.style.setProperty("--score-fill", `${percent}%`);
    d.innerHTML = `<div class="score-name">${escapeHtml(getPlayerName(i))}</div><div class="score-pts">${formatPoints(score)} ${t("points")}</div>`;
    el.appendChild(d);
  });
}

function renderClue() {
  const w = state.currentWord;
  if (!w) return;

  let stage = state.currentClueRound;
  const raw = String(w.word);
  const parts = splitAnswer(raw);

  const displayedParts = parts.map(part => {
    const targetMatches = part.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:-[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*/g);
    if (!targetMatches) return part;

    let remaining = part;
    targetMatches.forEach(target => {
      const isAllLowercase = target === target.toLowerCase();
      const isAllUppercase = target === target.toUpperCase() && target.length > 1;

      if (isAllLowercase && EMOJI_MAP && EMOJI_MAP[target]) {
        remaining = remaining.replace(target, EMOJI_MAP[target]);
      } else if (isAllUppercase) {
        let shown = "";
        if (stage === 0) {
          shown = stripVowels(target);
        } else if (stage === 1) {
          shown = maskVowelsWithDots(target);
        } else {
          shown = revealVowels(target, stage - 1);
        }
        remaining = remaining.replace(target, shown);
      }
    });
    return remaining;
  });

  if ($("clue-stage")) {
    $("clue-stage").textContent = displayedParts.join(" & ");
  }

  const clues = [];
  if (stage >= 1 && w.help) {
    clues.push(`<span class="hint-attention">${escapeHtml(t("hintHelp", { help: w.help }))}</span>`);
  }
  if (stage >= 1) {
    clues.push(`<span class="hint-attention">${escapeHtml(t("hintVowel"))}</span>`);
  }
  if ($("attempt-status")) {
    $("attempt-status").innerHTML = clues.join(" ");
  }

  populateCategorySelect();

  const catEl = $("guess-categories");
  const inputsEl = $("guess-words")?.parentElement || document.querySelector(".guess-inputs-container");

  if (catEl && inputsEl && inputsEl.parentNode) {
    inputsEl.parentNode.insertBefore(catEl, inputsEl);
  }

  updateRoundUI();
  renderTimer();
}

function populateCategorySelect() {
  const container = $("guess-categories");
  if (!container || !state.currentWord) return;
  const current = state.selectedGuessCategory || "";
  container.innerHTML = "";

  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "stretch";
  container.style.width = "100%";
  container.style.marginBottom = "12px";
  container.style.gap = "8px";

  const mainCatIndex = WORD_DATA.findIndex(c => c.category === state.currentWord.mainCategory);
  const selectedOrderIndex = state.selectedCategories.indexOf(mainCatIndex);
  const mainCatColor = selectedOrderIndex !== -1 ? categoryColor(selectedOrderIndex) : "#e7e7e7";

  const catSection = document.createElement("div");
  catSection.style.display = "flex";
  catSection.style.flexDirection = "column";
  catSection.style.width = "100%";
  catSection.style.gap = "4px";

  const catRow = document.createElement("div");
  catRow.style.display = "flex";
  catRow.style.alignItems = "center";
  catRow.style.width = "100%";
  catRow.style.gap = "8px";

  const catLabel = document.createElement("span");
  catLabel.style.fontWeight = "normal";
  catLabel.style.whiteSpace = "nowrap";
  catLabel.textContent = `${TEXT.category || "Categoría"}:`;
  catRow.appendChild(catLabel);

  const headerDiv = document.createElement("div");
  headerDiv.className = "reveal-category-banner";
  headerDiv.style.backgroundColor = mainCatColor;
  headerDiv.style.padding = "8px 16px";
  headerDiv.style.borderRadius = "8px";
  headerDiv.style.fontWeight = "bold";
  headerDiv.style.textAlign = "center";
  headerDiv.style.flex = "1";
  headerDiv.style.boxSizing = "border-box";
  headerDiv.style.boxShadow = "0 2px 4px rgba(0,0,0,0.08)";
  headerDiv.textContent = formatWordWithEmojis(state.currentWord.mainCategory);
  catRow.appendChild(headerDiv);

  catSection.appendChild(catRow);

  if (state.currentWord.fortext) {
    const fortextRow = document.createElement("div");
    fortextRow.style.display = "flex";
    fortextRow.style.width = "100%";

    const spacer = document.createElement("div");
    spacer.style.width = `${catLabel.offsetWidth || 70}px`; 
    
    const fortextDiv = document.createElement("div");
    fortextDiv.className = "reveal-fortext-text";
    fortextDiv.style.flex = "1";
    fortextDiv.style.textAlign = "center";
    fortextDiv.style.fontSize = "0.9em";
    fortextDiv.style.opacity = "0.85";
    fortextDiv.textContent = state.currentWord.fortext;

    fortextRow.appendChild(spacer);
    fortextRow.appendChild(fortextDiv);
    catSection.appendChild(fortextRow);
  }

  container.appendChild(catSection);

  const subSection = document.createElement("div");
  subSection.style.display = "flex";
  subSection.style.flexDirection = "column";
  subSection.style.width = "100%";
  subSection.style.gap = "8px";

  const subRow = document.createElement("div");
  subRow.style.display = "flex";
  subRow.style.flexDirection = "row";
  subRow.style.flexWrap = "wrap";
  subRow.style.alignItems = "flex-start";
  subRow.style.width = "100%";
  subRow.style.gap = "8px";

  const subLabel = document.createElement("span");
  subLabel.style.fontWeight = "normal";
  subLabel.style.whiteSpace = "nowrap";
  subLabel.style.marginTop = "6px";
  subLabel.textContent = `${TEXT.subcategory || "Subcategoría"}:`;
  subRow.appendChild(subLabel);

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "subcategories-buttons-row";
  buttonsWrapper.style.display = "flex";
  buttonsWrapper.style.flexWrap = "wrap";
  buttonsWrapper.style.gap = "8px";
  buttonsWrapper.style.flex = "1";

  const mainCatObj = WORD_DATA.find(c => c.category === state.currentWord.mainCategory);
  const subObjects = mainCatObj ? mainCatObj.words : [{ category: state.currentWord.subcategory, fortext: state.currentWord.fortext }];

  subObjects.forEach((subObj) => {
    const subName = subObj.category;
    const normalizedSubName = normalize(subName);
    const isCorrectCategory = state.guessedCategory && normalize(state.currentWord.subcategory) === normalizedSubName;
    const isSelected = !state.guessedCategory && normalize(current) === normalizedSubName;
    const isFailed = state.failedSubcategories.has(normalizedSubName);

    const itemCol = document.createElement("div");
    itemCol.style.display = "flex";
    itemCol.style.flexDirection = "column";
    itemCol.style.flex = "1 1 120px";
    itemCol.style.gap = "4px";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `category-choice ${isSelected || isCorrectCategory ? "selected" : ""}`;
    btn.textContent = formatWordWithEmojis(subName);
    btn.style.width = "100%";

    if (state.guessedCategory || isFailed) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      if (state.guessedCategory || isFailed) return;
      state.selectedGuessCategory = normalize(current) === normalizedSubName ? "" : subName;
      populateCategorySelect();
    });

    itemCol.appendChild(btn);

    if (subObj.fortext) {
      const subFortextDiv = document.createElement("div");
      subFortextDiv.className = "reveal-subfortext-text";
      subFortextDiv.style.textAlign = "center";
      subFortextDiv.style.fontSize = "0.8em";
      subFortextDiv.style.opacity = "0.8";
      subFortextDiv.textContent = subObj.fortext;
      itemCol.appendChild(subFortextDiv);
    }

    buttonsWrapper.appendChild(itemCol);
  });

  subRow.appendChild(buttonsWrapper);
  subSection.appendChild(subRow);
  container.appendChild(subSection);
}

function revealHintManual() {
  if (!state.currentWord || state.gameOver) return;

  let advanced = false;

  if (state.currentClueRound === 0) {
    state.currentClueRound = 1;
    advanced = true;
  } else {
    state.currentClueRound++;
    advanced = true;
  }

  if (advanced) {
    state.scores[state.currentPlayer] -= 1;
    renderScoreboard();
    renderClue();
  }
}

function getGuesses() {
  const inputs = [...document.querySelectorAll(".guess-word-input")];
  return inputs.map(input => input.value.trim());
}

function submitGuess() {
  if (!state.currentWord || state.gameOver) return;

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

  const categoryAttempted = normalize(guessCategory) !== "";
  const categoryOK = !state.guessedCategory &&
    categoryAttempted &&
    normalize(guessCategory) === normalize(state.currentWord.subcategory);

  if (categoryAttempted && !categoryOK && !state.guessedCategory) {
    state.failedSubcategories.add(normalize(guessCategory));
    state.selectedGuessCategory = "";
  }

  newlyCorrectParts.forEach(i => { state.guessedWordParts[i] = true; });
  if (categoryOK) state.guessedCategory = true;

  const wordDone = state.guessedWordParts.length === answers.length && state.guessedWordParts.every(Boolean);
  const allDone = wordDone && (state.guessedCategory || !categoryAttempted);

  const FIXED_WORD_POINTS = 3;
  const FIXED_CATEGORY_POINTS = 1;

  let awarded = 0;
  if (newlyCorrectParts.length > 0) {
    awarded += newlyCorrectParts.length * FIXED_WORD_POINTS;
  }
  if (categoryOK) {
    awarded += FIXED_CATEGORY_POINTS;
  }

  awarded = Math.max(0, awarded);
  state.scores[state.currentPlayer] += awarded;
  state.lastAwardedPoints = (state.lastAwardedPoints || 0) + awarded;

  if (allDone) {
    stopTimer();
    state.usedWordIds.add(state.currentWord.id);
    state.roundWordsCompleted++;
    renderBoard();
    
    const winnerName = getPlayerName(state.currentPlayer);
    const finalPoints = state.lastAwardedPoints;
    state.primaryPlayer = (state.primaryPlayer + 1) % state.players;
    startComputerReveal("guessed", state.currentWord, winnerName, finalPoints);
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

  if (state.feedbackAction === "partial" || state.feedbackAction === "fail") {
    advanceFailedAttempt();
  }
}

function advanceFailedAttempt() {
  let nextY = (state.currentPlayer + 1) % state.players;

  if (nextY === state.primaryPlayer) {
    state.currentClueRound++;

    if (state.currentClueRound >= state.rTot) {
      stopTimer();
      state.primaryPlayer = (state.primaryPlayer + 1) % state.players;
      startComputerReveal("exhausted", state.currentWord);
      return;
    }
  }

  state.currentPlayer = nextY;
  state.lastAwardedPoints = 0;
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
  btn.textContent = state.paused ? "▶" : "⏸";
  btn.setAttribute("aria-label", state.paused ? "Reanudar" : "Pausar");
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

function startComputerReveal(type = "computer", word = null, winnerName = null, points = 0) {
  stopTimer();
  const available = state.words.filter(w => !state.usedWordIds.has(w.id));
  const revealWord = word || available[Math.floor(Math.random() * available.length)];
  if (!revealWord) { endGame(); return; }

  state.currentWord = revealWord;
  state.revealType = type;

  $("game-active-panel")?.classList.add("hidden");
  $("reveal-in-column")?.classList.remove("hidden");

  if ($("revealed-category")) $("revealed-category").textContent = `${formatWordWithEmojis(state.currentWord.mainCategory)} · ${state.currentWord.subcategory}`;
  if ($("reveal-fortext")) $("reveal-fortext").textContent = state.currentWord.fortext || "";
  if ($("revealed-word")) $("revealed-word").textContent = formatWordWithEmojis(state.currentWord.word);
  if ($("reveal-help")) $("reveal-help").textContent = state.currentWord.help || "";

  let titleText = t("specialRound");
  let badgeText = t("computer");
  const badgeEl = $("computer-badge");

  if (badgeEl) {
    badgeEl.style.backgroundColor = "";
    badgeEl.style.color = "";
  }

  if (type === "exhausted") {
    titleText = t("revealedUnansweredTitle");
  } else if (type === "guessed") {
    titleText = t("guessedWordTitle") || "¡Palabra Adivinada!";
    const formattedPts = formatPoints(points);
    
    if (badgeEl && state.playerColors && state.playerColors[state.currentPlayer]) {
      const playerColor = state.playerColors[state.currentPlayer];
      badgeEl.style.backgroundColor = playerColor;
      badgeEl.style.color = "#ffffff";
    }

    let rawTranslation = t("pointsForPlayer", { name: winnerName, points: formattedPts, n: winnerName, pts: formattedPts });

    if (!rawTranslation || rawTranslation === "pointsForPlayer" || rawTranslation.trim().toLowerCase() === "puntos para") {
      badgeText = `+${formattedPts} ${t("points") || "puntos"} para ${winnerName}`;
    } else {
      let replaced = rawTranslation
        .replace(/\{name\}|\{nombre\}|\{player\}|\{jugador\}|\{n\}/gi, winnerName)
        .replace(/\{points\}|\{puntos\}|\{pts\}/gi, formattedPts);

      if (!replaced.includes(winnerName)) {
        replaced = `+${formattedPts} ${replaced} ${winnerName}`;
      }
      badgeText = replaced;
    }
  }

  if ($("reveal-title")) $("reveal-title").textContent = titleText;
  if (badgeEl) badgeEl.textContent = badgeText;
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

  if (type !== "guessed" && type !== "exhausted") {
    state.roundWordsCompleted = 0;
    state.currentRound++;
    state.primaryPlayer = 0;
  }

  state.currentPlayer = state.primaryPlayer;
  state.currentClueRound = 0;
  state.paused = false;
  state.revealType = null;

  $("reveal-in-column")?.classList.add("hidden");
  $("game-active-panel")?.classList.remove("hidden");
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

    block.innerHTML = `
      <div class="board-category-header">
        <h3>${escapeHtml(formatWordWithEmojis(main.category))}</h3>
        <span class="fortext">${escapeHtml(main.fortext)}</span>
      </div>
      <div class="word-list"></div>`;

    const list = block.querySelector(".word-list");
    discovered.forEach(w => {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      chip.innerHTML = `<strong>${escapeHtml(formatWordWithEmojis(w.word))}</strong>
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
  $("screen-end")?.classList.remove("hidden");

  const sorted = state.scores.map((score, i) => ({ name: getPlayerName(i), score })).sort((a, b) => b.score - a.score);
  const best = sorted[0]?.score ?? 0;
  if ($("final-scores")) {
    $("final-scores").innerHTML = sorted.map(x =>
      `<div class="final-score"><strong>${escapeHtml(x.name)}</strong><span>${x.score} ${t("points")}</span></div>`
    ).join("") + `<p>${best > 0 ? `${t("won")}: ${escapeHtml(sorted[0].name)}` : t("tie")}</p>`;
  }
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

window.addEventListener("DOMContentLoaded", init);