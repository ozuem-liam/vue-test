<template>
  <div class="container">
    <header class="modal-header"><h2>New Client</h2></header>
    <form @submit.prevent="registerClient()">
      <div class="form-container">
        <div class="add-client-input">
          <div class="input-div">
            <label for="name">Name:</label>
            <input v-model="client.name" class="client-input" type="text" />
          </div>
          <div class="input-div">
            <label for="email">Email:</label>
            <input v-model="client.email" class="client-input" type="text" />
          </div>
          <div class="input-div">
            <label for="phone">Phone:</label>
            <input v-model="client.phone" class="client-input" type="text" />
          </div>
          <ProviderForm />
          <div class="provider-options">
            <div v-for="provider in allProviders" v-bind:key="provider._id">
              <input
                type="checkbox"
                :value="provider._id"
                v-model="client.providers"
              />
              <!-- <i class="fas fa-check-square"></i> -->
              <label class="check-label" :for="provider._id">{{
                provider.provider
              }}</label>
              <i
                @click="deleteAProvider(provider._id)"
                class="fas fa-trash-alt"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading">{{message}}</div>
      <AddFooter />
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import AddFooter from "../general/AddFooter.vue"
import ProviderForm from '../general/ProviderForm.vue'

export default {
    name: "AddClient",
    data() {
        return {
            client: {
                name: '',
                email: '',
                phone: '',
                providers: [],
            }, 
            loading: false,
            message: ""
        }
    },
    components: {
        AddFooter,
        ProviderForm
    },
    methods: {
        ...mapActions(['fetchProviderApi', 'deleteAProvider', 'addAClient']),
        registerClient: function() {
            let providers = [];
            if(this.name == '' && this.email == '' && this.phone == '') {
              alert("Fields are required");
            }
            this.client.providers.map((item) => providers.push(item));

            const client = {
              name: this.client.name,
              email: this.client.email,
              phone: this.client.phone,
              providers: providers,
            }
            this.addAClient(client);
          }
        },
  computed: mapGetters(['allProviders']),
  created() {
    this.fetchProviderApi();
   }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 25%;
  left: 20%;
  width: 60%;
  border: 2px solid gray;
  padding: 0px;
  font-family: Arial, Helvetica, sans-serif;
  z-index: 100;
  background: #fff;
}
.modal-header {
  display: flex;
  justify-content: start;
  border-bottom: 1px solid gray;
  align-items: center;
  padding: 10px;
  margin-bottom: 15px;
  height: 30px;
  font-family: Arial, Helvetica, sans-serif;
}
.add-provider-form {
  display: flex;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-client-input {
  display: flex;
  flex-direction: column;
  width: 60%;
}
.input-div {
  display: flex;
  width: 100%;
}
label {
  text-align: end;
  width: 20%;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
}
.btn {
  height: 30px;
}
.client-input {
  width: 80%;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 3px;
  font-size: large;
  height: 30px;
}
.provider-options {
  width: 35%;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid gray;
}
.provider-options div {
  display: inline;
  width: 100%;
  padding: 10px 0 10px 0;
}
.check-label {
  text-align: start;
  margin-left: 2px;
}
i {
  margin: 5px;
}
</style>
