import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

//Vue Persost
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    membres: [],
    membre: [],
    conversations: [],
    token: false,
  },
  mutations: {
    setMembres(state, membres){
      state.membres = membres
    },
    setConversations(state, conversations){
      state.conversations = conversations
    },
    setConnecte(state, data){
      state.membre = data.member
      state.token = data.token
    },
    deconnexion(state){
      state.token = false
      state.membre = []
    }
  },
  getters: {
    getMembre(state){
      let fonction = (membre_id) => {
        return state.membres.find(membre =>{
          return membre.id == membre_id;
        });
      }
      return fonction;
    }
  },
  actions: {
  },
  modules: {
  }
})
