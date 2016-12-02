<template>
    <div id="list">
        <div class="ricecake-header" >
            <span v-on:click="nextpage">
                 List Page
            </span>
        <div>
        <div class="ricecake-list">    
            <ol>
                <li v-for="element in listComponent">{{ element.text }}</li>
            </ol>
        </div>        
    <button class="button-test" v-on:click="onClick"> Test </button>
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
        methods: {
            onClick: function() {

                var text = ["test list", "vue.js is awesome", "with ricecake"];
                var select = parseInt(Math.random()*3);

                var insert = {
                    text : text[select]
                }

                this.listComponent.push(insert);

            },
            nextpage : function(){
                
                Ricecake.viewChange("home");
            }

        }
    }
</script>