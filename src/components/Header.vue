<template>
    <div id="nav">
      <!--img id="logo" src="../assets/Coop_italia_logo.png" alt="Logo"/-->
      <div id="menu">
        <router-link to="/Home">Conversations</router-link> |
        <router-link to="/Membres">Membres</router-link>
      </div>
      <div id="nav-right">
        <router-link :to="{name: 'Profil', params: { membre_id: $store.state.membre.id },}">
            <button class="button-clear" title="Profil">👤 {{$store.state.membre.fullname}}</button>
        </router-link>
        <div id="logout">
          <button v-if="this.$store.state.token" @click="deconnexion">Déconnexion</button>
          <router-link to="/Connexion" v-else >Connexion</router-link>
        </div>
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
  mounted(){
    console.log(this.membre)
  }
}
</script>