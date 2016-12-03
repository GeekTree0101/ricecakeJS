/*
*   Bootstrap
*/
import home from "./page/home.vue";
import list from "./page/list.vue";
import Ricecake from "./../ricecake/ricecake.core.js";

var route = {
    "home" : home,
    "list" : list
}

Ricecake.init();                                          // Ricecake init
Ricecake.CakeBootstrap("home", route);          // Ricecake bootstrap


var event = document.all[0];

event.addEventListener("touchstart", function(e){
    console.log("touch",e);
})


event.addEventListener("touchmove", function(e){
    console.log("move",e);
})


