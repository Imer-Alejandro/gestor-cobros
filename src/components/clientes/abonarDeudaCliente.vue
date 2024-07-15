<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">
         
        <selectDeuda @asignarDeuda="asignarDeuda" :id_cliente="datos_abono.id_cliente" v-if="Vs_selectDeuda" @closeSelectDeuda="Vs_selectDeuda = false"/>
        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Nuevo abono</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <form @submit.prevent="registrar_abono()" class="p-2" >

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Monto del abono <span class="text-[#E81624]"> *</span></label>
                        <input v-model="datos_abono.monto_abono" class="w-full outline-none text-black pl-2 h-[45px] bg-[#ECECEC] rounded-sm" required step="any" type="number">
                    </div>

                    <div class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Comentario del abono - (optional) </label>
                        <textarea v-model="datos_abono.comentario_abono" maxlength="150"  class="w-full outline-none resize-none text-black p-2 h-[90px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <div  class="mb-[20px]">
                        <label class="text-[#A4A4A4]">Indique la deuda del abono <span class="text-[#E81624]"> *</span></label>
                        <div v-if="Vs_deudaIndicada" style=" box-shadow: 0 0.3rem #dfd9d9;" class="w-full flex flex-row items-center p-2 h-[80px] bg-[#eee] rounded-sm">
                            <div class="order-1 justify-center box-border overflow-hidden  bg-white w-full h-full rounded p-2 flex flex-col">
                                <h3 class="text-black mb-[3px]">Total deduda: <span class="text-[#4866EB]">{{datos_abono.monto_deuda}}</span></h3>
                                <h3 class="text-[#A4A4A4] text-[0.8rem] w-[40char] font-light order-2">{{datos_abono.comentario_deuda}}</h3>
                            </div>

                            <div @click="eliminarDeudaAsignado()" class="order-2 h-full w-[40px] pl-2 flex items-center justify-center">
                                <img class="w-[20px] h-[20px]" src="/cerrar.png">
                            </div>
                        </div>

                        <div v-if="Vs_selector_deuda" @click="Vs_selectDeuda = true" style=" box-shadow: 0 0.3rem #dfd9d9;" class="w-full flex items-center pl-2 h-[80px] bg-[#eee] rounded-sm">
                            <h4 class="text-black text-[1rem]">Ninguna deuda indicada...</h4>
                        </div>
                    </div>

                    <button class="w-full mt-[20px] text-[1.4rem] h-[80px] bg-[#4866EB] rounded-sm shadow-sm">Registrar abono</button>
                </form>
            </div>
        </section> 
</template>

<script>
import selectDeuda from '../generales/selectDeuda.vue';
import {alertController  } from '@ionic/vue'
import {registrarAbono} from '../../servicioDB/abonoOperacion'

export default {
    props:['cliente_operacion'],
    data(){
        return{
            Vs_selectDeuda:false,

            Vs_selector_deuda:true,
            Vs_deudaIndicada:false,

            datos_abono:{
                monto_abono:'',
                id_deuda:0,
                monto_deuda:0,
                comentario_cliente:this.cliente_operacion.comentario,
                comentario_deuda:'',
                nombre_cliente:this.cliente_operacion.nombre,
                id_cliente:this.cliente_operacion.id, 
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
    components:{
        selectDeuda,
    },
    methods:{
        close(){
            this.$emit('closeAbonarCliente');
        },
        asignarDeuda(deuda){
            this.datos_abono.id_deuda=deuda.id_deuda;
            this.datos_abono.comentario_deuda = deuda.detalles_deuda;
            this.datos_abono.monto_deuda= deuda.monto_deuda;

            this.Vs_deudaIndicada =true
            this.Vs_selector_deuda = false

        }, 
        eliminarDeudaAsignado(){
            this.datos_abono.id_deuda= 0;
            this.datos_abono.comentario_deuda = ''
            this.datos_abono.monto_deuda=0;

            this.Vs_deudaIndicada =false
            this.Vs_selector_deuda = true
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
            if (this.datos_abono.id_deuda == 0) {
               this.mostrarAlerta("Indique una deuda!", " para registrar el abono indique la deuda") 
            }else{
                if (this.datos_abono.monto_abono <= this.datos_abono.monto_deuda) {
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
                }else{
                    this.mostrarAlerta("error","el monto del abono no puede ser mayor al monto pendiente")
                }
                
            }
        }
    }
    
}
</script>