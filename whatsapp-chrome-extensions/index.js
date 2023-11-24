const actionToRepresentation = {
  goToShalterRoket: {
    icon: "1",
    hebrew: "טילים",
    russian: "ракеты",
    thai: "ขีปนาวุธ",
  },
  terroristInfiltration: {
    icon: "2",
    hebrew: "חדירת מחבלים",
    russian: "террористическое проникновение",
    thai: "การแทรกซึมของผู้ก่อการร้าย",
  },
  goToShalterAntiTank: {
    icon: "3",
    hebrew: "נגד טנקים",
    russian: "противотанковый",
    thai: "ต่อต้านรถถัง",
  },
  hostileAircraft: {
    icon: "4",
    hebrew: "כלי טיס עוין",
    russian: "rвражеский самолетr7",
    thai: "เครื่องบินที่ไม่เป็นมิตร",
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