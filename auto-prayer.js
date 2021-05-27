"use strict";

console.log("Loading Auto-Prayer");

// Get the associated nodes
const enemyAttackDescNode = document.getElementById("combat-enemy-attack-speed-desc");
const activePrayersNode = document.getElementById("combat-player-active-prayers");
const protectFromRangedPrayerNode = document.getElementById("combat-prayer-16");
const protectFromeRangedPrayerBtn = document.getElementById("prayer-select-16");
const attack = "shockwave";

// For some reason the console.log function inside the observable callback is going insane. Make sure it only checks once per second
let currentTime = Date.now();
let publishInterval = 1000; // ms; I don't think any enemies attack faster than 1s so this shouldn't cause toggle lag but idk
let nextPublishTime = currentTime + publishInterval;

// Callback for handling what to do with enemy attack
const checkEnemyAttack = function(mutationsList, observer) {
  
  currentTime = Date.now();
  if (currentTime > nextPublishTime) {
    if (mutationsList[0].target.innerText.toLowerCase().includes(attack)) {
      console.log(`Enemies attack is now  ${attack}`);

      // Check that prayer is not active before toggling on
      if (protectFromRangedPrayerNode.classList.contains("d-none")) {
        console.log("Toggling prayer on");
        protectFromeRangedPrayerBtn.onclick.apply(protectFromeRangedPrayerBtn);
      }
    } else {
      console.log("We are not interested in enemy attack");

      // Check that prayer is currently active before toggling off
      if (!protectFromRangedPrayerNode.classList.contains("d-none")) {
        console.log("Toggling prayer off");
        protectFromeRangedPrayerBtn.onclick.apply(protectFromeRangedPrayerBtn);
      }
    }

    nextPublishTime = currentTime + publishInterval;
  }
}

// Mutation observer options
// NOTE: childList mutation fires on innerHTML change which is what we want to observe
const mutObserverOptions = {childList: true};
const enemyAttackObserver = new MutationObserver(checkEnemyAttack);

// Wire up the observer
enemyAttackObserver.observe(enemyAttackDescNode, mutObserverOptions);


// Example strings
//Using <strong>Elusiveness</strong>:
//Using <strong>Shockwave</strong>: