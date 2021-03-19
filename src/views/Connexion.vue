<template>
    <div id="connexion">
        <h2>Connexion</h2>
        <form @submit.prevent="connexion" class="form">
            <fieldset>
                <label>Email</label>
                <input v-model="email" type="email" placeholder="Email" required/>

                <label>Mot de passe</label>
                <input v-model="password" type="password" placeholder="Mot de passe" required/>
                
                <button>Connexion</button>
                <p><router-link to="/Inscription">Créer son compte</router-link></p>
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
    // data(){
    //     return{
    //         email: 'test@test.fr',
    //         password: 'test',
    //     }
    // },
    methods: {
        connexion(){
            api.post('members/signin',{
                email:this.email,
                password:this.password
            }).then(response =>{
                this.$store.commit('setConnecte', response.data);
                this.$router.push('/Home');
            }).catch(error => {
                alert(error.response.data.message);
            });
        }
    }
}
</script>