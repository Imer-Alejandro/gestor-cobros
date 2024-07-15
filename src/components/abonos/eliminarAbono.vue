<template> 
    <section class="w-full justify-center items-center h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-[90%] h-[30vh]  pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Eliminar abono</h3>
                    <button @click="close()" class="order-2 ml-[70%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

            <section class="flex flex-col w-full text-center ">
                <h3 class="text-black order-1 mb-[40px]">Si se elimina el abono también se eliminara el registro de este, ¿esta seguro?</h3>
                <div class="order-2 flex flex-row  justify-center ">
                    <button @click="close()" class="order-1 h-[40px] rounded-sm w-[40%] mr-[10%] border-black border    bg-slate-100  text-black">cancelar</button>
                    <button @click="eliminarAbono()" class="order-2 h-[40px] rounded-sm w-[40%] bg-[#E63B52]">eliminar</button>
                </div>
            </section>
               
            </div>
        </section> 
</template>

<script>
import {alertController  } from '@ionic/vue'

import {eliminarAbonos } from '../../servicioDB/abonoOperacion'
export default {
    props:['abono_operacion','monto_deuda'],
    data(){
        return{
            datos_abono:{
                id_abono:this.abono_operacion.id_abono,
                id_deuda:this.abono_operacion.id_deuda,
                monto:this.abono_operacion.monto_abono,
                monto_deuda: this.monto_deuda
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
            this.$emit("closeEliminarAbono")
        },
        async eliminarAbono(){
            try {
                await eliminarAbonos(this.datos_abono)
                this.mostrarAlerta("abono eliminado!")
            } catch (error) {
                this.mostrarAlerta("error al eliminar el abono","intente otra vez")
                console.error("error al eliminar abono",error)
            }finally{
                this.$emit("actualizarAbonos")
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