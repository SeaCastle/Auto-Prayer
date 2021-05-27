"use strict";

console.log("Loading Auto-Prayer");

// Get the enemy attack string
const enemyAttackDescNode = document.getElementById("combat-enemy-attack-speed-desc");
const activePrayersNode = document.getElementById("combat-player-active-prayers");
const protectFromRangedPrayerNode = document.getElementById("combat-prayer-16");
const protectFromeRangedPrayerBtn = document.getElementById("prayer-select-16");
const attack = "shockwave";

// For some reason the console.log function inside the observable callback is going insane. Make sure it only checks once per second
let currentTime = Date.now();
let publishInterval = 1000; // ms
let nextPublishTime = currentTime + publishInterval;

// Callback for handling what to do with attack description
const checkEnemyAttack = function(mutationsList, observer) {
  
  currentTime = Date.now();
  if (currentTime > nextPublishTime) {
    if (mutationsList[0].target.innerText.toLowerCase().includes(attack)) {
      console.log(`Enemies attack is now  ${attack}`);

      // Check protectFromRangedPrayerNode does have class d-none before toggling on
      if (protectFromRangedPrayerNode.classList.contains("d-none")) {
        console.log("Toggling prayer on");
        protectFromeRangedPrayerBtn.onclick.apply(protectFromeRangedPrayerBtn);
        //togglePrayer(16);
      }
    } else {
      console.log("We are not interested in enemy attack");
      // Check protectFromRangedPrayer does not have class d-none before toggling off
      if (!protectFromRangedPrayerNode.classList.contains("d-none")) {
        console.log("Toggling prayer off");
        protectFromeRangedPrayerBtn.onclick.apply(protectFromeRangedPrayerBtn);
        //togglePrayer(16);
      }
    }

    nextPublishTime = currentTime + publishInterval;
  }

}

const enemyAttackObserver = new MutationObserver(checkEnemyAttack);

// Mutation observer options
// childList mutation fires on innerHTML change.
const mutObserverOptions = {childList: true};

// Wire up the observer
enemyAttackObserver.observe(enemyAttackDescNode, mutObserverOptions);


// Example strings
//Using <strong>Elusiveness</strong>:
//Using <strong>Shockwave</strong>:

