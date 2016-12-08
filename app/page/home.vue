<template>
    <div id="home">
        <sidemenu v-bind:toggleState = "sidemenu_toggle" ></sidemenu>
        <div class="ricecake-header homepage" >
            <ul class="nav-barstyle">
                <li class="nav-title"> HomePage </li>
                <li v-on:click="openSideMenu" class="nav-toogle"> menu </li>
            </ul>
        </div>
        
        <div class="ricecake-component">
        
        </div>
        
        <div class="ricecake-nav">
            <button class="button-test" v-on:click="onClick"> Test </button>
        </div>
    
    </div>    
</template>


<script>
    import Ricecake from "./../../ricecake/ricecake.core.js";
    import Sidemenu from "./components/sidemenu.vue";

    export default {

        name: 'home',
        data() {
            return {
                state: true,
                flag : true,
                sidemenu_toggle : {
                   state : false
                }
            }
        },
        mounted  : ()=>{

            var dom = document.all[0];
            Ricecake.TouchEvent("swipe", dom, function(){
                console.log("ACT to list");
                Ricecake.viewChange("list",["rightout","leftin"]);
            });

        },
        beforeDestroy : () => {
            
            console.log("before destroy");
            Ricecake.RemoveEvent();
        },
        methods: {
            onClick: function() {
                console.log("[+] Button Click");
                if(this.flag == true){
                    Ricecake.action("ricecake-header","in");
                    this.flag = false;
                }
                else{
                    Ricecake.action("ricecake-header","out");
                    this.flag = true;
                }
            },
            openSideMenu : function() {

                console.log("open side menu");
                if(!this.sidemenu_toggle.state){
                    
                    Ricecake.action("ricecake-sidemenu","sideOn");
                    this.sidemenu_toggle.state = true;
                }
                else{
                    Ricecake.action("ricecake-sidemenu","sideOff");
                    
                    setTimeout(()=>{
                        this.sidemenu_toggle.state = false;
                    },500);
                }
            }

        },
        components : {
            "sidemenu" : Sidemenu
        }
    }
</script>