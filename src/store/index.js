import { createStore } from "vuex";
import clients from "./modules/clientService"
import providers from "./modules/providerService"

export default createStore({
    modules: {
        clients,
        providers
    }
})