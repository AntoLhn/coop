<template>
    <div>
        <div id="creer-conversation" v-if="afficher">
            <section>
                <button class="close" @click="masquerFormulaire">✕</button>
                <h2>Créer une conversation</h2>
                <form @submit.prevent="creerConversation" class="form">
                    <fieldset>
                        <label>Sujet</label>
                        <input v-model="topic" type="text" placeholder="Sujet de votre conversation"/>

                        <label>Tags</label>
                        <input v-model="label" type="text" placeholder="Tags de la conversation"/>

                        <button>Créer une conversation</button>
                        <button class="button button-clear" type="button" @click="masquerFormulaire">Annuler</button>
                    </fieldset>
                </form>
            </section>
        </div>
        <template v-else>
            <button @click="afficherFormulaire">Créer une nouvelle conversation</button>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return{
        afficher:false,
        topic: '',
        label: ''
        }
    },
    mounted(){
        this.$bus.$on('afficher-creer-conversation',this.afficherFormulaire)
    },
    methods :{
        creerConversation(){
            api.post('channels',{
                label : this.label,
                topic : this.topic
            }).then(response =>{
                this.masquerFormulaire();
                this.$bus.$emit('charger-conversations');
            })
        },
        afficherFormulaire(){
            this.topic = '';
            this.label = '';
            this.afficher = true;
        },
        masquerFormulaire(){
            this.afficher = false;
        }
    }
}
</script>

<style lang="scss">
#creer-conversation{
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    & > section{
        z-index: 2;
        position: absolute;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 10px;
        padding: 2%;
        .close{
            position: absolute;
            top: -1em;
            right: -1em;
            width: 3em;
            height: 3em;
            font-size: 1em;
            line-height: 0;
            margin: 0;
            padding: 0;
            border-radius: 50%;   
        }
        form{
            box-shadow: none!important;
        }
        h2{
            text-align: center;
        }
    }
}
</style>