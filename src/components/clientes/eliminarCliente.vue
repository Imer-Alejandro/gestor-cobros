<template> 
    <section class="w-full justify-center items-center h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-[90%] h-[30vh]  pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Eliminar cliente</h3>
                    <button @click="close()" class="order-2 ml-[70%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

            <section class="flex flex-col w-full text-center ">
                <h3 class="text-black order-1 mb-[40px]">Si se elimina el cliente también se borran los abonos registrados de este, ¿esta seguro?</h3>
                <div class="order-2 flex flex-row  justify-center ">
                    <button @click="close()" class="order-1 h-[40px] rounded-sm w-[40%] mr-[10%] border-black border    bg-slate-100  text-black">cancelar</button>
                    <button @click="this.eliminar()" class="order-2 h-[40px] rounded-sm w-[40%] bg-[#E63B52]">eliminar</button>
                </div>
            </section>
               
            </div>
        </section>
</template>

<script>
import { eliminarCliente } from '../../servicioDB/clienteOperacion'
import {alertController  } from '@ionic/vue'

export default {
    props:['cliente_operacion'],
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
            this.$emit("closeEliminarCliente")
        },
        async eliminar(){
            try {
                await eliminarCliente(this.cliente_operacion.id);
                this.mostrarAlerta("Cliente eliminado!","se elimino el cliente del registro")
            } catch (error) {
                this.mostrarAlerta("Error al registrar el cliente !","Ocurrio un error al eliminar el cliente intentelo otra vez")

            }finally {
                this.$emit('actualizarClientes')
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