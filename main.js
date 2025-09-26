const timeInput = document.getElementById("timeInput");
const startBtn = document.getElementById("startBtn");
const intervalSet = document.getElementById("intervalSet");
const minute = 1000*60;
let notification;
let isNotificationsActive = false;
let timeInterval;

function sendNotification() {
    closePreviousNotification(notification);
    if(Notification.permission == "granted") {
        notification = new Notification("Feche os chamados");
    } else if(Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if(permission == "granted") {
                notification = new Notification("Feche os chamados");
            }
        });
    }
}

function closePreviousNotification(notification){
    if(notification) {
        notification.close();
    }
}

function activateNotifications() {
    startBtn.className = "btn btn-danger";
    startBtn.textContent = "Cancel";
    interval = Number(timeInput.value);
    timeInput.readOnly = true;
    timeInput.style.backgroundColor = "rgba(204, 206, 209, 1)";
    intervalSet.textContent = `Interval set for each ${interval} minutes`;
}

function cancelNotifications() {
    closePreviousNotification(notification);
    startBtn.className = "btn btn-success btn-lg";
    startBtn.textContent = "Start";
    timeInput.readOnly = false;
    timeInput.style.backgroundColor = "white";
    intervalSet.textContent = "";
}

startBtn.addEventListener("click", () => {
    if(!isNotificationsActive) {
        activateNotifications();
        timeInterval = setInterval(sendNotification, 5000);
        sendNotification();
        isNotificationsActive = true;
    }
    else {
        cancelNotifications();
        isNotificationsActive = false;
        clearInterval(timeInterval);
    }
});

window.addEventListener("beforeunload", () => {
    closePreviousNotification(notification);
});



