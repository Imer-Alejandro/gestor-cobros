<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <selectCliente @asignarCliente="asignarCliente" v-if="Vs_selectCliente" @closeSelectCliente="Vs_selectCliente = false" />
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
                        <label class="text-[#A4A4A4]">Indique el cliente <span class="text-[#E81624]"> *</span></label>
                        <div v-if="Vs_clienteIndicado" style=" box-shadow: 0 0.3rem #dfd9d9;" class="w-full flex flex-row items-center p-2 h-[80px] bg-[#eee] rounded-sm">
                            <div class="order-1 justify-center box-border overflow-hidden  bg-white w-full h-full rounded p-2 flex flex-col">
                                <h3 class="text-black mb-[3px]">{{datos_deuda.cliente.nombre}}</h3>
                                <h3 class="text-[#A4A4A4] text-[0.8rem] w-[40char] font-light order-2">{{datos_deuda.cliente.comentario}}</h3>
                            </div>

                            <div @click="eliminarClienteAsignado()" class="order-2 h-full w-[40px] pl-2 flex items-center justify-center">
                                <img class="w-[20px] h-[20px]" src="/cerrar.png">
                            </div>
                        </div>

                        <div v-if="Vs_selector_cliente" @click="Vs_selectCliente = true" style=" box-shadow: 0 0.3rem #dfd9d9;" class="w-full flex items-center pl-2 h-[80px] bg-[#eee] rounded-sm">
                            <h4 class="text-black text-[1rem]">Ningun cliente indicado...</h4>
                        </div>
                    </div>

                    <div class="mb-[30px]">
                        <label class="text-[#A4A4A4]">Detalles de la deuda <span class="text-[#E81624]"> *</span></label>
                        <textarea v-model="datos_deuda.detalle_deuda" maxlength="820" required class="w-full outline-none resize-none text-black p-2 h-[150px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>


                    <button class="w-full mt-[20px] text-[1.4rem] h-[80px] bg-[#E81624] rounded-sm shadow-sm">Registrar deuda</button>
                </form>
            </div>
        </section>
</template> 

<script>
import {alertController  } from '@ionic/vue'
import {registroDeuda} from '../../servicioDB/deudaOperacion'
import selectCliente from '../generales/selectCliente.vue'
export default {
    data(){
        return{
            Vs_selectCliente: false,

            Vs_clienteIndicado:false,
            Vs_selector_cliente:true,

            datos_deuda:{
                monto:'',
                cliente:{
                    id:0,
                    nombre:"",
                    comentario:'',
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
    components:{
        selectCliente,

    },
    methods:{
        close(){
            this.$emit('closeNewAbono');
        },

        asignarCliente(clientes){
            this.datos_deuda.cliente.id=clientes.id;
            this.datos_deuda.cliente.nombre=clientes.nombre
            this.datos_deuda.cliente.comentario=clientes.comentario

            this.Vs_selector_cliente= false
            this.Vs_clienteIndicado = true
            
        },
        eliminarClienteAsignado(){
            this.datos_deuda.cliente.id= 0;
            this.datos_deuda.cliente.nombre=''
            this.datos_deuda.cliente.comentario=''

            this.Vs_selector_cliente= true
            this.Vs_clienteIndicado = false
        },
        async registrar_deuda(){
            if (this.datos_deuda.cliente.nombre == "" && this.datos_deuda.cliente.id == 0) {
                this.mostrarAlerta("error","debe selecionar un cliente para registrar deudas!")
            }else{

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