clicks = 0;
autoClickers = 0;
autoClickerCost = 10;
autoClickerCostFact = 1.15;
progress = 0;
money = 0;
sellFactor = 0.95;

$(document).ready(function(e) {
  loadGame();
  let secondInterval = setInterval(everySecondDo, 1000);

  $("#makeClick").on("click", function() {
    clicks++;
    updateClicks();
  });

  $("body").on("click", "button#makeAutoClicker", function() {
    if (money >= autoClickerCost) {
      autoClickers++;
      money -= autoClickerCost;
      updateAutoClickerCost();
    } else {
      console.info("Not enough money...");
    }
    updateClicks();
    updateMoney();
    updateAutoClicker();
  });

  $("#sellClicks").on("click", function(e) {
    if (clicks > 0) {
      money += Math.round(clicks * sellFactor, -2);
      clicks = 0;
      updateMoney();
      updateClicks();
    } else {
      console.info("No clicks !");
    }
  });

  $(document).on("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac")
      ? e.metaKey
      : e.ctrlKey)) {
      e.preventDefault();
      // Process event...
      saveGame();
      console.log("saved");
    }
  });
});

function updateClicks() {
  if (clicks >= 10 && progress == 0) {
    unlockAutoClicker();
    progress++;
  }
  $("#realClickCount").text(clicks);
}

function updateMoney() {
  $("#moneyCount").text(money);
  if (money <= autoClickerCost) {
    $("#makeAutoClicker").prop('disabled', true);
  } else {
    $("#makeAutoClicker").prop('disabled', false);
  }
}

function updateAutoClicker() {
  $("#realAutoClickerCount").text(autoClickers);
}

function unlockAutoClicker() {
  $("#main").append($("<fieldset id='autoClickers'><legend><b>Autoclickers: </b><span id='realAutoClickerCount'>0</span></legend><button id='makeAutoClicker'>+1 Autoclicker</button><p><b>Cost: </b><span id='autoClickerCost'>10</span></p></fieldset>"));
}

function updateAutoClickerCost() {
  autoClickerCost = Math.round(autoClickerCost * autoClickerCostFact);
  $("#autoClickerCost").text(autoClickerCost);
}

function everySecondDo() {
  if (autoClickers > 0) {
    for (let i = 0; i < autoClickers; i++) {
      clicks++;
      updateClicks();
    }
  }
}

function updateAll() {
  updateClicks();
  updateMoney();
  updateAutoClicker();
}

function saveGame() {
  document.cookie = "clicks=" + clicks;
  document.cookie = "money=" + money;
  document.cookie = "autoClickers=" + autoClickers;
  document.cookie = "autoClickerCost=" + autoClickerCost;
  document.cookie = "progress=" + progress;
}

function loadGame() {
  if(document.cookie != "") {
    clicks = getCookie("clicks");
    money = getCookie("money");
    autoClickers = getCookie("autoClickers");
    autoClickerCost = getCookie("autoClickerCost");
    progress = getCookie("progress");
    updateAll();
  }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
