<template>
  <div>
    <Banner />
    <div class="main-container">
      <CreateUser />
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import CreateUser from '../components/CreateUser'

export default {
  name: 'Home',
  components: {
    Banner,
    CreateUser
  }
}
</script>