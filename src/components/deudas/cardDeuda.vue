<template> 
    <div class="w-full h-[80px] shadow-lg mb-[20px] rounded p-2 overflow-hidden flex flex-row box-border">
        <div class="order-2 flex mr-[8px] pr-[8px] border-r-[#D9D9D9] border-r-[1.5px] items-center justify-center">
            <button @click="abonarDeuda()" class=" w-[70px] rounded bg-[#32D53D] flex items-center justify-center h-[60px]">
                <img class="w-[35px] h-[35px]" src="/menu/newAbono.png" alt="">
            </button>
        </div>

        <div class="order-2 flex flex-col justify-center box-border overflow-hidden pt-[3px] w-[250px] h-full">
            <h3 class="text-black text-[1rem] mb-[6px] order-1">Total de la deuda: <span class="text-[#E52B37] text-[0.9rem] font-light ">{{dato_deuda.monto_pendiente}}</span></h3>
            <h3 class="order-2 text-[#A4A4A4] overflow-hidden  max-w-[63char] text-[0.8rem] font-light">{{dato_deuda.detalles_deuda }}</h3>
        </div>

        <button @click="presentActionSheet()" class="order-3 w-[60px] h-full pl-[10px] items-center justify-center">
            <img class="w-[40px] h-[40px]" src="/optiones.png" alt="">
        </button>
    </div>
</template>


<script>
import { informationCircle, cash,  pencil, documentText, trash, close } from 'ionicons/icons';
import { actionSheetController  } from '@ionic/vue';
export default {
  props:['dato_deuda'],
    methods: {
      abonarDeuda(){
        this.$emit("openAbonarDeudaDesdeHistorialCliente")
      },
    async presentActionSheet() {
      const actionSheet = await actionSheetController.create({
        header: 'Opciones de la deuda',
        buttons: [
          {
            text: 'Ver detalles',
            icon : informationCircle,
            handler: () => {
              this.$emit("openDetalleDeuda")
            },
          },
          {
            text: 'Abonar deuda',
            icon: cash,
            handler: () => {
              this.$emit("openAbonarDeudaDesdeHistorialCliente")
            },
          },
          {
            text: 'Editar deuda',
            icon: pencil,
            handler: () => {
              this.$emit("openEditarDeuda")
            },
          },
          {
            text: 'Historial de abonos',
            icon: documentText,
            handler: () => {
              this.$emit("openHistorialAbonos")
            },
          },
          {
            text: 'Eliminar deuda',
            icon: trash,
            role: 'destructive',
            handler: () => {
              this.$emit("openEliminarDeuda")
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
