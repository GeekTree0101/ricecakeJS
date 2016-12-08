<template>
    <div id="list">
        <div class="ricecake-header" >
            <ul class="nav-barstyle">
                <li class="nav-title"> ListPage </li>
            </ul>
        </div>

        <div class="ricecake-component"> 
            <div class="ricecake-list">
                <ol>
                    <li v-for="element in listComponent">{{ element.text }}</li>
                </ol>
            </div>
        </div>

        <div class="ricecake-nav">        
            <button class="button-test" v-on:click="onClick"> Test </button>
        </div>
    </div>
</template>


<script>
    import Ricecake from "./../../ricecake/ricecake.core.js";

    export default {

        name: 'list',
        data() {
            return {
                title: "Vue x Vertx",
                state: true,
                listComponent : []
            }
        },   
        mounted : ()=>{

            var dom = document.all[0];
            Ricecake.TouchEvent("swipe", dom, function(){
                console.log("ACT to home");
                Ricecake.viewChange("home",["leftout","rightin"]);
            });

        },
        beforeDestroy : () => {
            console.log("before destroy");
            Ricecake.RemoveEvent();
        },
        methods: {
            onClick: function() {

                var text = ["test list", "vue.js is awesome", "with ricecake"];
                var select = parseInt(Math.random()*3);

                var insert = {
                    text : text[select]
                }

                this.listComponent.push(insert);

            }

        }
    }
</script>