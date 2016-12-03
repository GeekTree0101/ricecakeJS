<template>
    <div id="home">

        <div class="ricecake-header homepage" >
            <span v-on:click="nextpage"> Home Page </span>
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
            nextpage : function(){
                
                Ricecake.viewChange("list",["rightout","leftin"]);
            }

        }
    }
</script>