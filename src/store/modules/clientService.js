import axios from "axios";

export default {
  state: {
      loading: false,
      clients: [],
      client: null,
      errorMessage: null,
      successMessage: null,
      showAddClientModal: false,
      showEditClientModal: false,
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    SET_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message;
    },
    SET_CLIENTS(state, clients) {
      state.clients = clients;
    },
    ADD_NEW_CLIENT(state, client) {
      state.client = client;
    },
    toggleShowAddClientModal(state) {
      state.showAddClientModal = !state.showAddClientModal;
    },
    toggleShowEditClientModal(state, client) {
      state.showEditClientModal = !state.showEditClientModal;
      state.client = client;
    },
  },
  actions: {
    toggleShowAddClientModal({ commit }) {
      commit("toggleShowAddClientModal")
    },
    toggleShowEditClientModal({ commit }, client) {
      commit("toggleShowEditClientModal", client)
    },
    async getAllClients({ commit }) {
      try {
        commit("SET_LOADING", true);
        // let dataURL = "https://jsonplaceholder.typicode.com/Clients";
        const response = await axios.get(`${process.env.VUE_APP_API}client`);
        commit("SET_CLIENTS", response.data.data);
        commit("SET_LOADING", false);
        this.loading = false;
      } catch (error) {
        commit("SET_LOADING", false);
        commit("SET_ERROR_MESSAGE", error);
      }
    },
    async addAClient({ commit }, client) {
      try {   
        const response = await axios.post(`${process.env.VUE_APP_API}client`, {
          ...client,
          completed: false,
        });
        commit("ADD_NEW_CLIENT", response.data.data);
        const message = "Client added successfully";
        commit("SET_SUCCESS_MESSAGE", message);
        commit("toggleShowAddClientModal");
        window.location.reload();
      } catch (error) {
        commit("SET_ERROR_MESSAGE", error);
        commit("toggleShowAddClientModal");
      }

    },

    async editAClient({ commit }, { id, client }) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API}client/edit/${id}`,
          {
            ...client,
            completed: false,
          }
         );
  
        commit("editClient", response.data.data);
        const message = "Client updated successfully";
        commit("SET_SUCCESS_MESSAGE", message);
        commit("toggleShowEditClientModal");
        window.location.reload();
      } catch (error) {
        commit("SET_ERROR_MESSAGE", error);
        commit("toggleShowEditClientModal");
      }
    },

    async deleteClient({ commit }, id) {
      try {
        await axios.delete(`${process.env.VUE_APP_API}client/delete/${id}`);
  
        commit("removeClient", id);
        const message = "Client deleted successfully";
        commit("SET_SUCCESS_MESSAGE", message);
        window.location.reload();
      } catch (error) {
        commit("SET_ERROR_MESSAGE", error);
      }
    },
  },
  getters: {
    clients: state => state.clients,
    client: state => state.client,
    errorMessage: state => state.errorMessage,
    successMessage: state => state.successMessage,
    loading: state => state.loading,
    showAddClientModal: state => state.showAddClientModal,
    showEditClientModal: state => state.showEditClientModal,
  }
};
