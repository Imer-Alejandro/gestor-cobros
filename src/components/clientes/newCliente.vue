<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[15px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Nuevo cliente</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <form @submit.prevent="registrarCliente()" class="p-2" >

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
                        <label class="text-[#A4A4A4]">Dirección  del cliente - (optional) </label>
                        <input v-model="cliente.direccion" maxlength="220" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="text">
                    </div>

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Comentario del cliente - (optional) </label>
                        <textarea v-model="cliente.comentario" maxlength="150"  class="w-full outline-none resize-none text-black p-2 h-[50px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <button  class="w-full  text-[1.4rem] h-[80px] bg-[#4866EB] rounded-sm shadow-sm">Registrar cliente</button>
                </form>
            </div>
        </section>
</template>

<script>
import {insertarCliente} from '../../servicioDB/clienteOperacion'
import {alertController  } from '@ionic/vue'


export default {
    data(){
        return{
            cliente:{
                nombre: '',
                telefono:'',
                cedula:'',
                direccion:'',
                comentario:'',
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
            this.$emit("closeNewCliente")
        },
        async registrarCliente(){
            try {
                await insertarCliente(this.cliente);
                this.mostrarAlerta("cliente registrado!","se registro el cliente correctamente")
            } catch (error) {
                this.mostrarAlerta("error al registrar cliente!","no se registro el cliente debido a un error")
                console.error('Error al registrar cliente:', error);
                
            }finally {
                //actualizar componente padre
                this.$emit('actualizarClientes')
                //cerrar componente
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