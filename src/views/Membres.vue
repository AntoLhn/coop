<template>
    <div id="membre">
        <h2>Membres</h2>
        <div id="box-membre">
            <template v-for="membre in $store.state.membres">
                <Membre :membre="membre"/>
            </template>
        </div>
    </div>
</template>
<script>
import Membre from '@/components/Membre.vue'

export default {
    components:{
        Membre
    }
}
</script>