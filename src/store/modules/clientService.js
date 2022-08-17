import axios from "axios";

export default {
  state: {
      loading: false,
      clients: [],
      client: null,
      errorMessage: null,
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
    async getAllClients({ commit }) {
      try {
        commit("SET_LOADING", true);
        // let dataURL = "https://jsonplaceholder.typicode.com/users";
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
      const response = await axios.post(`${process.env.VUE_APP_API}client`, {
        ...client,
        completed: false,
      });

      commit("ADD_NEW_CLIENT", response.data.data);
      window.location.reload();
    },

    async editAClient({ commit }, { id, client }) {
      const response = await axios.post(
        `${process.env.VUE_APP_API}client/edit/${id}`,
        {
          ...client,
          completed: false,
        }
       );

      commit("editClient", response.data.data);
      window.location.reload();
    },

    async deleteClient({ commit }, id) {
      try {
        await axios.delete(`${process.env.VUE_APP_API}client/delete/${id}`);
  
        commit("removeClient", id);
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
    loading: state => state.loading,
    showAddClientModal: state => state.showAddClientModal,
    showEditClientModal: state => state.showEditClientModal,
  }
};
