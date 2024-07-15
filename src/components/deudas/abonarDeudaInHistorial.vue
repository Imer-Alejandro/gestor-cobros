
<template> 
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-full h-[70vh] mt-[30vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Abonar deuda</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <form @submit.prevent="registrar_abono()" class="p-2" >

                    <div class="mb-[50px]">
                        <label class="text-[#A4A4A4]">Monto del abono<span class="text-[#E81624]"> *</span> </label>
                        <input v-model="datos_abono.monto_abono" required class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"  step="any"  type="number">
                    </div>

                    <div class="mb-[50px]">
                        <label class="text-[#A4A4A4]">Comentario del abono - (optional)</label>
                        <textarea v-model="datos_abono.comentario_abono"  maxlength="150"  class="w-full outline-none resize-none text-black p-2 h-[100px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <button class="w-full  text-[1.4rem] h-[80px] bg-[#4866EB] rounded-sm shadow-sm">Registrar abono</button>
                </form>
            </div>
        </section>
</template>

<script>
import {alertController  } from '@ionic/vue'
import {registrarAbono} from '../../servicioDB/abonoOperacion'

export default {
    props:['deuda_operacion'],
    data(){
        return{
            datos_abono:{
                monto_abono:'',
                id_deuda:this.deuda_operacion.id_deuda,
                id_cliente:this.deuda_operacion.id_cliente, 
                comentario_abono:''
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
            this.$emit("closeAbonarDeudaDesdeHistorial")
        },
        async mostrarAlerta(header, message) {
            const alert = await alertController.create({
                header: header,
                message: message,
                buttons: ['OK']
            });
            await alert.present();
        },
        async registrar_abono(){
            if (this.datos_abono > this.deuda_operacion.monto_pendiente) {
                this.mostrarAlerta("error","el monto del abono no puede ser mayor al monto pendiente")
            }else{
                try {
                    await registrarAbono(this.datos_abono)
                    this.mostrarAlerta("abono registrado!","se registro el abono correctamente")
                    this.$emit('actualizarClientes')
                } catch (error) {
                    console.error("error al registrar el abono",error)
                    this.mostrarAlerta("error al registrar el abono","no se pudo registrar el abono ")

                }finally{
                    this.close()
                }
            }
                
        }
    }
}
</script>