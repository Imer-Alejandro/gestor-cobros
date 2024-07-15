<template>
    <div class="w-full p-2 h-[80px] shadow-lg mb-[20px] bg-white rounded-sm  flex flex-row ">
        <div class="order-1 flex flex-col w-[320px]  justify-center">
            <h3 class="order-1 text-neutral-800 mb-[8px] ">{{ nombre_cliente}}</h3>
            <h3 class="text-[#464646] font-light  order-2">Monto abonado: <span class="text-[#4866EB]">{{datos_abono.monto_abono}}</span></h3>
        </div>
        <button @click="presentActionSheet()" class="h-full order-2 w-[60px]  flex ml-[10px] items-center justify-center">
            <img class="w-[40px] h-[40px]" src="/optiones.png" alt="">
        </button>
    </div>
</template> 
  
<script> 
import {obtenerClienteAbono} from '../../servicioDB/abonoOperacion'
import { informationCircle,   pencil, trash, close } from 'ionicons/icons';
import { actionSheetController  } from '@ionic/vue';
export default {
  props:['datos_abono'],
  mounted(){
    this.obtenerClienteAbono()
  },
  data(){
    return{
      nombre_cliente:''
    }
  },
    methods: {

      async obtenerClienteAbono(){
        try {
          const result = await obtenerClienteAbono(this.datos_abono.id_deuda)
          this.nombre_cliente = result.nombre
        } catch (error) {
          console.error("error al obtener el cliente del abono",error) 
        }
      },
      
    async presentActionSheet() {
      const actionSheet = await actionSheetController.create({
        header: 'Opciones del abono',
        buttons: [
          {
            text: 'Ver detalles',
            icon : informationCircle,
            handler: () => {
                this.$emit("openDetalleAbono")
            },
          },
          {
            text: 'Editar abono',
            icon: pencil,
            handler: () => {
                this.$emit("openEditarAbono")
            },
          },
          {
            text: 'Eliminar abono',
            icon: trash,
            role: 'destructive',
            handler: () => {
                this.$emit('openEliminarAbono');
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
