<template>
    <div>
      <header class="w-full   bg-[#4866EB] pb-[15px] ">
        <div v-show="menuLateral" class="w-full h-full z-50 fixed flex flex-row bg-[#0a0e3480]">
          
          <div class="w-[70%] order-1 p-2 h-[100%] bg-white overflow-hidden">
             <header class="flex items-center mb-[25px] flex-row">
              <img class="order-1 w-[35px] h-[35px] mr-[8px]" src="/logoApp.png" alt="">
              <h2 class="order-2 text-[1.5rem] text-black">Gestor de cobros</h2>
             </header>

            

            <div class=" w-[100%] border-t-[#EFEEEE]  pt-[10px] border-t-2 mt-[20px]">

              <ul class="w-[100%] flex flex-col">

                <li @click="changePage('inicio')" class="w-[100%] h-[75px] flex items-center pl-3  ">
                  <img class="order-1 w-[30px] h-[30px] mr-[15px]" src="/menu/hogar.png" alt="">
                  <h3 class="order-2 text-[1.4rem] mt-[4px] text-[#080E63]">Inicio</h3>
                </li>

                <li @click="changePage('busquedad')" class="w-[100%] h-[75px] flex items-center pl-3 " >
                  <img class="order-1 w-[30px] h-[30px] mr-[15px]" src="/menu/busqueda.png" >
                  <h3 class="order-2 text-[1.4rem] mt-[4px] text-[#080E63]">Busqueda</h3>
                </li>

                <li @click="changePage('clientes')" class="w-[100%] h-[75px] flex items-center pl-3 ">
                  <img class="order-1 w-[30px] h-[30px] mr-[15px]" src="/menu/usuario.png" >
                  <h3 class="order-2 text-[1.4rem] mt-[4px] text-[#080E63]" >Clientes</h3>
                </li>

                <li @click="changePage('abonos')" class="w-[100%] h-[75px] flex items-center pl-3 ">
                  <img class="order-1 w-[30px] h-[30px] mr-[15px]" src="/menu/abonos.png">
                  <h3  class="order-2 text-[1.4rem] mt-[4px] text-[#080E63]" >Abonos</h3>
                </li>

                <li @click="changePage('ajustes')" class="w-[100%] h-[75px] flex items-center pl-3 ">
                  <img  class="order-1 w-[30px] h-[30px] mr-[15px]" src="/menu/ajustes.png" >
                  <h3 class="order-2 text-[1.4rem] mt-[4px] text-[#080E63]">Ajustes</h3>
                </li>

              </ul>
            </div>
            
            <div class=" w-[100%] border-t-[#EFEEEE]  pt-[50px] border-t-2 mt-[10px]">
              <ul>
                <li @click="openNewAbono()" class="w-[100%] h-[50px] flex items-center pl-3 mb-[20px] ">
                  <h3 class="order-1 text-[1rem] mr-[40px] text-black">Registrar abono</h3>
                  <button class="order-2 rounded-md bg-[#4866EB] outline-none w-[40px] h-[40px] flex justify-center items-center">
                    <img class="w-[30px] h-[30px]" src="/menu/newAbono.png">
                  </button>
                </li>

                <li @click="openNewCliente()" class="w-[100%] h-[50px] flex items-center pl-3 ">
                  <h3 class="order-1 text-[1rem] text-black mr-[40px]">Registrar cliente</h3>
                  <button class="order-2 rounded-md bg-[#4866EB] outline-none w-[40px] h-[40px] flex justify-center items-center">
                    <img class="w-[30px] h-[30px]" src="/menu/newCliente.png" alt="">
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div @click="openAndCloseMenu" class=" order-2 w-[30%] h-[100%]  "></div>
        </div>
        
        <div class=" pt-3 p-2">
          <div class="flex flex-row w-full mb-[20px]">
          <div class=" order-1  w-[200px] overflow-hidden pl-1 flex items-center mr-[100px]">
            <h2 class="text-[1.3rem]">{{name}}</h2>
          </div>
          <div class="order-2  flex flex-row">
            <img @click="openAndCloseMenu" class="w-[35px] h-[35px] ml-[100%]" src="/menu.png" alt="">
          </div>
        </div> 

        <form v-if="visibilidadBusquedad == true" class="flex flex-row" @submit.prevent="buscarCliente()" >
          <input  v-model="nombreBusqueda" required class="h-[40px] order-1 pl-2 outline-none bg-[#f5f5f5]  text-black rounded-sm border-0 w-full" type="text" placeholder="buscar clientes por nombre...">
          <button class="order-2 h-[40px]  bg-[#f5f5f5] w-[50px] flex justify-center items-center">
            <img class="w-[25px] h-[25px]" src="/lupa.png">
          </button>
        </form>

        </div>
      </header>
    </div>
</template>
  
<script>
import { alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { clientesRecordatorioCobro, buscarClienteNombre } from '../../servicioDB/clienteOperacion';

export default {
  props: {
    name: {
      require: true,
      type: String,
    },
    visibilidadBusquedad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      listadoCliente: [],
      menuLateral: false,
      nombreBusqueda: '',
      alerta: {
        isOpen: false,
        header: '',
        message: '',
        buttons: ['OK'],
      },
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    openAndCloseMenu() {
      this.menuLateral = !this.menuLateral;
    },
    changePage(page) {
      this.router.push(`/${page}`);
      this.menuLateral = false;
    },
    async buscarCliente() {
      try {
        const listadoCliente = await buscarClienteNombre(this.nombreBusqueda);

        if (listadoCliente && listadoCliente.length > 0) {
          this.$emit('openResultBusqueda', listadoCliente, this.nombreBusqueda);
          this.nombreBusqueda = '';
          this.openAndCloseMenu();
        } else {
          this.mostrarAlerta('Búsqueda de Clientes', 'No se encontraron clientes con ese nombre');
        }
      } catch (error) {
        console.error('Error al buscar cliente:', error);
        this.mostrarAlerta('Error', 'Error al buscar cliente');
        this.$emit('openResultBusquedaError', error);
      }
    },
    async mostrarAlerta(header, message) {
      const alert = await alertController.create({
        header,
        message,
        buttons: ['OK'],
      });
      await alert.present();
    },
    openNewAbono() {
      this.$emit('openNewAbono');
      this.openAndCloseMenu();
    },
    openNewCliente() {
      this.$emit('openNewCliente');
      this.openAndCloseMenu();
    },
  },
  beforeRouteEnter(to, from, next) {
    // Hacer la petición antes de que el componente se monte
    clientesRecordatorioCobro().then(listadoCliente => {
      next(vm => {
        vm.listadoCliente = listadoCliente;
        console.log(vm.listadoCliente);
      });
    }).catch(error => {
      console.log('error al obtener los clientes', error);
      next();
    });
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");
h3,h2{
    font-family: "Poppins", sans-serif;
}
</style>