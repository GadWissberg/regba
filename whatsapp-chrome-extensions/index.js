const actionToRepresentation = {
  goToShelter: {
    icon: "🚨",
    hebrew: "חירום - להיכנס לממד",
    description: "נא להיכנס למרחבים מוגנים ולסגור דלתות בתים.\n" +
        "נא להמשיך להישמע להנחיות פיקוד העורף\n",
    russian: "Чрезвычайная ситуация - введите измерение",
    thai: "ฉุกเฉิน - เข้ามิติ",
  },
  stayInShelter: {
    icon: "🚨",
    hebrew: "חירום - להישאר בממד",
    description: "יש להמשיך לשהות בממד עד להודעה חדשה.\n" +
        "אין לצאת מהממד ללא הודעה מפורשת של צח\"י\n",
    russian: "Чрезвычайная ситуация - оставайтесь в измерении",
    thai: "ช่างซ่อมนาฬิกา-ดูออนไลน์",
  },
  stayNearByShelter: {
    icon: "📢",
    hebrew: "להיות בקרבת ממד",
    description: "ניתן לצאת מן הממ\"דים.\n" +
        "נבקש לעת עתה להישאר בקרבת מרחב מוגן\n",
    russian: "быть в непосредственной близости",
    thai: "ที่จะอยู่ใกล้กัน",
  },
  ShelterOut: {
    icon: "🆓",
    hebrew: "ניתן לצאת מהממד",
    description: "להישאר בקרבת מרחב מוגן",
    russian: "Вы можете выйти из измерения",
    thai: "คุณสามารถออกจากมิติได้",
  },
  friendlyFire: {
    icon: "🪖",
    hebrew: "קולות ירי של כוחותינו",
    description: "קולות הירי הנשמעים כעת הם כתוצאה מירי של צה\"ל. הישוב בשגרה.\n",
    russian: "Выстрелы наших сил",
    thai: "เสียงปืนของกองกำลังของเรา",
  },
  freeText: {
    icon: "❗",
    hebrew: "טקסט חופשי",
    description: "הדבק טקסט חופשי כאן",
    russian: "обращать внимание",
    thai: "ใส่ใจ",
  },
};

const defaultMessage = actionToRepresentation.goToShelter

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
    navigator.clipboard.writeText(await genMessage(actionInfo, givenMessage));
    document.getElementById("messageStatus").innerHTML = "ההודעה נוצרה";
}

async function genMessage(actionInfo, givenMessage) {
  return `
--- ${actionInfo.icon} ---
${actionInfo.hebrew}
${givenMessage}

-- more languages -- 
${actionInfo.thai} - ${await genTranslateUrl("th", givenMessage)}
${actionInfo.russian} - ${await genTranslateUrl("ru", givenMessage)}
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

async function copyDefaultTextToClipboard() {

  // It seems the clipboard API doesn't allow to copy text on initialization (action denied). So I had to use this hack.

  const ta = document.createElement('textarea');
  ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
  ta.value = await genMessage(defaultMessage, defaultMessage.description);
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  ta.remove();
}

// Event listeners
document.getElementById("generateMessageButton").addEventListener("click", generateMessage);

// Initialization
// Usage example
copyDefaultTextToClipboard();
initializeSelectOptions();
updateTextAreaOnSelectChange();
