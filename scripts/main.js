import { sendNotification, closePreviousNotification } from "./notifications.js";
import { startButtonStyle, cancelButtonStyle } from "./startButton.js";

const timeInput = document.getElementById("timeInput");
const startBtn = document.getElementById("startBtn");
const intervalSetWarning = document.getElementById("intervalSet");

const minute = 1000*60;
let isNotificationsActive = false;
let notificationText = "Feche os chamados";
const standardInputColor = "white";
const lockedInputColor = "rgba(204, 206, 209, 1)";
let activeInterval;

function activateNotifications(intervalTime) {
    sendNotification(notificationText);
    intervalSetWarning.textContent = `Interval set for each ${intervalTime} minutes`;
    cancelButtonStyle(startBtn);
    timeInput.readOnly = true;
    timeInput.style.backgroundColor = lockedInputColor;
}

function cancelNotifications() {
    closePreviousNotification();
    intervalSetWarning.textContent = "";
    startButtonStyle(startBtn);
    timeInput.readOnly = false;
    timeInput.style.backgroundColor = standardInputColor;
}


startBtn.addEventListener("click", () => {
    let intervalTime = Number(timeInput.value);
    if(!isNotificationsActive) {
        activateNotifications(intervalTime);
        activeInterval = setInterval(() => {
            sendNotification(notificationText);
        }, minute*intervalTime);
        isNotificationsActive = true;
    }
    else {
        cancelNotifications();
        clearInterval(activeInterval);
        isNotificationsActive = false;
    }
});

window.addEventListener("beforeunload", () => {
    closePreviousNotification();
});



