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
  .addEventListener("click", function () {
    const neededAction = document.getElementById("neededAction").value;
    const givenMessage = document.getElementById("givenMessage").value;
    const actionInfo = actionToRepresentation[neededAction];
    // Copy the text inside the text field
    navigator.clipboard.writeText(genMessage(actionInfo, givenMessage));
    document.getElementById("messageStatus").innerHTML = "ההודעה נוצרה";
  });

function genMessage(actionInfo, givenMessage) {
  return `
--- ${actionInfo.icon} ---
${actionInfo.hebrew}
${givenMessage}

-- more languages -- 
${actionInfo.thai} - ${genTranslateUrl("th", givenMessage)}
${actionInfo.russian} - ${genTranslateUrl("ru", givenMessage)}
`;
}

function genTranslateUrl(language, message) {
  return `https://translate.google.co.il/?sl=iw&tl=${language}&text=${encodeURIComponent(
    message
  )}`;
}
