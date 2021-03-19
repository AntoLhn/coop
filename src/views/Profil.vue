<template>
    <div id="profil" v-if="membre">
        <h2>{{membre.fullname}}</h2>
        <a :href="'mailto'+membre.email">{{membre.email}}</a>
        <p>Inscrit depuis le {{membre.dateInsc}}</p>
        <hr>
        <div>
            <h3>Messages</h3>
            <div v-if="loading">Chargement des messages...</div>
            <div v-else>
                <span>Dans l'ordre croissant</span>
                <template v-for="message in this.messages.slice(0, 10)">
                    <Message :message="message"></Message>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Message from '@/components/Message.vue'
export default {
    components: {Message},
    data(){
        return{
            membre: false,
            messages : [],
            loading: true
        }
    },
    mounted(){
        if(this.$route.params.membre_id){
            this.membre = this.$store.getters.getMembre(this.$route.params.membre_id);
            let options = {weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'};
            this.membre.dateInsc = new Date(this.membre.created_at).toLocaleDateString('fr-FR', options);

            let cpt = 0;
            this.$store.state.conversations.forEach(conversation => {
                api.get('channels/'+conversation.id+'/posts').then(response =>{
                    response.data.forEach(message => {
                        if(message.member_id == this.membre.id){
                            this.messages.push(message);
                        }
                    })
                    cpt ++;
                });
            });
            this.loading = false;
        }
    }
}
</script>