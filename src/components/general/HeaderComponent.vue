<template>
    <header>
        <h2>{{ title }}</h2>
        <ButtonComponent @btn-click="toggleShowAddClientModal" text="New Client" />
    </header>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue"
import { mapMutations } from "vuex"
export default {
    name: "HeaderComponent",
    props: {
        title: String
    },
    components: {
        ButtonComponent
    },
    methods: {
        ...mapMutations(["toggleShowAddClientModal"])
    }
}
</script>

<style>
 header {
     display: flex;
     padding: 5px;
     background: rgba(182, 208, 226, 0.2);
     height: 35px;
     color: rgba(65, 105, 225, 0.6
     );
     justify-content: space-between;
     align-items: center;
     font-family: Arial, Helvetica, sans-serif;
 }
</style>