clicks = 0;
autoClickers = 0;
autoClickerCost = 10;
autoClickerCostFact = 1.15;
megaClickers = 0;
megaClickerCost = 1000;
megaClickerCostFact = 1.5;
progress = 0;
money = 0;
sellFactor = 0.95;

$(document).ready(function(e) {
  loadGame();
  $("#main").show();
  let secondInterval = setInterval(everySecondDo, 1000);

  $("#makeClick").on("click", function() {
    clicks++;
    play("click");
    updateClicks();
  });

  $("body").on("click", "button#makeAutoClicker", function() {
    if (money >= autoClickerCost) {
      autoClickers++;
      play("pling");
      money -= autoClickerCost;
      updateAutoClickerCost();
    } else {
      console.info("Not enough money...");
    }
    updateClicks();
    updateMoney();
    updateAutoClicker();
  });

  $("body").on("click", "button#makeMegaClicker", function() {
    if (money >= megaClickerCost) {
      megaClickers++;
      play("pling");
      money -= megaClickerCost;
      updateMegaClickerCost();
    } else {
      console.info("Not enough money ...");
    }
    updateClicks();
    updateMoney();
    updateMegaClicker();
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

function play(string) {
  let audio = new Audio("assets/sounds/"+string+".mp3");
  audio.play();
}

function updateClicks() {
  if (clicks >= 10 && progress == 0) {
    unlockAutoClicker();
    progress++;
  }
  if(autoClickers >= 30 && progress == 1) {
    unlockMegaClicker();
    progress++;
  }
  $("#realClickCount").text(clicks);
}

function updateMoney() {
  $("#moneyCount").text(money);
  if (money < autoClickerCost) {
    $("#makeAutoClicker").prop('disabled', true);
  } else {
    $("#makeAutoClicker").prop('disabled', false);
  }
  if (money < megaClickerCost) {
    $("#makeMegaClicker").prop('disabled', true);
  } else {
    $("#makeMegaClicker").prop('disabled', false);
  }
}

function updateAutoClicker() {
  $("#realAutoClickerCount").text(autoClickers);
}

function unlockAutoClicker() {
  $("#main").append($("<fieldset id='autoClickers'><legend><b>Autoclickers: </b><span id='realAutoClickerCount'>0</span></legend><button id='makeAutoClicker'>+1 Autoclicker</button><p><b>Cost: </b><span id='autoClickerCost'>"+autoClickerCost+"</span></p></fieldset>"));
}

function updateAutoClickerCost() {
  autoClickerCost = Math.round(autoClickerCost * autoClickerCostFact);
  $("#autoClickerCost").text(autoClickerCost);
}

function updateMegaClicker() {
    $("#realMegaClickerCount").text(megaClickers);
}

function unlockMegaClicker() {
  $("#main").append($("<fieldset id='megaClickers'><legend><b>Megaclickers: </b><span id='realMegaClickerCount'>0</span></legend><button id='makeMegaClicker'>+1 Megaclicker</button><p><b>Cost: </b><span id='megaClickerCost'>"+megaClickerCost+"</span></p></fieldset>"));
}

function updateMegaClickerCost() {
  megaClickerCost = Math.round(megaClickerCost * megaClickerCostFact);
  $("#megaClickerCost").text(megaClickerCost);
}

function everySecondDo() {
  if (autoClickers > 0) {
    for (let i = 0; i < autoClickers; i++) {
      clicks++;
      updateClicks();
    }
  }
  if(megaClickers > 0) {
    for (let i = 0; i < megaClickers; i++) {
      clicks+=15;
      updateClicks();
    }
  }
}

function updateAll() {
  updateClicks();
  updateMoney();
  if (progress >= 1) {
    unlockAutoClicker();
  }
  if(progress >= 2) {
    unlockMegaClicker();
  }
  updateAutoClicker();
  updateMegaClicker();
}

function saveGame() {
  document.cookie = "clicks=" + clicks;
  document.cookie = "money=" + money;
  document.cookie = "autoClickers=" + autoClickers;
  document.cookie = "autoClickerCost=" + autoClickerCost;
  document.cookie = "megaClickers="+ megaClickers;
  document.cookie = "megaClickerCost=" + megaClickerCost;
  document.cookie = "progress=" + progress;
}

function loadGame() {
  if (document.cookie != "") {
    clicks = Number(getCookie("clicks"));
    money = Number(getCookie("money"));
    autoClickers = Number(getCookie("autoClickers"));
    autoClickerCost = Number(getCookie("autoClickerCost"));
    megaClickers = Number(getCookie("megaClickers"));
    megaClickerCost = Number(getCookie("megaClickerCost"));
    progress = Number(getCookie("progress"));
    updateAll();
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
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
