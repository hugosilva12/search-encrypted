<template>
  <div id="footer">
    <p>Dados e privacidade &copy; 2023</p>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  #footer {
    height: 200px;
    background-color: #222;
    border-top: 4px solid #111;
    color: rgb(60, 179, 113);
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    margin-top: 100px;
    width: 100%;
  }
</style>