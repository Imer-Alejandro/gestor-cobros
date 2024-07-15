<template> 
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[15px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Editar cliente</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <form @submit.prevent="editarCliente()" class="p-2" >

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Nombre del cliente <span class="text-[#E81624]"> *</span></label>
                        <input v-model="cliente.nombre" minlength="4" maxlength="50" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm" required  type="text">
                    </div>

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Telefono del cliente</label>
                        <input v-model="cliente.telefono" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="tel">
                    </div>

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Cedula del cliente</label>
                        <input v-model="cliente.cedula" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="text">
                    </div>

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Dirección  del cliente - (optional)</label>
                        <input v-model="cliente.direccion" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="text">
                    </div>

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Comentario del cliente - (optional) </label>
                        <textarea v-model="cliente.comentario" maxlength="150"  class="w-full outline-none resize-none text-black p-2 h-[70px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <button class="w-full  text-[1.4rem] h-[80px] bg-[#32D53D] rounded-sm shadow-sm">Guardar cambios</button>
                </form>
            </div>
        </section>
</template>

<script>
import {editarCliente} from '../../servicioDB/clienteOperacion'
import {alertController  } from '@ionic/vue'

export default {
    props:['cliente_operacion'],
    data(){
        return{
            cliente:{
                nombre: this.cliente_operacion.nombre,
                telefono: this.cliente_operacion.telefono,
                cedula: this.cliente_operacion.cedula,
                direccion: this.cliente_operacion.direccion,
                comentario: this.cliente_operacion.comentario,
                id: this.cliente_operacion.id,
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
            this.$emit("closeEditarCliente")
        },
        async editarCliente(){
            try {
                await editarCliente(this.cliente)
                this.mostrarAlerta("Cliente actualizado!","se actualizo el cliente correctamente")
            } catch (error) {
                this.mostrarAlerta("Error al actualizar el cliente","Ocurrio un error al editar el cliente")
            } finally{
                this.$emit('actualizarClientes')
                this.close();

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