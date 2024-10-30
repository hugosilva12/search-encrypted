<template>
  <Message :key="msg" :msg="msg" v-show="msg" />
  <div>
    <form id="burger-form" method="POST" @submit="createUser">
      <div class="input-container" style="margin-left: 40px;">
        <label for="nome">Username:</label>
        <input type="text" id="nome" name="nome" v-model="username" placeholder="Digite o username">
      </div>
      <div class="input-container" style="margin-left: 40px;">
        <label for="nome">Public Key:</label>
        <textarea v-model="public_key" placeholder="Digite a chave publica"  rows="4" cols="400"></textarea>
      </div>  
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Criar user!">
      </div>
    </form>
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: "CreateUser",
  data() {
    return {
      public_key: null,
      username: null,
      msg: null,
    }
  },
  methods: {
    async createUser(e) {

      e.preventDefault()
      this.public_key = this.public_key.replaceAll('\\n', '');
      const data = {
        username: this.username,
        public_key: this.public_key,
      }
      const dataJson = JSON.stringify(data)    
      const req = await fetch("http://localhost:8082/user", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      }).then( (result) =>{
        this.msg = "User criado com sucesso!"
      }
      ).catch((result) => {
        this.msg = result;
      });

      // clear message
      setTimeout(() => this.msg = "", 3000)
      
    }
  },
  components: {
    Message
  }
}
</script>

<style scoped>
  #burger-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid rgb(60, 179, 113);;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }

  .submit-btn {
    background-color: #222;
    color: rgb(60, 179, 113);
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>