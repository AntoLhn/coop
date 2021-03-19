<template>
    <div class="message" v-if="m">
        <div>
			<header>
				<div class="membre">
					<b><router-link :to="{name: 'Profil',params: { membre_id: membre.id },}">{{ membre.fullname }}</router-link></b> : <br>
				</div>
				<div class="conversation" v-if="m.conversation">
					Message posté dans
					<b><router-link :to="{ name: 'Conversation', params: { id: m.conversation.id } }">{{ m.conversation.topic }}</router-link></b>
				</div>
			</header>
            <div class="content">
                <form v-if="editer" @submit.prevent="editerMessage">
                    <div class="row">
                        <div class="column">
                            <textarea @keyup.esc="editer = false" ref="editer" v-model="messageContent" required type="text"  placeholder="Votre message..."></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column envoyer">
                            <button class="button">Enregistrer</button>
                            <button type="button" @click="editer = false" class="button button-outline"> Annuler </button>
                        </div>
                    </div>
                </form>
                <div v-else>{{ m.message }}</div>
                <time v-html="dateMessage"></time>
            </div>
		</div>
        <div class="actions" v-if="m.member_id == this.$store.state.membre.id">
			<button class="button-clear" @click="activerEditer">Modifier</button>
			<button class="button-clear" @click="supprimerMessage">Supprimer</button>
		</div>
    </div>
</template>
<script>
export default {
    props: ['message'],
    data(){
        return{
			m: false,
            editer : false,
            messageTxt : ""
        };
    },
    mounted() {
		this.m = this.message;
	},
    computed : {
        //On récupère l'éditeur du message
        membre() {
			return this.$store.getters.getMembre(this.m.member_id);
		},
        //Définit la date et l'heure de la publication ou l'édition d'un message
		dateMessage() {
			let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
			let dc = new Date(this.m.created_at);
			let dateMessage ="Envoyé le " + dc.toLocaleDateString("fr-FR", options) + " à " + dc.toLocaleTimeString();
			if (this.m.created_at != this.m.modified_at) {
				let dm = new Date(this.m.modified_at);
				dateMessage += " | <small>Modifié le " + dm.toLocaleDateString("fr-FR", options) + " à " + dm.toLocaleTimeString() + "</small>";
			}
			return dateMessage;
		}
    },
    methods: {
        //Changement d'état pour l'édition d'un message
		activerEditer() {
			this.editer = true;
			this.messageContent = this.m.message;
			setTimeout(() => this.$refs["editer"].focus(), 500);
		},
        //Envoi à l'api la modification du message
		editerMessage() {
			api.put(`channels/${this.m.channel_id}/posts/${this.m.id}`, {
                message: this.messageContent,
            })
            .then((response) => {
                this.m = response.data;
                this.editer = false;
            });
		},
        //Confirmation de supression et supression du message
		supprimerMessage() {
			if (confirm("Voulez vous vraiment supprimer ce message ?")) {
				api.delete(`channels/${this.m.channel_id}/posts/${this.m.id}`)
                .then((response) => {
                    this.m = false;
                });
			}
		},
	},
}
</script>