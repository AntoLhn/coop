<template>
    <div>
        <h2>Conversation</h2>
        <div v-if="conversation">
            <h3>{{conversation.topic}}</h3>
            <h4>{{conversation.label}}</h4>
            <template v-for="message in messages">
                <Message :message="message"></Message>
            </template> 
        </div>
        <div>
            <form @submit.prevent="posterMessage" class="form">
                <div class="row">
                    <div class="column">
                        <input v-model="message" type="text" placeholder="Votre message...." required/>
                    </div>
                    <div class="column">
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
            conversation: false,
            message: '',
            messages: []
        }
    }, 
    mounted (){
        if(this.$route.params.id){
            api.get('channels/'+this.$route.params.id).then(response =>{
                this.conversation = response.data;
                console.log(this.conversation);
                this.chargerMessages();
            })
        }
    },
    methods : {
        chargerMessage(){
            api.get('channels/'+this.conversation.id+'/posts').then(response =>{
                let messages = response.data.reverse();
                this.messages = messages;

            })
        },
        posterMessage(){
            api.post('channels/'+this.conversation.id+'/posts',{
                message : this.message
            }).then(response =>{
                setTimeout(() =>{
                    this.$refs['bottom'].scrollIntoView();
                }, 500);
                this.chargerMessages();
                this.message = '';
            })
        }
    }
}
</script>