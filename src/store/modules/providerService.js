import axios from "axios";

export default {
  state: {
    providers: [],
  },
  mutations: {
    setProviders: (state, providers) => (state.providers = providers),
    newProvider: (state, provider) => state.providers.unshift(provider),
    removeProvider: (state, id) =>
      (state.providers = state.providers.filter(
        (provider) => provider._id !== id
      )),
  },

  actions: {
    async fetchProviderApi({ commit }) {
      const response = await axios.get(
        `${process.env.VUE_APP_API}provider`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      commit("setProviders", response.data.data);
    },

    async addAProvider({ commit }, provider) {
      const response = await axios.post(
        `${process.env.VUE_APP_API}provider`,
        {
          provider,
          completed: false,
        }
      );

      commit("newProvider", response.data.data);
    },

    async deleteAProvider({ commit }, id) {
      await axios.delete(
        `${process.env.VUE_APP_API}provider/delete/${id}`
      );

      commit("removeProvider", id);
    },
  },

  getters: {
    allProviders: (state) => state.providers,
  },
};
