import { sendNotification, closePreviousNotification } from "./notifications.js";
const timeInput = document.getElementById("timeInput");
const startBtn = document.getElementById("startBtn");
const intervalSetWarning = document.getElementById("intervalSet");
const minute = 1000*60;
let isNotificationsActive = false;
let notificationText = "Feche os chamados";
const standardInputcolor = "white";
const lockedInputcolor = "rgba(204, 206, 209, 1)";
let activeInterval;

function activateNotifications(intervalTime) {
    sendNotification(notificationText);
    startBtn.className = "btn btn-danger";
    startBtn.textContent = "Cancel";
    timeInput.readOnly = true;
    timeInput.style.backgroundColor = lockedInputcolor;
    intervalSetWarning.textContent = `Interval set for each ${intervalTime} minutes`;
}

function cancelNotifications() {
    closePreviousNotification();
    startBtn.className = "btn btn-success btn-lg";
    startBtn.textContent = "Start";
    timeInput.readOnly = false;
    timeInput.style.backgroundColor = standardInputcolor;
    intervalSetWarning.textContent = "";
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



