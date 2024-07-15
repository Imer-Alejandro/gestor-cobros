<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <detallesDeuda :deuda_operacion="deuda_operacion" v-if="VsDetalleDeuda" @closeDetallesDeuda="VsDetalleDeuda = false"/>
        <eliminarDeuda @actualizarClientes="actualizarDatos()" :deuda_operacion="deuda_operacion" v-if="VsEliminarDeuda" @closeEliminarDeuda="VsEliminarDeuda = false"/>
        <editarDeuda @actualizarClientes="actualizarDatos()" :deuda_operacion="deuda_operacion" v-if="VsEditarDeuda" @closeEditarDeuda="VsEditarDeuda = false"/>
        <abonarDeudaInHistorialVue @actualizarClientes="actualizarDatos()" :deuda_operacion="deuda_operacion" v-if="VsAbonarDeudaDesdeHistorialCliente" @closeAbonarDeudaDesdeHistorial="VsAbonarDeudaDesdeHistorialCliente = false"/>
        <historialAbonosDeuda :deuda_operacion="deuda_operacion" v-if="VsHistorialAbono" @closeHistorialAbonosDeuda="VsHistorialAbono = false"/>
        <!-- Contenedor principal -->
            <div class="w-full h-[95vh] mt-[5vh] pt-[20px] bg-[#F9F9F9] p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Historial del cliente</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button> 
                </header>

                <section class="p-2 w-full">
                    <div class="w-full h-[80px] bg-white shadow-lg mb-[5px] rounded-sm  flex flex-row ">
                        <div class="w-full   h-full flex flex-row order-2 p-2">
                            <div v-for=" cliente in datos_cliente" :key="cliente.id" class="h-full  justify-center order-1 box-border mr-[10%]  w-[300px] overflow-hidden flex flex-col">
                                <h3 class="text-black order-1 mb-[8px]">{{cliente.nombre}}</h3>
                                <h3 class="text-[#464646] font-light  order-2">Total de la deuda: <span class=" text-[#4866EB] ">{{cliente.deuda_general}}</span></h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="flex flex-row w-full pb-[15px] p-2">
                    <div class="w-[50%] flex flex-col items-center shadow-md  justify-center mr-[5%] h-[80px] bg-white order-1 border-b-[#4866EB] border">
                        <h3 class="text-[1.2rem] text-[#313131] order-1 mb-[10px]">Monto abonado</h3>
                        <h3 class="order-2 font-light text-[#4866EB]">{{monto_abonado}}</h3>
                    </div>
                    <div class="w-[50%] flex flex-col items-center shadow-md justify-center h-[80px] bg-white order-2 border-b-[#E52B37] border">
                        <h3 class="text-[1.2rem] text-[#313131] order-1 mb-[10px]">Monto pendiente</h3>
                        <h3 class="order-2 font-light text-[#E52B37]">{{monto_pendiente}}</h3>
                    </div>
                </section> 
                
                <div class="p-2 flex  items-center flex-row mb-[15px]">
                    <h3 class="text-[#3D3D3D] tex-[1.4rem] mr-[15px] order-1 ">Registro de las deudas</h3>
                    <select class="order-2 w-[180px]  outline-none text-black pl-3  h-[30px] bg-[#ECECEC] rounded-sm">
                        <option value="">Deudas pendientes</option>
                        <option value="">Deudas pagadas</option>
                    </select>
                </div>
               
                <section class="w-full  h-[410px] pb-[40px] overflow-y-scroll overflow-hidden ">
                    <div v-for="dato_deuda in listadoDeuda" :key="dato_deuda.id_deuda">
                        <cardDeuda
                        :dato_deuda="dato_deuda"

                        @openDetalleDeuda="VsDetalleDeuda = true, deuda_operacion = dato_deuda"
                        @openEliminarDeuda="VsEliminarDeuda = true, deuda_operacion = dato_deuda"
                        @openEditarDeuda="VsEditarDeuda = true, deuda_operacion = dato_deuda"
                        @openAbonarDeudaDesdeHistorialCliente="VsAbonarDeudaDesdeHistorialCliente = true, deuda_operacion = dato_deuda"
                        @openHistorialAbonos="VsHistorialAbono = true,  deuda_operacion = dato_deuda"
                        />
                    </div>
 

                </section>
            </div>
        </section> 
</template>

<script>
import cardDeuda from '../deudas/cardDeuda.vue';
import eliminarDeuda from '../deudas/eliminarDeuda.vue'
import detallesDeuda from '../deudas/detallesDeuda.vue';
import editarDeuda from '../deudas/editarDeuda.vue';
import abonarDeudaInHistorialVue from '../deudas/abonarDeudaInHistorial.vue';
import historialAbonosDeuda from '../deudas/historialAbonosDeuda.vue';

import {obtenerDeudasCliente} from '../../servicioDB/deudaOperacion';
import {buscarClienteID} from '../../servicioDB/clienteOperacion';


export default {
    props:['cliente_operacion'],
    mounted(){
    this.obtenerDeudas();
    this.obtener_cliente()
  },
    data(){
        return{
            listadoDeuda:[],
            datos_cliente:'',
            monto_pendiente:0,
            monto_abonado:0,

            deuda_operacion:'',

            VsDetalleDeuda:false,
            VsEliminarDeuda:false,
            VsEditarDeuda:false,
            VsAbonarDeudaDesdeHistorialCliente:false,
            VsHistorialAbono : false
        }
    },
    methods:{
        close(){
            this.$emit("closeHistorialCliente")
        },
        async actualizarDatos(){
            try {
                this.obtener_cliente()
                this.obtenerDeudas();

            } catch (error) {
                console.error('Error al actualizar el historial del cliente:', error);
                
            } 
        },
        async obtener_cliente(){
            try {
                this.datos_cliente = await buscarClienteID(this.cliente_operacion.id);
                console.log(this.datos_cliente)
            } catch (error) {
                console.error('Error al obtener el cliente:', error);
                
            }  
        },
        async obtenerDeudas(){
            try {
                this.listadoDeuda = await obtenerDeudasCliente(this.cliente_operacion.id)
                this.montoPendiente();
                this.montoAbonado();
            } catch (error) {
                console.error("error al obtener el listado de las deuda del cliente")
            }
    },
    montoPendiente(){
        this.monto_pendiente = 0;
        this.listadoDeuda.forEach((item)=>{
            this.monto_pendiente += item.monto_pendiente;
        })
    },
    montoAbonado(){
        this.monto_abonado = this.listadoDeuda.reduce((total, item) => {
            return total + (item.monto_deuda - item.monto_pendiente);
            }, 0);
    }
    },
    components:{
        cardDeuda,
        detallesDeuda,
        eliminarDeuda,
        editarDeuda,
        abonarDeudaInHistorialVue,
        historialAbonosDeuda
    }
}
</script>