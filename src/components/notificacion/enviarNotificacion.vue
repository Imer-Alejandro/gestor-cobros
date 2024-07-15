<template>
    <section class="w-full justify-center items-center h-full z-40 fixed flex flex-row bg-[#0a0e3480]">
        <!-- Contenedor principal -->
        <div class="w-[90%] h-[32vh]  pt-[20px] bg-white p-2">
            <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                <h3 class="text-center order-1 text-[1.4rem] text-black">Enviar recordatorio</h3>
                <button @click="close" class="order-2 ml-[75%] absolute ">
                    <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                </button>
            </header>

            <section v-if="Vs_confirmarEnvio" class="w-full mt-[15%]">
                <button @click="sendMessage" class="bg-[#32D558] w-full h-[80px] rounded text-[1.3rem]">Enviar</button>
            </section>

            <section v-if="Vs_indicarTelefono" class="w-full mt-[5%]">
                <label class="text-[#A4A4A4]">Confirme el teléfono del cliente <span class="text-[#E81624]">*</span></label>
                <input v-model="numero_cliente" required class="w-full mb-[20px] outline-none resize-none text-black p-2 h-[50px] bg-[#ECECEC] rounded-sm" type="tel" placeholder="Indique el teléfono correcto aquí...">
                <button @click="sendMessage" class="bg-[#32D558] w-full h-[60px] rounded text-[1.3rem]">Enviar</button>
            </section>
        </div>
    </section>
</template>

<script>
import {obtenerDatosNegocio} from '../../servicioDB/negocioOperaciones'
export default {
    props: ['cliente_operacion'],
    mounted() {
        this.obtenerDatosNegocio();
    },
    data() {
        return {
            numero_cliente: '',
            nombre_negocio:'',
            Vs_indicarTelefono: false,
            Vs_confirmarEnvio: true,
            enlace: ''
        };
    },
    methods: {
        verificarTelefono() {
            if (this.cliente_operacion.telefono && this.cliente_operacion.telefono !== '') {
                this.numero_cliente = this.cliente_operacion.telefono;
                this.Vs_confirmarEnvio = true;
                this.Vs_indicarTelefono = false;
            } else {
                this.Vs_confirmarEnvio = false;
                this.Vs_indicarTelefono = true;
            }
            this.actualizarEnlace();
        },
        async obtenerDatosNegocio(){
            try {
                const result = await obtenerDatosNegocio()
                if(result[0] != undefined){
                    this.nombre_negocio = result[0].nombre_negocio
                    console.log(this.nombre_negocio)
                    this.verificarTelefono();
                    
                }
            } catch (error) {
                console.error("error al obtener los datos del negico",error)
            }
        },
        actualizarEnlace() {
            console.log(this.nombre_negocio)

            this.enlace = `https://api.whatsapp.com/send/?phone=1${this.numero_cliente}&text=Hola+${this.cliente_operacion.nombre}%2C%0A%0AEste+es+un+mensaje+autom%C3%A1tico+enviado+desde+el+programa+de+gesti%C3%B3n+del+negocio+%2A${this.nombre_negocio}%2A.%0A%0ADirigido+al+cliente+registrado+como+%2A%2A${this.cliente_operacion.nombre}%2A%2A%2C%0A%0AQueremos+recordarle+que+tiene+un+pago+pendiente+por+un+monto+de%3A%0A%0A%2ACantidad+pendiente%3A%2A+%60%60%60%24${this.cliente_operacion.deuda_general}%60%60%60%0A%0APor+este+medio+le+animamos+a+realizar+un+abono+de+su+deuda+pendiente+lo+antes+posible.%0A%0ASaludos+cordiales+y+feliz+resto+del+d%C3%ADa%2C%0A%0AEquipo+de+%2A${this.nombre_negocio}%2A%0A%0A---%0A%2ANota%3A%2A+Si+usted+no+es+el+destinatario+correcto+de+este+mensaje%2C+por+favor%2C+ign%C3%B3relo.&type=phone_number&app_absent=0`;
        },
        sendMessage() {
            this.close();
            window.open(this.enlace, '_blank');
        },
        close() {
            this.$emit('closeEnviarRecordatorio');
        }
    },

};
</script>
