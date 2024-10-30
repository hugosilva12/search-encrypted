<template>
  <Message :msg="msg" v-show="msg" />
  <div style="text-align:center; margin-bottom: 30px;">
    <button class="submit-btn" @click="changeMachine('Forwarder')">Forwarder</button>
    <button class="submit-btn" @click="changeMachine('Harvasted')" style="margin-left: 10px;">Harvasted</button>
  </div>
  <div style="text-align:center; margin-bottom: 30px;">
    {{ machine }}
    </div>
  <div >
    <form id="burger-form" method="POST" @submit="uploadFile" style="justify-content: center;">
      <div class="input-container" style="margin-left: 40px;">
        <label for="nome">Data:</label>
        <input type="text" id="nome" name="date" v-model="date" placeholder="Digite o username">
      </div>
      <div class="input-container" style="margin-left: 40px;">
        <label for="nome">Escolher ficheiro:</label>
        <input type="file" @change="previewFiles" multiple  ref="myFiles" >
      </div>  
     
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Upload file!">
      </div>
    </form>
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: "UploadFile",
  data() {
    return {
      date: null,
      files: [],
      msg: null,
      machine: 'Forwarder'
    }
  },
  methods: {
  previewFiles() {
    console.log("this.$refs.myFiles.files ",this.$refs.myFiles.files[0] )
    this.files = this.$refs.myFiles.files
  },
  changeMachine(value) {
    this.machine = value
  },
    async uploadFile(e) {
      e.preventDefault()

      const form =new FormData();
      form.append("file",this.files[0])
      form.append("date",this.date)
 
      const path = this.machine == 'Forwarder' ? 'upload-forwarder' : 'upload-harvested';

      const req = await fetch(`http://localhost:8082/${path}`, {
        method: "POST",
        //headers: { "Content-Type" : "multipart/form-data" },
        body: form
      }).then( (result) =>{
        return result.json();
      }
      ).catch((result) => {
        alert('error')
      });
      this.msg = req;
    
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