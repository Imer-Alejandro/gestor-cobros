<template> 
    <section class="w-full justify-center items-center h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-[90%] h-[30vh]  pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Eliminar recordatorio</h3>
                    <button @click="close()" class="order-2 ml-[75%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

            <section class="flex flex-col w-full text-center ">
                <h3 class="text-black order-1 mb-[40px]">Desea eliminar el recordatorio de cobro de este cliente, ¿esta seguro?</h3>
                <div class="order-2 flex flex-row  justify-center ">
                    <button @click="close()" class="order-1 h-[40px] rounded-sm w-[40%] mr-[10%] border-black border    bg-slate-100  text-black">cancelar</button>
                    <button @click="eliminarRecordatorio()" class="order-2 h-[40px] rounded-sm w-[40%] bg-[#E63B52]">eliminar</button>
                </div>
            </section>
               
            </div>
        </section> 
</template>

<script>
import {alertController  } from '@ionic/vue'
import {eliminarRecordatorioCobro} from '../../servicioDB/clienteOperacion'
export default {
    props:['cliente_operacion'],
    data(){
        return{
            cliente:{
                id:this.cliente_operacion.id,
                recordatorio:'recordatorio desactivado'
            },
            alerta: {
                isOpen: false,
                header: '',
                message: '',
                buttons: ['OK']
            }
        }
    },
    methods:{
        close(){
            this.$emit("closeEliminarRecordatorio")
        },

        async eliminarRecordatorio(){
            try {
                await eliminarRecordatorioCobro(this.cliente)
                this.mostrarAlerta("Se elimino el recordatorio!","se elimino el recordatio de cobro del cliente")
            } catch (error) {
                this.mostrarAlerta("error al eliminar!","ocurrio un error al eliminar el recordatiro de cobro")
                console.error("error al cambiar estado del recordatorio del cliente", error)
            }finally{
                this.$emit("actualizarVista")
                this.$emit("eliminar_cliente",this.cliente.id)
                this.close()
            }
        },
        async mostrarAlerta(header, message) {
            const alert = await alertController.create({
                header: header,
                message: message,
                buttons: ['OK']
            });
            await alert.present();
        },
    }
}
</script>