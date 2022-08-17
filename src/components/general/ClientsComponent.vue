<template>
        <div v-if="loading">
            loading...
        </div>
        <div v-if="errorMessage">
            <p>{{errorMessage}}</p>
        </div>
        <table v-if="!loading && clients?.length > 0">
            <tr class="t-head">
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Providers</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="client in clients" :key="client._id" class="client" :client="client">
                <td>{{client.name}}</td>
                <td>{{client.email}}</td>
                <td>{{client.phone}}</td>
                <td>{{client.providers.join(", ")}}</td>
                <td @click="toggleShowEditClientModal(client)" class="edit">Edit</td>
                <td @click="deleteClient(client._id)" class="edit">Delete</td>
            </tr>
        </table>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
    name: "ClientsComponent",
    methods: {
        ...mapActions(['fetchClientApi', 'deleteClient']),
        ...mapMutations(["toggleShowEditClientModal"]),
        onClick(client) {
            this.selectAClient(client)
            this.$emit('link-click');
        },
    },
    computed: {
      ...mapGetters(["clients", "loading", "errorMessage"])
    },
    mounted() {
        this.$store.dispatch("getAllClients");
    }
};
</script>

<style scoped>
    table, td, th {
        border: 1px solid gray;
        text-align: start;
        padding: 5px;
        color: rgb(61, 60, 60);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    .edit {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }
    .t-head {
        background: linear-gradient(to top, rgb(236,236,235), rgb(255,255,255));
    }
</style>