<template>
  <div>
    <div class="main-container">
      <h1>Lista de Utilizadores</h1>
      <Dashboard />
    </div>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard'

export default {
  name: 'Users',
  components: {
    Dashboard
  }
}
</script>
