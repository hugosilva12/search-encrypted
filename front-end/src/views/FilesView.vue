<template>
  <div>
    <Banner />
    <div class="main-container">
      <UploadFiles />
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import UploadFiles from '../components/UploadFiles'

export default {
  name: 'Users',
  components: {
    UploadFiles,
    Banner
  }
}
</script>
