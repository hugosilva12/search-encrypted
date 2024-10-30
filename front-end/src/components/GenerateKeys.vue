<template>
  <Message :msg="msg" v-show="msg" />
  <div style="text-align:center">
    <button class="submit-btn" @click="generateKeys">Gerar chaves</button>
  </div>
  <div id="burger-table"  style="margin-top: 30px;" v-if="view">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Chave pública:</div>
        <div></div>
        <div></div>
        <div>Chave privada:</div>
      </div>
      <div id="burger-table-rows">
      <div class="burger-table-row" >
        <div class="order-number"> </div>
        <div>{{ public_key }}</div>
        <div> </div>
        <div> </div>
        <div>{{ private_key }}</div>
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>

<script>
import { assertLiteral } from '@babel/types'
import Message from './Message'

export default {
  name: "GenerateKeys",
  data() {
    
    return {
      public_key: null,
      private_key: null,
      msg: null,
      view :false
    }
  },
  methods: {
  
    async generateKeys(e) {
      e.preventDefault()
      const req = await fetch('http://localhost:8082/generate-keys')
      const data = await req.json()
      this.private_key= data['private_key'];
      this.public_key= data['public_key'];
      this.view = true;
      this.msg = "Chaves geradas com sucesso!"
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
    border-left: 4px solid rgb(60, 179, 113);    
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