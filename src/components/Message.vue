<template>
    <div class="message" v-if="message.conversation">
        <h4>Conversation > <router-link :to="{Name:'Conversation', params:{id:message.conversation.id}}"></router-link></h4>
        <div class="header-msg">
            {{membre.fullname}}
            <!--time datetime="{{dateMessage}}"-->
            <time>
                le {{dateMessage}}
            </time>
        </div> 
        <p>{{message.message}}</p>
    </div>
</template>
<script>
export default {
    props: ['message'],
    computed : {
        membre(){
            return this.$store.getters.getMembre(this.message.membre_id); 
        },
        dateMessage(){
            let options = {weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'};
            return new Date(this.membre.created_at).toLocaleDateString('fr-FR', options);
        }
    }
}
</script>