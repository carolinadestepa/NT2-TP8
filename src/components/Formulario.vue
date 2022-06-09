<template>

  <section class="src-components-formulario">
    
     <vue-form :state="formState" @submit.prevent="onSubmit()">
    
        
        <!--   Campo nombre + validaciones    -->
      
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
            :minlength="datoMinLength"
            :maxlength="datoMaxLength"
            no-espacios
          />
    
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{datoMinLength}} caracteres.</div>
             <div class="alert alert-danger mt-1" v-if="formData.nombre.length ===datoMaxLength">
             La cantidad maxima de caracteres es {{datoMaxLength}}.
              </div>

            <div slot="no-espacios" class="alert alert-danger mt-1">
              Este campo no debe poseer espacios intermedios.</div>
          </field-messages>
          
        </validate>

        <br>

        
        <!--  Campo apellido + validaciones   -->
       
        <validate tag="div">

          <label for="apellido">Apellido</label>
          <input 
            type="text"
            id="apellido"
            class="form-control"
            name="apellido"
            autocomplete="off"
            v-model.trim="formData.apellido" 
            required 
            :minlength="datoMinLength"
            :maxlength="datoMaxLength"
            no-espacios
          />
    
          <field-messages name="apellido" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{datoMinLength}} caracteres.</div>
             <div class="alert alert-danger mt-1" v-if="formData.apellido.length ===datoMaxLength">
             La cantidad maxima de caracteres es {{datoMaxLength}}.
              </div>

            <div slot="no-espacios" class="alert alert-danger mt-1">
              Este campo no debe poseer espacios intermedios.</div>
          </field-messages>
          
        </validate>
        <br>

        
        <!--    Campo nota + validaciones     -->
        
        <validate tag="div">

          <label for="nota">nota</label>
          <input 
            type="number"
            id="nota"
            class="form-control"
            name="nota"
            autocomplete="off"
            v-model.number="formData.nota" 
            required 
            rango-numero
            
          />
    
          <field-messages class="my-3" name="nota" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo obligatorio</div>
              <div slot="rango-numero" class="alert alert-danger mt-1">La nota debe ser mayor o igual a 0 y menor que  11</div>
            </field-messages>

        </validate>
        
        <br>

         <button class="btn btn-success my-3" :disabled="formState.$invalid" type="submit">Enviar</button>

      </vue-form>
      
      <hr>
      <!-- TABLA CON LOS ALUMNOS Y SUS NOTAS -->
	
    <h3 class="h3 my-3 badge-dark">Notas de Alumnos Ingresados</h3>

    <div v-if="alumnos.length" class="table-responsive">
      <table class="table table-info">
         <thead>
            <tr>
              <th scope="col">Alumno</th>
              <th scope="col">Nota</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(alumno,index) in alumnos" :key="index" :style="{ backgroundColor: calcularColor(alumno.nota), }">
              <td>{{alumno.nombre + " " + alumno.apellido}}</td>
              <td>{{alumno.nota}}</td>
            </tr>
          </tbody>
          <tr>
            <td :style="{ backgroundColor: calcularColor(calcularPromedio()), }">Promedio notas de los Alumnos: {{ calcularPromedio() }} </td>
            <td :style="{ backgroundColor: calcularColor(calcularPromedio()), }"></td>
          </tr>
      </table>
      </div> 
      <h4 v-else class="alert alert-danger">Sin notas ingresadas por el momento.</h4>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {

    },
    data () {
      return {
        formState : {},
         formData: {
          nombre: '',
          apellido: '',
          nota: ''
        },
        
        datoMinLength : 3,
        datoMaxLength: 15,
        alumnos: [],
        
      }
    },
    methods: {
           
      onSubmit() {
      
        this.alumnos.push({...this.formData});
        this.formData = this.limpiarFormulario();
        this.formState._reset();
      },

      limpiarFormulario(){
        return {
          nombre: '',
          apellido: '',
          nota: ''
        }
      },

      calcularColor(nota){
        let color = ''
        if( nota >= 7) {
          color= 'green'
        }else if ( nota<4){
          color = 'red'
        }else{
          color = 'yellow'
        }
        return color;
      },
      calcularPromedio(){
        let acumulado = 0;
        let index = 0;
        for (let i = 0; i < this.alumnos.length; i++) {
         acumulado += Number(this.alumnos[i].nota);
         index++;
        }
        return acumulado/index;
      }
      
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {

  }
</style>
