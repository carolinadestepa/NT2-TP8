<template>

  <section class="src-components-formulario">
  <div class="container ">
  <div class="formulario">
     <h2>Formulario</h2>
      <hr>
      <hr>
      <br>

    <vue-form :state="formState" @submit.prevent="enviar()">
    
        <!-- -------------------------------- -->
        <!--   Campo nombre + validaciones    -->
        <!-- -------------------------------- -->
        <validate tag="div">

          <label for="nombre">Nombre</label>
          <input 
            type="text"
            id="nombre"
            class="form-control"
            name="nombre"
            autocomplete="off"
            v-model.trim="formData.nombre" 
            required 
            :minlength="nombreMinLength"
            :maxlength="nombreMaxLength"
            no-espacios
            no-numero
          />
    
          <field-messages name="nombre" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{nombreMinLength}} caracteres.
            </div>
             <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo debe poseer como máximo {{nombreMaxLength}} caracteres.
            </div>
            <div slot="no-espacios" class="alert alert-danger mt-1">
              Este campo no debe poseer espacios intermedios.
            </div>
            <div slot="no-numero" class="alert alert-danger mt-1">
              Sólo se pueden ingresar letras.
            </div>
          </field-messages>
        </validate>
        <br>
        <validate tag="div">

          <label for="edad">Edad</label>
          <input 
            type="number"
            id="edad"
            class="form-control"
            name="edad"
            autocomplete="off"
            v-model.trim="formData.edad" 
            required 
            :min="edadMin"
            :max="edadMax"
            no-espacios
            rango-numero
            
          />
    
          <field-messages name="edad" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="rango-numero" class="alert alert-danger mt-1">
              La edad minima es 18 años.
            </div>
             <div slot="rango-numero" class="alert alert-danger mt-1">
              La edad máxima es 120 años.
            </div>
            <div slot="no-espacios" class="alert alert-danger mt-1">
              Este campo no debe poseer espacios intermedios.
            </div>
           
          </field-messages>

          
        </validate>
        <br>
         <validate tag="div">

          <label for="email">Mail</label>
          <input 
            type="email"
            id="email"
            class="form-control"
            name="email"
            autocomplete="off"
            v-model.trim="formData.email" 
            required 
            no-espacios
            
          />
    
          <field-messages name="email" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="email" class="alert alert-danger mt-1">
              El formato ingresado no es valido.
            </div>
             <div slot="no-espacios" class="alert alert-danger mt-1">
              Este campo no debe poseer espacios intermedios.
            </div>
           
          </field-messages>

          
        </validate>
       <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">Enviar</button>
  
    
    <p><b>DATOS CARGADOS</b></p>

      <div class="table-responsive">
              <table class="table table-dark" v-if="obtenerPersonas.length" >
                  <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Email</th>
                  </tr>
                  <tr v-for="(usuario,index) in obtenerPersonas" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ usuario.nombre }}</td>
                      <td>{{ usuario.edad }}</td>
                      <td>{{ usuario.email }}</td>
                  </tr>
              </table>
              <div class="alert alert-danger mt-1" v-else>
                <p>No hay datos cargados</p>
              </div>
      </div>

   </vue-form>

    </div>
  </div>
  </section>

</template>

<script>


  export default  {
    components: {
  
  },
    name: 'src-components-formulario',
    props: [],
     beforeCreate(){
    this.$store.dispatch('getPersonas')
    },

    mounted () {
   // this.obtenerPersonas=this.$store.state.personas;
    this.nohay()
    },
    
    data () {
      return {
        formData : this.getInicialData(),
        formState : {},
        nombreMinLength : 5,
        nombreMaxLength : 15,
        url:this.$store.state.url,
        noHayItems:false,
       
      }
    },
    methods: {
      getInicialData() {
        return {
          nombre : "",
          edad: "",
          email: ""
        }
      },
      enviar() {
      /*this.obtenerListaPersonas()*/
      this.$store.dispatch("addPersonas",this.formData);
      console.log({...this.formData})
      this.formData = this.getInicialData()
      this.formState._reset()
      
      },
      
       
    },
    computed: {
    
     obtenerPersonas(){  
        return this.$store.state.personas
      }
      
    }
}


</script>

<style scoped lang="css">

.formulario{
  padding-top: 10px;
  
}
</style>
