<template>
  <div>
    <div class="main-container">
      <h1>Lista de Reports</h1>
      <SearchInformation />
    </div>
  </div>
</template>

<script>
import SearchInformation from '../components/SearchInformation'

export default {
  name: 'Users',
  components: {
    SearchInformation
  }
}
</script>
