import Vue from 'vue';
import home from "./page/home.vue";

//#start Vue application

new Vue({
    el: '#app',
    render: h => h(home)
});


//Notification Plugin Test
setTimeout(function() {
    Notification.popup("DEVLOPER", "I love you Hyeon-soo",
        () => {
            console.log("success");
        },
        (err) => {
            console.log("failed", err);
        }
    )
}, 10000);