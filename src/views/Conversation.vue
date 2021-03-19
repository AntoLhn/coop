<template>
    <div id="tchat">
        <h2>Conversation</h2>
        <div v-if="conversation">
            <h3>Sujet : {{conversation.topic}}</h3>
            <h4>Tags : {{conversation.label}}</h4>
            <hr>
            <template v-for="message in messages">
                <Message :message="message"/>
            </template> 
        </div>
        <div>
            <form @submit.prevent="posterMessage" class="form">
                <div class="row">
                    <div class="column">
                        <textarea v-model="message" type="text" placeholder="Votre message..." required></textarea>
                    </div>
                    <div class="column-20">
                        <button>➤</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Message from '@/components/Message.vue'
export default {
    components: {Message},
    data(){
        return{
            editer: false,
			c: { topic: "", label: "" },
            conversation: false,
            message: '',
            messages: [],
        }
    }, 
    mounted (){
        if(this.$route.params.id){
            api.get('channels/'+this.$route.params.id).then(response =>{
                this.conversation = response.data;
                this.chargerMessages();
            })
        }
    },
    methods : {
        chargerMessages(){
            api.get('channels/'+this.conversation.id+'/posts').then(response =>{
                let messages = response.data.reverse();
                this.messages = messages;
            })
        },
        posterMessage(){
            api.post('channels/'+this.conversation.id+'/posts',{
                message : this.message
            }).then(response =>{
                this.chargerMessages();
                this.message = '';
            })
        }
    }
}
</script>