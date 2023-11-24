const actionToRepresentation = {
  goToShalterRoket: {
    icon: "1",
    hebrew: "טילים",
    russian: "rr1",
    thai: "rr2",
  },
  terroristInfiltration: {
    icon: "2",
    hebrew: "חדירת מחבלים",
    russian: "rr3",
    thai: "rr4",
  },
  goToShalterAntiTank: {
    icon: "3",
    hebrew: "נט",
    russian: "rr5",
    thai: "rr6",
  },
  hostileAircraft: {
    icon: "4",
    hebrew: "כלי טיס עוין",
    russian: "rr7",
    thai: "rr8",
  },
};

document
  .getElementById("generateMessageButton")
  .addEventListener("click", function () {
    const neededAction = document.getElementById("neededAction").value;
    const givenMessage = document.getElementById("givenMessage").value;
    const actionInfo = actionToRepresentation[neededAction];
    // Copy the text inside the text field
    navigator.clipboard.writeText(
      `
      --- ${actionInfo.icon} ---
      ${actionInfo.hebrew}
      ${givenMessage}
      
      -- more languages -- 
      ${actionInfo.thai} - <thai-url>
      ${actionInfo.russian} - <russian-url>
      `);
      document.getElementById("messageStatus").innerHTML = "ההודעה נוצרה"
  });


  
