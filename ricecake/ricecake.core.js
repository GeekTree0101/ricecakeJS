/**
 *  ricecake.core.ja
 *  copyright(c) 2016 GeekTree0101
 * 
 */
import Vue from 'vue';
import Hammer from './hammer.js';

var ricecakeCore = (() => {

    function ricecakeCore() { //constructor
        
        this.cached_dom = [];
        this.cached_target = [];
        this.motionHandler = null;

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

    /**
     *   RicecakeJS BootStrap
     *   @parameter
     *   presentPage[string] : set present page
     *   route[Object] : vue components route
     *   viewState[Object] : View components control
     */
    BootStrap.prototype.init = (presentPage, route, viewState) => {

        try{
            
            var viewElements  = this.bootstrap.view(viewState);          // create components
        
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
        

            var VIEW = new Vue({                                        // start
                el : '#app',
                render : h => h(view)
            });

            this.bootstrap.applicationView = VIEW;                      // cache 
        }
        finally{

            viewElements = null;
            VIEW = null;
        }
    }

    /**
     *  Ricecake View
     *  @parameter
     *  viewState[Object] : view tagname object
     */
    BootStrap.prototype.view = (viewState) =>{                      // make components

        try{
            
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
        }
        finally{

            target = null;
            index = null;
        }

        return viewElements;
    }

    /**
     *  RicecakeJS View Change
     *  @parameter
     *  target[string] : target view
     */
    BootStrap.prototype.viewChange = (target) => {                // View change

        try{

            var temp_dom = this.bootstrap.applicationView.$children[0];
        
            temp_dom.appRoute[temp_dom.appPresent] = false;
            temp_dom.appRoute[target] = true;
            temp_dom.appPresent = target;
        }
        finally{
            temp_dom = null;
        }
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

    /**
     *  RicecakeJS init
     *  : instances ricecakeCore and bootstrap
     * 
     */
    Ricecake.prototype.init = () => {
        
        console.log("\n\n Ricecake Create! \n" +  Date() + "\n\n");
        this.core = new ricecakeCore();
        this.bootstrap = new BootStrap();
        this.touchEvent = {
            motion : null,
            dom : null,
            callback : null,
            event : null
        }
    }

    // @Overriding
    Ricecake.prototype.CakeBootstrap = (presentPage, route) => {


        try{
            
            var viewState = {};

            var list = Object.keys(route);

            for(var index in list){

                if(list[index] == presentPage){
                    viewState[ list[index] ] = true;
                }
                else{
                    viewState[ list[index] ] = false;
                }
            }


            this.bootstrap.init(presentPage, route, viewState);
        }   
        catch(e){
            console.log("[BOOTSTRAP ERROR] : ", e);
        }
        finally{
            viewState = null;
            list = null;
            index = null;
        }
    }

    // @Overriding
    Ricecake.prototype.action = (target, animation_name) => {

        try{
            this.core.action(target, animation_name);
        }
        catch(e){
            console.log("[ACTION ERROR ] : ",e);
        }
    }


    // @Overriding
    Ricecake.prototype.viewChange = (target,keyframes) => {

        try{
            this.core.action("page", keyframes[0]);
            
            setTimeout(()=>{

                this.bootstrap.viewChange(target);
                this.core.action("page", keyframes[1]);
            },200);
        }
        catch(e){
            console.log("[VIEW CHANGE ERROR ] : ", e);
        }
    }

    // Clear
    Ricecake.prototype.free = () => {
        // Garbage collection will come
        this.core = null;
    }

    Ricecake.prototype.TouchEvent = (motion, target, callback) => {

        this.touchEvent.dom = target;

        this.touchEvent.event = new Hammer(target);

        this.touchEvent.motion = motion;
        this.touchEvent.callback = callback;
        this.touchEvent.event.on(motion, this.touchEvent.callback);
    }

    Ricecake.prototype.RemoveEvent = () => {

        try{
            this.touchEvent.event.off(
                this.touchEvent.motion ,
                this.touchEvent.callback
            );
        }
        finally{
            
            this.touchEvent = {
                motion : null,
                dom : null,
                callback : null,
                event : null
            }        
        }
    }

    return new Ricecake();
})();

export default Ricecake;


