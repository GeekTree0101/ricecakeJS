<template>
    <div>
        <ul class="ricecake-header-barstyle">
            <li class="ricecake-header-title"> {{riceProps.title}} </li>
            <li v-on:click="onClick" class="ricecake-header-toogle">
                <i class="material-icons"> {{riceProps.icon}}</i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {

        name : "ricecake-headerbar",
        props : {
            riceProps : {
                type : 'Object'
            }
        },
        methods : {
            onClick : function(){
                
                var temp = this.riceProps.callback;

                if(temp != null){
                    this.$parent[this.riceProps.callback]();
                }
            }
        }

    }

</script>