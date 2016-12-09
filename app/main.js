/*
*   Bootstrap
*/
import home from "./page/home/home.vue";
import list from "./page/list/list.vue";
import Ricecake from "./../ricecake/ricecake.core.js";

var route = {
    "home" : home,
    "list" : list
}

Ricecake.Core.init();                                          // Ricecake init
Ricecake.Core.CakeBootstrap("home", route);          // Ricecake bootstrap
