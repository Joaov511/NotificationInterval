import { sendNotification, closePreviousNotification } from "./notifications.js";
import { startButtonStyle, cancelButtonStyle } from "./startButton.js";

const minuteInput = document.getElementById("minuteInput");
const startBtn = document.getElementById("startBtn");
const intervalSetWarning = document.getElementById("intervalSet");
const labelInput = document.getElementById("labelInput");

const minute = 1000*60;
let isNotificationsActive = false;
const standardInputColor = "white";
const lockedInputColor = "rgba(204, 206, 209, 1)";
let notificationText;
let activeInterval;

function activateNotifications(intervalTime) {
    notificationText = labelInput.value;
    sendNotification(notificationText);
    intervalSetWarning.textContent = `Interval set for each ${intervalTime} minute(s)`;
    cancelButtonStyle(startBtn);
    minuteInput.readOnly = true;
    minuteInput.style.backgroundColor = lockedInputColor;
}

function cancelNotifications() {
    closePreviousNotification();
    intervalSetWarning.textContent = "";
    startButtonStyle(startBtn);
    minuteInput.readOnly = false;
    minuteInput.style.backgroundColor = standardInputColor;
}


startBtn.addEventListener("click", () => {
    let intervalTime = Number(minuteInput.value);
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



