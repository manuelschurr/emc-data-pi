<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">EMC-Portal</a>
    <form class="form-inline ">
      <button class="btn" type="button" @click="changeRTW">Change Rtw</button>
      <h1>
        <img
          alt="Universitätsklinikum Mannheim logo"
          src="../assets/umm_logo.png"
          height="50"
          width="150"
        />
        Universitätsklinikum Mannheim
      </h1>
    </form>
  </nav>
</template>

<script>
export default {
  props: {
    changeRTW: Function
  }
};
</script>