<template>
    <div id="nav">
      <!--img id="logo" src="../assets/Coop_italia_logo.png" alt="Logo"/-->
      <div id="menu">
        <router-link to="/Home">Conversations</router-link> |
        <router-link to="/Membres">Membres</router-link>
      </div>
      <div id="logout">
        <button v-if="this.$store.state.connecte" @click="deconnexion">Déconnexion</button>
        <router-link to="/Connexion" v-else >Connexion</router-link>
      </div>
    </div>
</template>

<script>
export default {
    methods : {
      deconnexion(){
        this.$store.commit('deconnexion');
        this.$router.push('/Connexion');
      }
  },
}
</script>