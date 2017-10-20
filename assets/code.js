clicks = 0;
autoClickers = 0;
autoClickerCost = 10;
autoClickerCostFact = 1.25;
progress = 0;

$(document).ready(function(e) {
  let secondInterval = setInterval(everySecondDo, 1000);

  $("#makeClick").on("click", function() {
    clicks++;
    updateClicks();
  });

  $("body").on("click", "button#makeAutoClicker", function() {
    console.log("clicked");
    if(clicks >= autoClickerCost) {
      autoClickers++;
      clicks -= autoClickerCost;
      updateAutoClickerCost();
    } else {
      console.info("Not enough clicks...");
    }
    updateClicks();
    updateAutoClicker();
  });





});

function updateClicks() {
  if(clicks >= 10 && progress == 0) {
    unlockAutoClicker();
    progress++;
  }
  $("#realClickCount").text(clicks);
}

function updateAutoClicker() {
  $("#realAutoClickerCount").text(autoClickers);
}

function unlockAutoClicker() {
  $("#main").append($("<div id='autoClickers'><p><b>Autoclickers: </b><span id='realAutoClickerCount'>0</span></p><button id='makeAutoClicker'>+1 Autoclicker</button><p><b>Cost: </b><span id='autoClickerCost'>10</span></p></div>"));
}

function updateAutoClickerCost() {
  autoClickerCost = Math.round(autoClickerCost * autoClickerCostFact);
  $("#autoClickerCost").text(autoClickerCost);
}

function everySecondDo() {
  if(autoClickers > 0) {
    for(let i = 0; i < autoClickers; i++) {
      clicks++;
      updateClicks();
    }
  }
}
