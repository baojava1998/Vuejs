<style>
    .has-error {
        border: 1px solid #f00;
    }
    .error {
        color: #f00;
    }
</style>
<template>
    <div id="app">
        <div class="preloader">
            <div class="lds-ripple">
                <div class="lds-pos"></div>
                <div class="lds-pos"></div>
            </div>
        </div>
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>
<script>
export default {
    name: 'app',
    computed:{
        layout() {
            return (this.$route.meta.layout ?? 'default') + '-layout';
        },
    },
}
</script>
