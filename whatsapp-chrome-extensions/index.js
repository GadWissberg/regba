const actionToRepresentation = {
  goToShelter: {
    icon: "🚨",
    hebrew: "חירום - להיכנס לממד",
    description: "נא להיכנס למרחבים מוגנים ולסגור דלתות בתים.\n" +
        "נא להמשיך להישמע להנחיות פיקוד העורף\n",
  },
  stayInShelter: {
    icon: "🚨",
    hebrew: "חירום - להישאר בממד",
    description: "יש להמשיך לשהות בממד עד להודעה חדשה.\n" +
        "אין לצאת מהממד ללא הודעה מפורשת של צח\"י\n",
  },
  stayNearByShelter: {
    icon: "📢",
    hebrew: "ניתן לצאת מהממד",
    description: "ניתן לצאת מן הממ\"דים.\n" +
        "נבקש לעת עתה להישאר בקרבת מרחב מוגן\n",
  },
  ShelterOut: {
    icon: "🆓",
    hebrew: "להיות בקרבת ממד",
    description: "להישאר בקרבת מרחב מוגן",
  },
  friendlyFire: {
    icon: "❗",
    hebrew: "קולות ירי של כוחותינו",
    description: "קולות הירי הנשמעים כעת הם כתוצאה מירי של צה\"ל. הישוב בשגרה.\n",
  },
  freeText: {
    icon: "❗",
    hebrew: "טקסט חופשי",
    description: "הדבק טקסט חופשי כאן",
    messageHeader: "שים לב!",
  },
};

const languageToRepresentation = {
    russian: {
        icon: "🇷🇺",
        key: "ru",
        actionHeaderTranslation: {
          goToShelter: "Чрезвычайная ситуация - войти в измерение",
          stayInShelter: "Чрезвычайная ситуация - оставайтесь в измерении",
          stayNearByShelter: "быть в непосредственной близости",
          ShelterOut: "Вы можете выйти из измерения",
          friendlyFire: "Выстрелы наших сил",
          freeText: "обращать внимание",
        }
    },
    thai: {
        icon: "🇹🇭",
        key: "th",
        actionHeaderTranslation: {
          goToShelter: "ฉุกเฉิน - เข้ามิติ",
          stayInShelter: "ฉุกเฉิน - อยู่ในมิติ",
          stayNearByShelter: "ที่จะอยู่ใกล้กัน",
          ShelterOut: "คุณสามารถออกจากมิติได้",
          friendlyFire: "เสียงปืนของกองกำลังของเรา",
          freeText: "ใส่ใจ",
        }
    }
}



function initializeSelectOptions() {
  const selectElement = document.getElementById("neededAction");

  Object.keys(actionToRepresentation).forEach((action, index) => {
    const option = document.createElement("option");
    const { icon, hebrew, description } = actionToRepresentation[action];

    option.value = action;
    option.innerHTML = `${hebrew} ${icon}`;
    selectElement.appendChild(option);

    // Initialize the textarea with the description message only for the first option
    if (index === 0) {
      document.getElementById("givenMessage").value = description;
    }
  });
}

function updateTextAreaOnSelectChange() {
  const selectElement = document.getElementById("neededAction");

  selectElement.addEventListener("change", function () {
    const neededAction = selectElement.value;
    const actionInfo = actionToRepresentation[neededAction];
    document.getElementById("givenMessage").value = actionInfo.description;
  });
}

async function generateMessage() {
    const neededAction = document.getElementById("neededAction").value;
    const givenMessage = document.getElementById("givenMessage").value;
    const actionInfo = actionToRepresentation[neededAction];

    // Copy the text inside the text field
    await navigator.clipboard.writeText(await genMessage(neededAction, actionInfo, givenMessage));
    document.getElementById("messageStatus").innerHTML = "ההודעה נוצרה";

    setTimeout(() => {
        document.getElementById("messageStatus").innerHTML = "לחץ על 'צור והעתק' ליצירת ההודעה המלאה והעתקתה";
    }, 3000);
}

async function genMessage(neededAction ,actionInfo, givenMessage) {

    let translatedMessage = "";
    let header = actionInfo.messageHeader ? actionInfo.messageHeader : actionInfo.hebrew;

    for (const language in languageToRepresentation) {
        const languageInfo = languageToRepresentation[language];
        const actionHeaderTranslation = languageInfo.actionHeaderTranslation[neededAction];
        translatedMessage += ` ${actionHeaderTranslation} ${await genTranslateUrl(languageInfo.key, givenMessage)} ${languageInfo.icon} \n`;
    }

  return `
--- ${actionInfo.icon} ---
${header}
${givenMessage}

-- more languages -- 
${translatedMessage}
`;
}

function genTranslateUrl(language, message) {
  const translateUrl = `https://translate.google.co.il/?sl=iw&tl=${language}&text=${encodeURIComponent(message)}`;

  return shortenUrl(translateUrl);
}

async function shortenUrl(longUrl) {
  const apiUrl = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

  try {
    const response = await fetch(apiUrl);
    return response.text();
  } catch (error) {
    console.error('Error shortening URL:', error);
    return longUrl;
  }
}

async function copyTextToClipboard(text) {

    // hack to copy to clipboard

    try {
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        document.body.appendChild(tempInput);

        // Focus on the temporary input element
        tempInput.focus();
        tempInput.select();

        // Use document.execCommand to copy to clipboard
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);
    } catch (error) {
        throw new Error("Error copying to clipboard: " + error.message);
    }
}

async function copyDefaultTextToClipboard() {
    try {
        const defaultText = await genMessage("goToShelter", actionToRepresentation.goToShelter, actionToRepresentation.goToShelter.description);

        await copyTextToClipboard(defaultText);

        document.getElementById("messageStatus").innerHTML = "ההודעה דיפולטיבית נוצרה";

        setTimeout(() => {
            document.getElementById("messageStatus").innerHTML = "לחץ על 'צור והעתק' ליצירת ההודעה המלאה והעתקתה";
        }, 1000);
    } catch (error) {
        console.error(error.message);
    }
}

// Event listeners
document.getElementById("generateMessageButton").addEventListener("click", generateMessage);

// Initialization
// Usage example
copyDefaultTextToClipboard();
initializeSelectOptions();
updateTextAreaOnSelectChange();
