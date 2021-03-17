<template>
    <div id="profil" v-id="membre">
        <h2>{{membre.fullname}}</h2>
        <p><a :href="'mailto'+membre.email">{{membre.email}}</a></p>
        <p>Inscrit depuis le {{membre.dateInsc}}</p>

        <div>
            <h3>Messages</h3>
            <div v-if="loading">Chargement des messages...</div>
            <template v-else v-for="message in messagesTries">
                <Message :message = "message"></Message>
            </template>
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
    computed: {
        messagesTries(){
            function compare(a,b){
                if(a.created_at < b.created_at){
                    return -1;
                }
                if(a.created_at > b.created_at){
                    return 1;
                }
                return 0;
            }
            return this.messages.sort(compare).slice(0, 10);
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
                        if(message.membre_id == this.membre.id){
                            this.messages.push(message);
                        }
                    })
                    cpt ++;
                    if(this.$store.state.conversations.length == cpt){
                        setTimeout(()=> this.loading = false, 2000);
                    }
                });
            });
        }
    }
}
</script>