<template>
    <div v-show="riceProps.state" class="ricecake-sidemenu">
        <i class="material-icons" v-on:click="onClose">close</i>
        <div class="ricecake-sidemenu-component">
            <h1> Side test </h1>
            <h3> Copyright GeekTree0101 </h3>
        </div>
    </div>
</template>


<script>
    import Ricecake from "./../ricecake.core.js";

    export default {

        name : "sidemenu",
        props : {
            riceProps : {
                type : 'Object'
            }
        },
        mounted : function(){
            this.riceProps.handler = this.onClose;
        },
        methods : {

            onClose : function(){

                if(!this.riceProps.state){
                    
                    Ricecake.Core.action("ricecake-sidemenu","sideOn");
                    this.riceProps.state = true;
                }
                else{

                    Ricecake.Core.action("ricecake-sidemenu","sideOff");
                    
                    setTimeout(()=>{
                        this.riceProps.state = false;
                    },500);
                }
            }
        }
    }
</script>    