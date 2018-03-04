import * as types from '../store/mutation-types'
import Vue from 'vue'

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

import store from '../store'
import router from '../router'
import ActionCable from 'actioncable'
import * as api from '../api'

import * as Chordpro from 'chordprojs'

console.log(api);

import App from '../components/app.vue'

document.addEventListener('DOMContentLoaded', () => {
  // Get the properties BEFORE the app is instantiated
  const node = document.getElementById('chordprompt-app')
  const props = JSON.parse(node.getAttribute('data'))
  store.commit(types.INIT,props)

  const app = new Vue({
    render: h => h(App),
    store,
    router
  }).$mount('#chordprompt-app');

  console.log(app)
  const cable = ActionCable.createConsumer()


    cable.subscriptions.create('TestChannel', {
        received: function (data){
            store.commit('ADD_MESSAGE',data)
        }
    })

    store.dispatch('entities/songs/fetchAll');


    cable.subscriptions.create({ channel: 'JamSessionChannel', id: app.$store.state.jamSession.id }, {
        received: function (data){
            console.log(data)
            store.commit('UPDATE_JAMSESSION', data.jamSession)
        }
    })

    // const data = [
    //   {
    //     id: 1,
    //     title: 'Hello, world!',
    //     duration: 120
    //   }
    // ]

  const chordpro_content="{t:La Boheme}\n" +
    "{st:Charles AZNAVOUR}\n" +
    "\n" +
    "# Intro:\n" +
    "{sot}\n" +
    "e|--5h7p5-4-5-----5-----5-|--5h7p5-4-5-----5-----5-|-------3-2-1-----1-----|-0-----0-----0-----0-----0--|\n" +
    "B|--------------6---6-----|--------------5---5-----|-5-4-5---------3---3---|-----0---3-------1---1------|\n" +
    "G|------------7-------7---|------------5-------5---|-------------2-------2-|---1-----------2-------2----|\n" +
    "D|----------0-------------|------------------------|-----------0-----------|----------------------------|\n" +
    "A|------------------------|----------0-------------|-----------------------|-------------0--------------|\n" +
    "E|------------------------|------------------------|-----------------------|-0--------------------------|\n" +
    "{eot}\n" +
    "[Dm]__ Je vous parle d'un temps que les moins de vingt ans\n" +
    "Ne peuvent pas conn[Am]aitre Montmartre en ce temps-[Dm]la\n" +
    "Accrochait ces lil[Am]as jusque sous nos fenetres\n" +
    "Et si l'humble gar[Dm]ni qui nous servait de nid\n" +
    "Ne payait pas de [Am]mine, c'est la qu'on s'est con[Dm]nu\n" +
    "Moi qui criait f[E7]amine et toi qui posait [Am]nue\n" +
    "{soc}\n" +
    "La bo[Dm]heme, la boh[Am]eme, \n" +
    "ca voulait [Dm]dire on [E7]est heur[Am]eux\n" +
    "La bo[Dm]heme, la bo[Am]heme, \n" +
    "nous ne mangi[Dm]ons qu'un j[E7]our sur d[Am]eux\n" +
    "{eoc}\n" +
    "\n" +
    "[Dm]__ Dans les cafes voisins nous etions quelques uns\n" +
    "Qui attendions la g[Am]loire et bien que miser[Dm]eux\n" +
    "Avec le ventre cr[Am]eux Nous ne cessions d'y croire\n" +
    "Et quand quelque bist[Dm]ro contre un bon repas chaud\n" +
    "Nous prenait une t[Am]oile nous recitions des v[Dm]ers\n" +
    "Groupes autour du [E7]poele en oubliant l'hi[Am]ver\n" +
    "{soc}\n" +
    "La bo[Dm]heme, la bo[Am]heme \n" +
    "ca voulait [Dm]dire tu [E7]es jo[Am]lie\n" +
    "La bo[Dm]heme, la bo[Am]heme \n" +
    "et nous avi[Dm]ons tous [E7]du ge[Am]nie\n" +
    "{eoc}\n" +
    "\n" +
    "[Dm]__ Souvent il m'arrivait devant mon chevalet\n" +
    "De passer des nuits bl[Am]anches retouchant le des[Dm]sin\n" +
    "De la ligne d'un s[Am]ein du galbe d'une hanche\n" +
    "Et ce n'est qu'au ma[Dm]tin qu'on s'assayait enfin\n" +
    "Devant un cafe-c[Am]reme epuises mais ra[Dm]vis\n" +
    "Fallait-il que l'on s[E7]'aime et qu'on aime la [Am]vie\n" +
    "{soc}\n" +
    "La bo[Dm]heme, la bo[Am]heme \n" +
    "ca voulait [Dm]dire on[E7] a vingt [Am]ans\n" +
    "La bo[Dm]heme, la bo[Am]heme \n" +
    "et nous vivi[Dm]ons de l'[E7]air du t[Am]emps\n" +
    "{eoc}\n" +
    "\n" +
    "[Dm]__ Quand au hasard des jours je m'en vais faire un tour\n" +
    "A mon ancienne ad[Am]resse je ne reconnais p[Dm]lus\n" +
    "Ni les murs, ni les r[Am]ues qui ont vu ma jeunesse\n" +
    "En haut d'un escal[Dm]ier je cherche l'atelier\n" +
    "Dont plus rien ne sub[Am]siste dans son nouveau de[Dm]cor\n" +
    "Montmartre semble [E7]triste et les lilas sont m[Am]orts\n" +
    "{soc}\n" +
    "La bo[Dm]heme, la bo[Am]heme \n" +
    "on etait [Dm]jeunes, on [E7]etait f[Am]ous\n" +
    "La bo[Dm]heme, la bo[Am]heme \n" +
    "ca ne veut p[Dm]lus rien d[E7]ire du [Am]tout \n" +
    "\n" +
    "\n" +
    "[Dm]      [Am]      \n" +
    "[Dm/E7]          [Am]\n" +
    "\n" +
    "[Dm]      [Am]      \n" +
    "[Dm/E7]          [Am]\n" +
    "\n" +
    "[Dm]      [Am]      \n" +
    "[Dm/E7]          [Am]\n" +
    "\n" +
    "[Dm]      [Am]      \n" +
    "[Dm/E7]          [Am]\n" +
    "     \n" +
    "{eoc}\n"

    console.log({
      source: chordpro_content,
      chordpro: Chordpro,
      content: Chordpro.format(chordpro_content)
    })



})

