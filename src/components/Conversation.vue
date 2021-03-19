<template>
    <div class="row">
        <div class="column">
            <h3>{{conversation.topic}}</h3>
            <hr>
            <p>{{conversation.label}}</p>
        </div>
        <div class="column column-20">
            <router-link :to="{name:'Conversation', params:{id : conversation.id}}"
                class="button">💬</router-link>
        </div>
    </div>
</template>
<script>
export default {
    props : ['conversation'] 
}
</script>