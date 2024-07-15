<template>
    <div class="w-full h-[80px] shadow-lg mb-[20px] rounded-sm  flex flex-row ">
        <div class="bg-[#4866EB] order-1 h-full w-[17%] p-2 rounded-sm flex flex-col items-center  ">
            <span class="mb-[5px]">Deudas</span>
                <h3>{{ listadoDeuda.length }}</h3>
        </div>
        <div class="w-full  h-full flex flex-row order-2 p-2">
            <div class="h-full order-1 w-[250px] overflow-hidden flex flex-col">
                <h3 class="text-black order-1 mb-[8px]">{{datosCliente.nombre}}</h3>
                <h3 class="text-[#464646] font-light  order-2">Total de la deuda: <span class=" text-[#4866EB] ">{{ datosCliente.deuda_general }}</span></h3>
            </div>
            <button @click="presentActionSheet()" class="h-full order-2 w-[60px]  flex  items-center justify-center">
                <img class="w-[40px] h-[40px]" src="/optiones.png" alt="">
            </button>
        </div>
    </div>
</template>
 
<script>
import { informationCircle, cash, addCircle, pencil, documentText, trash, close } from 'ionicons/icons';
import { actionSheetController  } from '@ionic/vue';
import {obtenerDeudasCliente} from '../../servicioDB/deudaOperacion';

export default {
  props:['datosCliente'],
  mounted(){
    this.obtenerDeudas();
  },
  data(){
    return{
      listadoDeuda:[]
    }
  },
    methods: {
    async obtenerDeudas(){
      try {
        this.listadoDeuda = await obtenerDeudasCliente(this.datosCliente.id)

      } catch (error) {
        console.error("error al obtener el listado de las deuda del cliente")
      }
    },
    
    async presentActionSheet() {
      const actionSheet = await actionSheetController.create({
        header: 'Opciones del cliente',
        buttons: [
          {
            text: 'Ver detalles',
            icon : informationCircle,
            handler: () => {
              this.$emit("OpenDetalleCliente")
            },
          },
          {
            text: 'Abonar deudas',
            icon: cash,
            handler: () => {
              this.$emit("openAbonarCliente")
            },
          },
          {
            text: 'Registrar deuda',
            icon: addCircle,
            handler: () => {
              this.$emit("openNewDeudaCliente")
            },
          },
          {
            text: 'Editar cliente',
            icon: pencil,
            handler: () => {
              this.$emit("openEditarCliente")
            },
          },
          {
            text: 'Historial de deudas',
            icon: documentText,
            handler: () => {
              this.$emit("openHistorialCliente")
            },
          },
          {
            text: 'Eliminar cliente',
            icon: trash,
            role: 'destructive',
            handler: () => {
              this.$emit("openEliminarCliente")
            },
          },
          {
            text: 'Cancelar',
            icon: close ,
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
            },
          },
        ],
      });

      await actionSheet.present();
    },
  },
}
</script>

