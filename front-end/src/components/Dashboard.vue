<template>
  <div id="burger-table" v-if="users">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Username:</div>
        <div>Chave pública:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="user in users" :key="user.id">
        <div class="order-number">{{ user.id }}</div>
        <div style="word-wrap: break-word;">{{ user.username }}</div>
        <div style="width:500px;word-wrap: break-word;">{{ user.public_key }}</div>
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Não há users no momento!</h2>
  </div>
</template>
<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        users: null,
      }
    },
    methods: {
      async getUsers() {
        const req = await fetch('http://localhost:8082/user')
        const data = await req.json()
        this.users = data

      },
      
    },
    mounted () {
    this.getUsers()
    }
  }
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
  
</style>