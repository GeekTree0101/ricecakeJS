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
