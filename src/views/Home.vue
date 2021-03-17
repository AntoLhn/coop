<template>
    <div id="conversation">
        <h2>Conversations</h2>
        <CreerConversation/>
        <div>
            <template v-for="conversation in $store.state.conversations">
              <Conversation :conversation="conversation" id="conversation"/>
            </template>
        </div>
    </div>
</template>
<script>
import CreerConversation from '@/components/CreerConversation.vue'
import Conversation from '@/components/Conversation.vue'

export default {
    components:{
        CreerConversation,
        Conversation
    }
}
</script>