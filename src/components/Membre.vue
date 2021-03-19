<template>
    <div class="foreach-membre">
        <div class="row">
        <div class="vr"></div>
            <div class="colmun">
                <p>{{membre.fullname}}</p>
                <a :href="'mailto:'+membre.email">{{membre.email}}</a>
            </div>
            <div class="column">
                <router-link :to="{name: 'Profil', params: { membre_id: membre.id },}">
                    <button class="button" title="Profil">👤</button>
                </router-link>
                <button class="button button-outline" @click="effacerMembre" title="Supprimer">🗑</button>
            </div>
            <div class="vr"></div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['membre'],
    computed : {
        membreConnecte(){
            return this.$store.state.membre.id == this.membre.id
        }
    },
    methods : {
        effacerMembre(){
            if(this.$store.state.membre.id != this.membre.id){
                if(confirm('Voulez-vous supprimer ce membre : '+this.membre.fullname+' ? ')){
                    api.delete('members/'+this.membre.id).then(response =>{
                        this.$bus.$emit('charger-membres');
                    }).catch(error => {
                        console.log(error.response.data);
                    })
                }
            } else {
                alert("Impossible de vous supprimer vous-même.");
            }
            
        }
    }
}
</script>