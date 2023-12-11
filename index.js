const actionToRepresentation = {
  goToShelter: {
    icon: "🚨",
    hebrew: "חירום - להיכנס לממד",
    description:
      "נא להיכנס למרחבים מוגנים ולסגור דלתות בתים.\n" +
      "נא להמשיך להישמע להנחיות פיקוד העורף\n",
  },
  stayInShelter: {
    icon: "🚨",
    hebrew: "חירום - להישאר בממד",
    description:
      "יש להמשיך לשהות בממד עד להודעה חדשה.\n" +
      'אין לצאת מהממד ללא הודעה מפורשת של צח"י\n',
  },
  stayNearByShelter: {
    icon: "📢",
    hebrew: "ניתן לצאת מהממד",
    description:
      'ניתן לצאת מן הממ"דים.\n' + "נבקש לעת עתה להישאר בקרבת מרחב מוגן\n",
  },
  ShelterOut: {
    icon: "🆓",
    hebrew: "להיות בקרבת ממד",
    description: "להישאר בקרבת מרחב מוגן",
  },
  friendlyFire: {
    icon: "❗",
    hebrew: "קולות ירי של כוחותינו",
    description:
      'קולות הירי הנשמעים כעת הם כתוצאה מירי של צה"ל. הישוב בשגרה.\n',
  },
  freeText: {
    icon: "❗",
    hebrew: "טקסט חופשי",
    description: "הדבק טקסט חופשי כאן",
    messageHeader: "שים לב!",
  },
};

const languageToRepresentation = {
  English: {
    icon: "🇬🇧",
    key: "en",
    actionHeaderTranslation: {
      goToShelter: "enter the security room immediately",
      stayInShelter: "stay in the security room",
      stayNearByShelter: "stay close to the bunker",
      ShelterOut: "You can get out of the bunker",
      friendlyFire: "Sounds of the Israeli army",
      freeText: "free text",
    },
  },
  Filipino: {
    icon: "🇵🇭",
    key: "tl",
    actionHeaderTranslation: {
      goToShelter: "pumasok agad sa security room",
      stayInShelter: "manatili sa silid ng seguridad",
      stayNearByShelter: "manatili malapit sa bunker",
      ShelterOut: "Posibleng umalis sa security room",
      friendlyFire: "Tunog ng hukbo ng Israel",
      freeText: "Libreng Teksto",
    },
  },
  Hindi: {
    icon: "🇮🇳",
    key: "hi",
    actionHeaderTranslation: {
      goToShelter: "आपको तुरंत सुरक्षा कक्ष में प्रवेश करना होगा",
      stayInShelter: "सुरक्षा कक्ष में रहें",
      stayNearByShelter: "बंकर के करीब रहो",
      ShelterOut: "सुरक्षा कक्ष छोड़ना संभव है",
      friendlyFire: "इजरायली सेना की गोलीबारी",
      freeText: "फ्री टेक्स्ट",
    },
  },
  Uzbek: {
    icon: "🇺🇿",
    key: "uz",
    actionHeaderTranslation: {
      goToShelter: "darhol xavfsizlik xonasiga kiring",
      stayInShelter: "xavfsizlik xonasida qoling",
      stayNearByShelter: "bunkerga yaqin turing",
      ShelterOut: "Siz bunkerdan chiqib ketishingiz mumkin.",
      friendlyFire: "Isroil armiyasining tovushlari",
      freeText: "Bepul matn",
    },
  },
  russian: {
    icon: "🇷🇺",
    key: "ru",
    actionHeaderTranslation: {
      goToShelter: "немедленно проследовать в бомбоубежище",
      stayInShelter: "оставаться в бомбоубежище",
      stayNearByShelter: "оставайся рядом с бункером",
      ShelterOut: "Вы можете покинуть бомбоубежище",
      friendlyFire: "Звуки израильской армии",
      freeText: "Открытый текст",
    },
  },
  thai: {
    icon: "🇹🇭",
    key: "th",
    actionHeaderTranslation: {
      goToShelter: "คุณต้องเข้าไปในหลุมหลบภัยตอนนี้ทันที",
      stayInShelter: "อย่าออกจากบังเกอร์",
      stayNearByShelter: "อยู่ใกล้บังเกอร์",
      ShelterOut: "คุณสามารถออกจากบังเกอร์ได้",
      friendlyFire: "กองทัพอิสราเอลยิง",
      freeText: "ข้อความฟรี",
    },
  },
  Arabic: {
    icon: "🇸🇦",
    key: "ar",
    actionHeaderTranslation: {
      goToShelter: "ابق على مقربة من المخبأ",
      stayInShelter: "البقاء في غرفة الأمن",
      stayNearByShelter: "ابق على مقربة من المخبأ",
      ShelterOut: "يمكنك الخروج من المخبأ.",
      friendlyFire: "نيران الجيش الإسرائيلي",
      freeText: "نص حر",
    },
  },
};

const generateMessageButton = document.getElementById("generateMessageButton")
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
  await navigator.clipboard.writeText(
    await genMessage(neededAction, actionInfo, givenMessage)
  );

  document.getElementById("messageStatus").innerHTML =
  "ההודעה הועתקה";
  setTimeout(() => {
    document.getElementById("messageStatus").innerHTML =
      "בחר אופציה ולחץ על 'צור והעתק' ליצירת הודעה אחרת והעתקתה";
  }, 5000);

}

async function genMessage(neededAction, actionInfo, givenMessage) {
  let translatedMessage = "";
  let header = actionInfo.messageHeader
    ? actionInfo.messageHeader
    : actionInfo.hebrew;

  for (const language in languageToRepresentation) {
    const languageInfo = languageToRepresentation[language];
    const actionHeaderTranslation =
      languageInfo.actionHeaderTranslation[neededAction];
    translatedMessage += `${
      languageInfo.icon
    } ${actionHeaderTranslation} ${await genTranslateUrl(
      languageInfo.key,
      givenMessage
    )} \n\n`;
  }

  return `
--- ${actionInfo.icon} ---
${header}
${givenMessage}

-- Translations Below -- 
${translatedMessage}
`;
}

function genTranslateUrl(language, message) {
  const translateUrl = `https://translate.google.co.il/?sl=iw&tl=${language}&text=${encodeURIComponent(
    message
  )}`;

  return shortenUrl(translateUrl);
}

async function shortenUrl(longUrl) {
  const apiUrl = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(
    longUrl
  )}`;

  try {
    const response = await fetch(apiUrl);
    return response.text();
  } catch (error) {
    console.error("Error shortening URL:", error);
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
    const defaultText = await genMessage(
      "goToShelter",
      actionToRepresentation.goToShelter,
      actionToRepresentation.goToShelter.description
    );

    await copyTextToClipboard(defaultText);

    document.getElementById("messageStatus").innerHTML =
      "ההודעה הדיפולטיבית הועתקה, לחץ על 'צור והעתק' ליצירת הודעה אחרת והעתקתה";

  } catch (error) {
    console.error(error.message);
  }
}

// Event listeners
document
  .getElementById("generateMessageButton")
  .addEventListener("click", generateMessage);

// Initialization
// Usage example
copyDefaultTextToClipboard();
initializeSelectOptions();
updateTextAreaOnSelectChange();
