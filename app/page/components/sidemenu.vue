<template>
    <div v-show="toggleState.state" class="ricecake-sidemenu">
        <button v-on:click="onClose"> X </button>
        <div class="ricecake-sidemenu-component">
            <h1> Side test </h1>
            <h3> Copyright GeekTree0101 </h3>
        </div>
    </div>
</template>


<script>
    import Ricecake from "./../../../ricecake/ricecake.core.js";

    export default {

        name : "sidemenu",
        data(){
            return{

                datasheet : [
                    { data : "test1"},
                    { data : "test2"},
                    { data : "test3"},
                    { data : "test4"}
                ]
            }
        },
        props : {
            toggleState : {
                type : 'Object'
            }
        },
        methods : {
            onClose : function(){
                console.log("close side menu");
                this.$parent.openSideMenu();
            }
        }
    }
</script>    