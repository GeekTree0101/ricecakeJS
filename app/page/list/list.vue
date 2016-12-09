<template>
    <div id="list">
        <div class="ricecake-header" >
            <ricecake-headerbar v-bind:riceProps = "navbar" ><ricecake-headerbar>
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
    import Ricecake from "./../../../ricecake/ricecake.core.js";

    export default {

        name: 'list',
        data() {
            return {
                title: "Vue x Vertx",
                state: true,
                listComponent : [],
                navbar : {
                    title : "Listpage",
                    icon : null,
                    callback : null
                }
            }
        },   
        mounted : ()=>{

            var dom = document.all[0];
            Ricecake.Core.TouchEvent("swipe", dom, function(){
                console.log("ACT to home");
                Ricecake.Core.viewChange("home",["leftout","rightin"]);
            });

        },
        beforeDestroy : () => {
            
            console.log("before destroy");
            Ricecake.Core.RemoveEvent();
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

        },
        components : {
            "ricecake-headerbar" : Ricecake.Components.Headerbar
        }
    }
</script>