module.exports = {

    popup: function(title, text, success, error) {

        var param = [title, text];
        cordova.exec(success, error, "Notification", "basic_notification", param);
    },

}