<template>
    <section class="w-full h-full justify-center items-center  z-50 fixed flex bg-[#0a0e3480]">
        <div class="w-[90%] h-[70vh] pt-[20px] bg-white p-2">
            <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                <h3 class="text-center order-1 text-[1.5rem] text-black">Indicar deuda</h3>
                <button @click="close()" class="order-2 ml-[75%] absolute ">
                    <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                </button>
            </header>

        

        <section class="w-full h-[420px] p-1 overflow-hidden overflow-y-scroll pt-[20px]">
                <div v-for="(deuda, index) in deudas" :key="deuda.id_deuda" class="w-full h-[75px] mb-[15px] pb-[5px] flex flex-row p-2 overflow-hidden shadow-lg rounded-sm">
                    
                        <div class="h-full order-1 flex justify-center items-center p-2">
                            <input class="w-[30px] bg-white h-[30px] mr-[5px]" type="checkbox" :checked="index === deudaSelect" @change="selectCliente(index)">
                        </div>
                        <div class="flex order-2 flex-col justify-center border-l-[1.5px] border-l-[#D9D9D9] p-2">
                            <h3 class="text-[#0D0D0D] mb-[3px] order-1">Total deduda: <span class="text-[#4866EB]">{{deuda.monto_pendiente}}</span></h3>
                            <h3 class="text-[#A4A4A4]  text-[0.8rem] font-light order-2">{{ deuda.detalles_deuda }} </h3>
                        </div>
                  
                </div>
        </section>
        </div>
    </section>
</template> 

<script>
import {alertController  } from '@ionic/vue'
import { obtenerDeudasCliente} from '../../servicioDB/deudaOperacion'
export default {
    mounted(){
        this.obtener_deudas()
    },
    props:['id_cliente'],
    data() {
        return {
            deudas: [],
            deudaSelect: null,
            alerta: {
                isOpen: false,
                header: '',
                message: '',
                buttons: ['OK']
            }
        };
    },
    methods: {
        close(){
            this.$emit('closeSelectDeuda');
        },
        async obtener_deudas(){
            try {
               this.deudas = await obtenerDeudasCliente(this.id_cliente)
               console.log('Deudas obtenidas:', this.deudas);
               if (this.deudas.length == 0) {
                    this.mostrarAlerta("cliente sin deuda","el cliente no pose deudas para abonar!")
                    this.close()
               } 
            } catch (error) {
                console.error("error al obtener las deudas del cliente!", error)
            }
        },
        selectCliente(index) {
            if (this.deudaSelect === index) {
                this.deudaSelect = null;
            } else {
                this.deudaSelect = index;
                this.$emit('asignarDeuda',this.deudas[index])
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