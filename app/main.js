/*
*   Bootstrap
*/
import home from "./page/home.vue";
import list from "./page/list.vue";
import Ricecake from "./../ricecake/ricecake.core.js";

/**
 *  Router
 */
var route = {
    "home" : home,
    "list" : list
}

/**
 *  Router state
 */
var state = {
    "home" : true,
    "list" : false
}

/**
 *  Present app view
 */
var startView = "home";


Ricecake.init();                                          // Ricecake init
Ricecake.CakeBootstrap(startView, route, state);          // Ricecake bootstrap



/*
new Vue({
    el: '#app',
    render : h => h(view)
});
*/


/*
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
*/