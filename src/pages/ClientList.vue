<template>
   <div class="client-container">
     <Header @show-add-client-modal="$emit('show-add-client-modal')" title="Clients"/>
     <Clients @link-click="$emit('show-edit-client-modal')"  />
   </div>
</template>

<script>
  import Clients from '../components/general/ClientsComponent.vue'
  import Header from '../components/general/HeaderComponent.vue'
  
  export default {
    name: "ClientList",
    components: {
      Header,
      Clients
    }
  }
</script>

<style>
 .client-container {
   display: flex;
   flex-direction: column;
   margin-top: 15%;
   margin-left: 10%;
   width: 80%;
   border: 1px solid gray;
   padding: 0, 0, 10px, 0;
 }
</style>