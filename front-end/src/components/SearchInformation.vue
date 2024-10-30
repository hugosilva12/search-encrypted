<template>
   <div style="text-align:left; margin-bottom: 30px;">
    <form id="burger-form" method="POST" @submit="getInformation" style="justify-content: center;">
      <button class="submit-btn" @click="changeMachine('Forwarder')" style="margin-left: 30px;">Forwarder</button>
     <button class="submit-btn" @click="changeMachine('Harvasted')" style="margin-left: 30px; margin-bottom: 40px;">Harvasted</button>
      <br>
  
      <div class="input-container" style="margin-left: 150px; margin-bottom: 20px; justify-content: center;">
        {{ machine }}
        </div>
      <div class="input-container" style="margin-left: 40px;">
        <label for="nome">Title:</label>
        <input type="text" id="nome" name="date" v-model="title" required placeholder="Digite o title">
      </div>
      <div class="input-container" style="margin-left: 40px;">
        <label for="nome">Private Key:</label>
        <textarea v-model="private_key" placeholder="Digite a chave privada"  rows="15" cols="1000"></textarea>
      </div>  
     
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Pesquisar">
      </div>
    </form>
  </div>
  <div id="burger-table" v-if="reports">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Destinatario:</div>
        <div>Title</div>
        <div>Conteudo:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="user in reports" :key="user.id">
        <div class="order-number">{{ user.id }}</div>
        <div style="word-wrap: break-word;">{{ user.addressee }}</div>
        <div style="word-wrap: break-word;">{{ user.title }}</div>
        <div style="width:500px; margin-left:40px;word-wrap: break-word;">{{ user.content }}</div>
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>{{ msg }}</h2>
  </div>
</template>
<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        title: null,
        private_key: '',
        msg : 'Sem reports!',
        reports: [],
        machine: 'Forwarder'
      }
    },
    methods: {
      changeMachine(value) {
    this.machine = value
  },
      async getInformation(e){
        e.preventDefault();

       /*  while(this.private_key.includes('\n')){
          
        } */
        this.private_key = this.private_key.replaceAll('\\n', '');
       
        const data = {
          title: this.title,
          private_key: this.private_key,
      }
      if(data['private_key']== ''){
        data['private_key'] = null;
      }
      const dataJson = JSON.stringify(data)    

        const path = this.machine == 'Forwarder' ? 'get-upload-forwarder' : 'get-upload-harvested';
        const req = await fetch(`http://localhost:8082/${path}`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      }).then( (result) =>{
        return result.json();
      }
      ).catch((result) => {
        this.msg = result;
      });
      console.log("Reports ", req)
      if(req.toString() == 'Without results'){
        this.msg = req
      }else{
        this.reports = req;
      }
      
      }
      
    },
  
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