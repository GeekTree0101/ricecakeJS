<template>
    <div id="home">

        <div class="ricecake-header homepage" >
            <span> Home Page </span>
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
    export default {

        name: 'home',
        data() {
            return {
                title: "Vue x Vertx",
                state: true,
                flag : true
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
            }

        }
    }
</script>