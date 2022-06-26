import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

//const url ="https://628960e7e5e5a9ad3218b1b3.mockapi.io/usuarios/usuarios"
export default new Vuex.Store({
    state: {
       url:'https://628960e7e5e5a9ad3218b1b3.mockapi.io/usuarios/usuarios',
       personas:[],
       
    },
    actions: {
       async addPersonas({commit},alumno){
        try {
        await axios.post(this.state.url, alumno,{'content-type':'application/json'});
        commit('addPersonas',alumno)  
       } catch (error) {
           alert(error.message)
       }
            
        },     
        async getPersonas({commit}){
            try {
                const {data} =  await axios.get(this.state.url);
                commit('getPersonas',data)   
            } catch (error) {
                alert(error.message)
            }
          
        },     

      /*  async obtenerListaPersonas({commit}){
            const index = this.state.persona.id
            const { data: getList } = await axios.get(this.state.url+`/${index}`);
            commit('addPersonas',getList);
            
        }*/
    },
    mutations: {
        getPersonas(state,data) {
        state.personas = data
        }, 
        addPersonas(state,data){
            state.personas.push(data)
        }
    }
})