<template>
    <div class="w-full h-[80px] shadow-lg mb-[20px] rounded p-2 overflow-hidden flex flex-row box-border">
        <div class="order-1 flex flex-col justify-center box-border overflow-hidden pt-[3px] mr-[20%]  w-[250px] h-full">
            <h3 class="text-black text-[1.1rem] mb-[6px] order-1">Total del abono: <span class="text-[#4866EB] ">{{datos_abonos.monto_abono}}</span></h3>
            <h3 class="order-2 overflow-hidden text-black max-w-[63char] text-[0.8rem] font-light">Fecha de registro: <span class=" text-[#A4A4A4] "> {{fecha_registro}}</span></h3>
        </div>

        <button @click="presentActionSheet()" class=" w-[60px] order-2 pl-[10px] items-center justify-center">
            <img class="w-[40px] h-[40px]" src="/optiones.png" alt="">
        </button>
    </div>
</template>
 
 
<script>

import { informationCircle,   pencil, trash, close } from 'ionicons/icons';
import { actionSheetController  } from '@ionic/vue';
export default {
    props:['datos_abonos'],
    mounted(){
      this.convertirFehca(this.datos_abonos.fecha_registro)
    },
    data(){
      return{
        fecha_registro:''
      }
    },
    methods: {
      convertirFehca(sqliteDate){
             // Verificar que la entrada es una cadena y cumple con el formato esperado
                const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (typeof sqliteDate !== 'string' || !regex.test(sqliteDate)) {
                    // Retornar null si la fecha no tiene el formato adecuado
                    return this.fecha_registro = sqliteDate ;
                }

                // Extraer la parte de la fecha y la hora
                const [date, time] = sqliteDate.split(' ');

                // Recortar los segundos de la hora
                const shortTime = time.slice(0, 5);

                // Formatear la fecha y la hora en el formato esperado por el input datetime-local
                const datetimeLocal = `${date}T${shortTime}`;

                this.fecha_registro = datetimeLocal;
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
