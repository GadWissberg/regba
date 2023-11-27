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

document
  .getElementById("generateMessageButton")
  .addEventListener("click", async function () {
    const neededAction = document.getElementById("neededAction").value;
    const givenMessage = document.getElementById("givenMessage").value;
    const actionInfo = actionToRepresentation[neededAction];
    // Copy the text inside the text field
    navigator.clipboard.writeText(await genMessage(actionInfo, givenMessage));
    document.getElementById("messageStatus").innerHTML = "ההודעה נוצרה";
  });

// on change of select, update the text area
document.getElementById("neededAction").addEventListener("change", function () {
    const neededAction = document.getElementById("neededAction").value;
    const actionInfo = actionToRepresentation[neededAction];
    document.getElementById("givenMessage").value = actionInfo.description;
});

Object.keys(actionToRepresentation).forEach((action, index) => {
  const option = document.createElement("option");
  const icon = actionToRepresentation[action].icon;
  const hebrew = actionToRepresentation[action].hebrew;
  const description = actionToRepresentation[action].description;

  option.value = action;
  option.innerHTML = hebrew + " " + icon;
  document.getElementById("neededAction").appendChild(option);

  // Initialize the textarea with the description message only for the first option
  if (index === 0) {
    document.getElementById("givenMessage").value = description;
  }
});

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
  const translateUrl = `https://translate.google.co.il/?sl=iw&tl=${language}&text=${encodeURIComponent(
    message
  )}`;

  return shortenUrl(translateUrl)
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