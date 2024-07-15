<template> 
    <section class="w-full justify-center items-center h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-[90%] h-[30vh]  pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Eliminar deuda</h3>
                    <button @click="close()" class="order-2 ml-[70%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

            <section class="flex flex-col w-full text-center ">
                <h3 class="text-black order-1 mb-[40px]">Si se elimina la deuda también se borrara los abonos y registros de esta, ¿esta seguro?</h3>
                <div class="order-2 flex flex-row  justify-center ">
                    <button @click="close()" class="order-1 h-[40px] rounded-sm w-[40%] mr-[10%] border-black border    bg-slate-100  text-black">cancelar</button>
                    <button @click="eliminar_deuda()" class="order-2 h-[40px] rounded-sm w-[40%] bg-[#E63B52]">eliminar</button>
                </div>
            </section>
               
            </div>
        </section>
</template>

<script>
import {eliminarDeuda} from '../../servicioDB/deudaOperacion'
import {alertController  } from '@ionic/vue'

export default {
    props:['deuda_operacion'],
    data(){
        return{
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
            this.$emit("closeEliminarDeuda")
        },
        async eliminar_deuda(){
            if (this.deuda_operacion.monto_pendiente == 0) {
                try {
                    await eliminarDeuda(this.deuda_operacion.id_deuda)
                    this.mostrarAlerta("deuda eliminada","se elimino la deuda correctamente!")
                } catch (error) {
                    this.mostrarAlerta("Error al eliminar deuda","ocurrio un error al eliminar la deuda, intentelo otra vez!")
                    console.error("error al eliminar la deuda",error)
                } finally{
                    this.close()
                    this.$emit("actualizarClientes")
                }
            }else{
                this.mostrarAlerta("No se puede eliminar esta deuda!","esta deuda aun tiene un balance pendiente no se puede eliminar")
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