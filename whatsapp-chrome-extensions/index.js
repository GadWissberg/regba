const t = {
    blaTry: 1
}


  document.getElementById('generateMessageButton').addEventListener('click',function() {
    const neededAction = document.getElementById("neededAction")
    const givenMessage = document.getElementById("givenMessage");
    // Copy the text inside the text field
    navigator.clipboard.writeText(givenMessage.value);
    console.log(neededAction, givenMessage, t)  });