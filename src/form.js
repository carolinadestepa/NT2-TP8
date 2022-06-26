import Vue from 'vue'
import VueForm from 'vue-form'

const options = {

    validators: {
      "no-espacios": function(value) {
        return !value.includes(" ");
      },
      
      'rango-numero': function(value){
        if( value>=18 && value<=120) {
            return true;
        }
    },
  
    },
  };


Vue.use(VueForm, options);