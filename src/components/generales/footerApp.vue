<template>
    <section  class="flex flex-row w-full h-[80px] fixed bg-white border-[1] border-[gray]  z-30">

      <div @click="()=> router.push(`/inicio`)" class="order-1 p-2 w-[25%] h-full flex flex-col items-center justify-center">
        <img class="order-1 mb-[8px] w-[30px] h-[30px]" src="/footer/inicioFooter.png" alt="">
        <h3 class="order-2 text-[#464646]">inicio</h3>
      </div>

      <div @click="()=> router.push(`/busquedad`)" class="order-2 p-2 w-[25%] h-full flex flex-col items-center justify-center">
        <img class="order-1 w-[30px] mb-[8px] h-[30px]" src="/footer/busquedaFooter.png" alt="">
        <h3 class="order-2 text-[#464646]">busqueda</h3>
      </div>

      <div @click="()=> router.push(`/clientes`)" class="order-3 p-2 w-[25%] h-full flex flex-col items-center justify-center">
        <img class="order-1 ml-[4px] mb-[8px] w-[30px] h-[30px]" src="/footer/clientesFooter.png" alt="">
        <h3 class="order-2 text-[#464646]">clientes</h3>
      </div>

      <div @click="()=> router.push(`/abonos`)" class="order-4 p-2 w-[25%] h-full flex flex-col items-center justify-center">
        <img class="order-1 ml-[4px] mb-[8px] w-[30px] h-[30px]" src="/footer/abonosFooter.png" alt="">
        <h3 class="order-2 text-[#464646]">abonos</h3>
      </div>
    </section>
  </template>
  
<script >
import { useRouter } from 'vue-router';
export default{
  mounted(){
    //desplazar 5 vh el menu para compensar en las vistas que no tienen buscador en el header
    if(this.desplazamiento){
      document.querySelector("section").style.marginTop = "72vh";
    }
  },
  props:{
    desplazamiento:{
      type:Boolean,
      default:false
    }
  },
  setup() {
      const router = useRouter();
      return { router };
    },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

h3{
    font-family: "Poppins", sans-serif;
}

section{
    margin-top: 67vh;
    border-top-right-radius:15px ;
    border-top-left-radius: 15px;
    -webkit-box-shadow: -3px -6px 40px -16px rgba(0, 0, 0, 0.445);
    -moz-box-shadow: -3px -6px 40px -16px rgba(0,0,0,0.445);
    box-shadow: -3px -6px 40px -16px rgba(0,0,0,0.445);
}

.btn:active{
    transition: ease 500ms;
    padding-bottom: 5px;
    border-bottom: 3px solid #FF7850;
}

</style>