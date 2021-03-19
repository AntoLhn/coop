<template>
    <div id="inscription">
        <h2>Inscription</h2>
        <form @submit.prevent="creerCompte" class="form">
            <fieldset>
                <label>Nom</label>
                <input v-model="fullname" type="text" placeholder="Nom"/>

                <label>Email</label>
                <input v-model="email" type="email" placeholder="Email"/>

                <label>Mot de passe</label>
                <input v-model="password" type="password" placeholder="Mot de passe"/>

                <label>Confirmation de votre mot de passe</label>
                <input v-model="passwordconf" type="password" placeholder="Confirmer votre mot de passe"/>
                
                <button>Creer un compte</button>
                <p><router-link to="/Connexion">Se connecter</router-link></p>
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
    // data(){
    //     return{
    //         fullname: 'TEST',
    //         email: 'test@test.fr',
    //         password: 'test',
    //         passwordconf: 'test',
    //     }
    // },
    methods : {
        //Création d'un compte
        creerCompte(){
            //On vérifie si les mdp correspondent
            if(this.password == this.passwordconf){
                api.post('members',{
                    fullname:this.fullname,
                    email:this.email,
                    password:this.password
                }).then(response =>{
                    alert("Votre compte a bien été créé.");
                    this.$router.push('/Connexion');
                }).catch(error => {
                    alert(error.response.data.message);
                });
            }else{
                alert("Les mots de passe ne sont pas identique.")
            }
        }
    }
}
</script>