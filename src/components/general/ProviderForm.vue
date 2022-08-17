<template>
    <form @submit.prevent="registerAProvider" class="input-div">
        <label for="phone">Providers:</label>
            <div class="add-provider-form">
                <input v-model="provider" class="provider-input" type="text"/>
                <ButtonComponent type="submit" class="btn" text="Add Provider"/>
            </div>
    </form>
</template>

<script>
import {mapActions} from "vuex"
import ButtonComponent from "./ButtonComponent.vue"
export default {
    name: "ProviderForm",
    data() {
        return {
            provider: ''
        }
    },
    components: {
        ButtonComponent,
    },
    methods: {
        ...mapActions(['addAProvider']),
        registerAProvider(e) {
            e.preventDefault();
            this.addAProvider(this.provider);
        }
    }
}
</script>

<style scoped>
.input-div {
     display: flex;
     width: 100%; 
}
label {
    text-align: end;
    width: 20%;
}
 .add-provider-form {
    display: flex;
    width: 80%;
 }
 .provider-input {
    width: 63%;
    border: 1px solid gray;
    border-radius: 3px;
    margin-right: 7px;
    font-size: large;
 }
 .btn {
     width: 34%;
     height: 35px;
     margin: 0;
     font-size: 13px;
 }
@media (max-width: 1193px) {
.provider-input {
    width: 55%;
 }
 .btn {
     width: 30%;
 }
}
@media (max-width: 1193px) {
label {
    width: 25%;
}
.provider-input {
    width: 35%;
 }
 .btn {
     width: 35%;
 }
 }
</style>