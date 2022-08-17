<template>
 <div id="app">
     <ClientList @show-edit-client-modal="showEditClientModal" @show-add-client-modal="showAddClientModal" />
     <div v-if="showAddClientModal">
       <AddClient />
     </div>
     <div v-if="showEditClientModal">
       <EditClient />
     </div>
 </div>
</template>

<script>
  import ClientList from './pages/ClientList.vue'
  import AddClient from './components/modals/AddClient.vue'
  import EditClient from './components/modals/EditClient.vue'
  import { mapGetters } from "vuex"

  export default {
    name: "app",
    computed: {
      ...mapGetters(["showAddClientModal", "showEditClientModal"])
    },
    components: {
      ClientList,
      AddClient,
      EditClient
    },
  }
</script>

<style>
</style>
