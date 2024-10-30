<template>
  <div>
    <Banner />
    <div class="main-container">
      <h1>Gerar Keys:</h1>
      <GenerateKeys />
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import GenerateKeys from '../components/GenerateKeys'

export default {
  name: 'Home',
  components: {
    Banner,
    GenerateKeys
  }
}
</script>