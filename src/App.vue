<template>
  <div id="app">
    <Header v-if="this.$store.state.connecte"/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  components : {
    Header
  },
  mounted(){
    console.log("L'app est démarée.");

    //Chargement de l'api
    api.get('ping').then(response =>{
      console.log("L'api est fonctionnelle.");

      //Chargement de la liste des membres
      this.chargerMembres();
      this.$bus.$on('charger-membres', this.chargerMembres);

      //Chargement de la liste des conversation
      this.chargerConversations();
      this.$bus.$on('charger-conversations', this.chargerConversations);

      //Redirection des routes si pas connecté
      if(!this.$store.state.connecte){
        if(this.$route.path != '/Connexion' && this.$route.path != '/Inscription'){
          this.$router.push('/Connexion');
        }
      } else {
        console.log("ID"+this.$store.state.id);
        api.get('membres/'+this.$store.state.id+'/signedin').catch(error =>{
          this.$store.commit('deconnexion');
          this.$router.push('/Connexion');
        })
      }

    //Si l'api n'a pas chargée
    }).catch(error =>{
      console.log("L'api n'est pas fonctionnelle.")
    })
  },
  methods : {
    chargerMembres(){
      //Chargement de la liste des membres
      api.get('members').then(response => {
        this.$store.commit('setMembres', response.data);
      }) 
    },
    chargerConversations(){
      //Chargement de la liste des conversations
      if(this.$store.state.connecte){
        api.get('channels').then(response => {
          this.$store.commit('setConversations', response.data);
        });
      }
    }
  }
}
</script>