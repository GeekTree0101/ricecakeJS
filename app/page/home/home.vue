<template>
    <div id="home">
        
        <div class="ricecake-header homepage" >
            <ricecake-headerbar v-bind:riceProps = "navbar" ><ricecake-headerbar>
        </div>
        
        <div class="ricecake-component">
        
        </div>
        
        <div class="ricecake-nav">
            <button class="button-test" v-on:click="onClick"> Test </button>
        </div>

        <ricecake-sidemenu v-bind:riceProps = "sideMenu" ></ricecake-sidemenu>
    
    </div>    
</template>


<script>
    import Ricecake from "./../../../ricecake/ricecake.core.js";

    export default {

        name: 'home',
        data() {
            return {
                state: true,
                flag : true,
                navbar : {
                    title : "Homepage",
                    icon : "menu",
                    callback : "openSideMenu"
                },
                sideMenu : {
                    state : false,
                    handler : null
                }
            }
        },
        mounted  : ()=>{

            var dom = document.all[0];
            Ricecake.Core.TouchEvent("swipe", dom, function(){
                console.log("ACT to list");
                Ricecake.Core.viewChange("list",["rightout","leftin"]);
            });

        },
        beforeDestroy : () => {
            
            console.log("before destroy");
            Ricecake.Core.RemoveEvent();
        },
        methods: {
            onClick: function() {
                console.log("[+] Button Click");
                if(this.flag == true){
                    Ricecake.Core.action("ricecake-header","in");
                    this.flag = false;
                }
                else{
                    Ricecake.Core.action("ricecake-header","out");
                    this.flag = true;
                }
            },
            openSideMenu : function() {

                this.sideMenu.handler();
            }

        },
        components : {
            "ricecake-headerbar" : Ricecake.Components.Headerbar,
            "ricecake-sidemenu" : Ricecake.Components.Sidemenu
        }
    }
</script>