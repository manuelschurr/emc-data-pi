<template>
  <div>{{ output }}</div>
</template>

<script>
export default {
  data() {
    return {
      output: ""
    };
  },
  mounted() {
    this.$root.$on("textABCDE", data => {
      this.output = data;
    });
  }
};
</script>