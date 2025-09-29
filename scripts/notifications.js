let notification;

export function sendNotification(notificationText) {
    closePreviousNotification(notification);
    if(Notification.permission == "granted") {
        notification = new Notification(notificationText);
    } else if(Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if(permission == "granted") {
                notification = new Notification(notificationText);
            }
        });
    }
}

export function closePreviousNotification(){
    if(notification) {
        notification.close();
    }
}