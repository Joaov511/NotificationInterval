function sendNotification() {
    if(Notification.permission = "granted") {
    new Notification("Feche os chamados")
    } else if(Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if(Notification.permission = "granted") {
                new Notification("Feche os chamados");
            }
        })
    }   
}

//setInterval(sendNotification, 1000);

