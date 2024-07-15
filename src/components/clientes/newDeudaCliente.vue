<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">
        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Nueva deuda</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <form @submit.prevent="registrar_deuda()" class="p-2" >
 
                    <div class="mb-[30px]">
                        <label class="text-[#A4A4A4]">Monto de la deuda <span class="text-[#E81624]"> *</span></label>
                        <input v-model="datos_deuda.monto" class="w-full outline-none text-black pl-2 h-[45px] bg-[#ECECEC] rounded-sm" required step="any" type="number">
                    </div>


                    <div class="mb-[30px]">
                        <label class="text-[#A4A4A4]">Detalles de la deuda <span class="text-[#E81624]"> *</span></label>
                        <textarea v-model="datos_deuda.detalle_deuda" maxlength="820" required class="w-full outline-none resize-none text-black p-2 h-[200px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>


                    <button class="w-full mt-[20px] text-[1.4rem] h-[80px] bg-[#E81624] rounded-sm shadow-sm">Registrar deuda</button>
                </form>
            </div>
        </section> 
</template>

<script>
import {alertController  } from '@ionic/vue'
import {registroDeuda} from '../../servicioDB/deudaOperacion'
export default {
    props:['cliente_operacion'],
    data(){
        return{
            datos_deuda:{
                monto:'',
                cliente:{
                    id:this.cliente_operacion.id,
                    nombre:this.cliente_operacion.nombre,
                    comentario:this.cliente_operacion.comentario,
                },
                detalle_deuda:'',
                estado:'pendiente',
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
            this.$emit('closeNewDeudaCliente');
        },
        async registrar_deuda(){
                try {
                    await registroDeuda(this.datos_deuda)
                    this.mostrarAlerta("Deuda registrada!","se registro la deuda correctamente!")
                    this.$emit('actualizarClientes')
                } catch (error) {
                    this.mostrarAlerta("error","no se pudo registrar la deuda!")
                    console.error('Error al registrar la deuda:', error);
                   
                }finally{
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
        }
        
    }
}
</script>