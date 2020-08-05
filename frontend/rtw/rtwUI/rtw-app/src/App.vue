<template>
    <div id="app">
        <UI msg="Patienten Stammdaten" />
    </div>
</template>

<script>
import UI from "./components/UI.vue";
export default {
    name: "App",
    components: {
        UI,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
