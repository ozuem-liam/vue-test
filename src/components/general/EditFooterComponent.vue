<template>
    <footer>
        <div>
            <ButtonComponent type="button" bcolor="red" tcolor="white" @btn-click="$emit('delete-client')" text="Delete Client"/>
        </div>
        <div>
            <ButtonComponent type="button" @btn-click="toggleShowEditClientModal" text="Cancel"/>
            <ButtonComponent type='submit' text="Save Client"/>
        </div>
    </footer>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue"
import { mapActions } from "vuex"

export default {
    name: "FooterComponent",
    props: {
        title: String
    },
    components: {
        ButtonComponent
    },
    methods: {
        ...mapActions(["toggleShowEditClientModal"])
    },
}
</script>

<style>
 footer {
     display: flex;
     padding: 10px;
     border-top: 1px solid gray;
     justify-content: space-between;
     align-items: center;
     font-family: Arial, Helvetica, sans-serif;
 }
</style>