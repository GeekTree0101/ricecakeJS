/**
 *  ricecake.core.ja
 *  copyright(c) 2016 GeekTree0101
 * 
 */
import Vue from 'vue';

var ricecakeCore = (() => {

    function ricecakeCore() { //constructor
        
        this.cached_dom = [];
        this.cached_target = [];
    }

    /**
     *  action animation
     *  no index , single dom for animation
     *  @parameter
     *  target[string] : target dom className
     *  animation_name[string] : keyframes name
     */
     ricecakeCore.prototype.action = (target, animation_name) => {

        var index = this.core.cached_target.indexOf(target);

        if (index == -1) {

            // animate dom
            var target_dom = document.getElementsByClassName(target)[0].style;
            target_dom.animationName = animation_name;

            //insert on cache
            this.core.cached_dom.push(target_dom);
            this.core.cached_target.push(target);
        } 
        else {

            // animate dom
            var target_dom = this.core.cached_dom[index];
            target_dom.animationName = animation_name;

            //remove from cache
            this.core.cached_dom.splice(index,1);
            this.core.cached_target.splice(index,1);
        }

    }

    return  ricecakeCore;
})();

var BootStrap = (() => {

    function BootStrap(){

        this.applicationView = null;
    }

    BootStrap.prototype.init = (presentPage, route, viewState) => {

        var viewElements  = this.bootstrap.view(viewState);
        
        var view = Vue.component('view', {
            el : '#view',
            template: `<div id="view" class="page">`+ 
                       this.bootstrap.view(route) + 
                       `</div>`
            ,
            data(){
                return {
                    appRoute : viewState,
                    appPresent : presentPage
                }
            },
            components : route
        }); 
        

        var VIEW = new Vue({
            el : '#app',
            render : h => h(view)
        });

        this.bootstrap.applicationView = VIEW;

    }

    BootStrap.prototype.view = (viewState) =>{

        var target = Object.keys(viewState);
        var viewElements = "";

        for(var index in target){

            var name = target[index];

            viewElements += "<" + 
                           name + 
                           ' v-if="appRoute.' + 
                           name + '"></' +
                           name + ">"; 

        }
        target = null;

        return viewElements;
    }

    BootStrap.prototype.viewChange = (target) => {

        console.log("VIEW", this.bootstrap.applicationView);

        var temp_dom = this.bootstrap.applicationView.$children[0];
        
        temp_dom.appRoute[temp_dom.appPresent] = false;
        temp_dom.appRoute[target] = true;
        temp_dom.appPresent = target;

        temp_dom = null;
    }


    return BootStrap;
})();


var Ricecake = (() => {

    function Ricecake(){
        // init
        console.log("\n\n Hello Ricecake!\n Copyright(C)2016 GeekTree0101 \n\n");
        this.core = null;   // private for ricecakeCore
        this.bootstrap = null;
    }

    Ricecake.prototype.init = () => {
        
        console.log("\n\n Ricecake Create! \n" +  Date() + "\n\n");
        this.core = new ricecakeCore();
        this.bootstrap = new BootStrap();
    }

    Ricecake.prototype.CakeBootstrap = (presentPage, route, viewState) => {

        try{
            this.bootstrap.init(presentPage, route, viewState);
        }   
        catch(e){
            console.log("[- ERROR] : ", e);
        }
    }

    Ricecake.prototype.action = (target, animation_name) => {

        try{
            this.core.action(target, animation_name);
        }
        catch(e){
            console.log("[- ERROR ] : ",e);
        }
    }

    Ricecake.prototype.viewChange = (target) => {

        try{
            this.core.action("page", "pageOut");
            
            setTimeout(()=>{
                this.bootstrap.viewChange(target);
                this.core.action("page", "pageIn");
            },200);
        }
        catch(e){
            console.log("[- ERROR ] : ", e);
        }
    }

    Ricecake.prototype.free = () => {
        // Garbage collection will come
        this.core = null;
    }

    return new Ricecake();
})();

export default Ricecake;


