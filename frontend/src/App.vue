<template>
    <!-- This component just loads the UI component containing the other components builds the entire application -->
    <div id="app">
        <UI msg="Patienten Stammdaten" />
    </div>
</template>

<script>
// Importing UI containing the other components
import UI from "./components/UI.vue";
export default {
    name: "App",
    components: {
        UI,
    },
};
</script>

<style>
/* This style is applied globally */
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
