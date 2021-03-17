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
    conversations: [],
    token: false,
    connecte: false,
  },
  mutations: {
    setMembres(state, membres){
      state.membres = membres
    },
    setConversations(state, conversations){
      state.conversations = conversations
    },
    setConnecte(state, token){
      state.connecte = true
      state.token = token
    },
    deconnexion(state){
      state.connecte = false
      state.token = false
    }
  },
  getters: {
    getMembre(state){
      let fonction = (membre_id) => {
        return state.membres.find(membre =>{
          return membre.id == membre.id;
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
