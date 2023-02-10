<template>
    <q-page class="welcome-background">
        <section class="row">
            <div id="welcome" class="col">
                <article>
                    <h1>
                        Rejoignez le <span>réseau social</span> dédié à l'univers de <span>Harry Potter</span> !
                    </h1>
                    <h2>
                        <span>Actualités. Evénements. Coupe des sorciers.</span>
                        <br>Venez représenter fièrement <span>votre maison en devenant magique</span> !
                    </h2>
                    <h3>
                        <span>Fait par des potterheads.</span>
                    </h3>

                    <div id="choice">
                        <ul class="row">
                            <li class="col radius wizard">
                                <router-link to="/register">
                                    <div class="column button items-center">
                                        <q-icon name="img:choixpeau.svg" size="25px"/>
                                        <p>S'inscrire comme <span class="highlight-secondary">Sorcier(e)</span> (compte personnel)</p>
                                    </div>
                                </router-link>
                            </li>
                            <li class="col radius community">
                                <router-link to="/register">
                                    <div class="column button items-center">
                                        <q-icon name="img:news.svg" size="25px"/>
                                        <p>S'inscrire en tant qu'une <span class="highlight-secondary">Communauté</span> (compte pro)</p>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
        </section>
    </q-page>
</template>


<script>

export default {
    name: 'HomeRegisterView',
    components: {}
};
</script>

<style lang="scss" scoped>
.welcome-background {
    background-image: url(../assets/images/common/backgroundAuthentication.jpg);
    background-size: cover;
    background-position: top;
    background-attachment: scroll;
    max-width: unset;

    #welcome {
        padding-top: 225px;
        padding-bottom: 150px;
        border: none;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.3225490879945728) 0%, rgba(0, 0, 0, 0.36456589471726186) 13%, rgba(75, 39, 196, 0.30574236530549714) 29%, rgba(68, 35, 150, 0.4822129535407913) 54%, rgba(18, 4, 17, 0.5242297602634804) 77%, rgba(0, 0, 0, 0.7035014689469538) 100%);

        article {
            max-width: 1160px;
            margin: 0 auto;
            background-color: transparent;
            text-align: center;
        }

        h1 {
            text-align: center;
            font-size: 45px;
            line-height: 50px;
            margin: 0 120px 20px;
            text-shadow: 0 4px 10px #110f41;
        }

        h2 {
            margin: 0 90px 20px;
            font-size: 25px;
            line-height: 30px;
            text-shadow: 0 4px 10px #110f41;
        }

        h3 {
            margin: 0 120px 130px;
            text-shadow: 0 4px 10px #110f41;
        }
    }

    #choice {
        .radius {
            border-radius: 10px;
            margin: 1%;
            cursor: pointer;
        }

        li {
            padding: 0;

            div {
                background: rgba(24, 21, 29, 0.9);
                backdrop-filter: blur(10px);
                border: transparent;
                margin-bottom: 0;
                box-sizing: border-box;
                padding: 35px;
                transition: 0.2s linear;

                &:hover {
                    background-color: #0e0b09;
                }
            }

            .q-icon {
                margin-bottom: 25px;
                margin-right: 0;
            }
        }

        .button {
            margin-top: 0;
            border-radius: 10px;
        }
    }

}
</style>

