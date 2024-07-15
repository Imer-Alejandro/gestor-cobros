<template>
    <IonPage> 
        <div  class="bg-[#F9F9F9]   overflow-x-hidden w-full h-full">
        
        <newDeuda @actualizarClientes="obtenerClientes()" v-if="VsNewDeuda" @closeNewAbono="VsNewDeuda = false"/>
        <newAbono @actualizarClientes="obtenerClientes()" @closeNewAbono="VsNewAbono = false" v-if="VsNewAbono"/>
        <!-- Componentes del cliente -->
        <detallesCliente :cliente_operacion="cliente_operacion" v-if="VsDetallesCliente" @closeDetallesCliente="VsDetallesCliente =  false"/>
        <editarClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsEditarCliente" @closeEditarCliente="VsEditarCliente = false"/>
        <eliminarClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsEliminarCliente" @closeEliminarCliente="VsEliminarCliente =false "/>
        <abonarDeudaClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsAbonarDeudaCliente" @closeAbonarCliente="VsAbonarDeudaCliente = false"/>
        <newDeudaCliente @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsnewDeudaCliente" @closeNewDeudaCliente="VsnewDeudaCliente = false"/>
        <historialCliente :cliente_operacion="cliente_operacion" v-if="VsHistorialCliente" @closeHistorialCliente="VsHistorialCliente = false"/>
        
        <resultBusqueda 
        v-if="Vs_resultBusqueda" :NameBusqueda="NameBusqueda" :listadoClientesBusqueda="listadoClientesBusqueda"  
        @closeResultBusqueda="Vs_resultBusqueda = false" 
        @openDetalleClienteResult="openDetalleClienteResult"
        @openEditarClienteResult="openEditarClienteResult"
        @openEliminarClienteResult="openEliminarClienteResult"
        @openAbonarClienteResult="openAbonarClienteResult"
        @openNewDeudaClienteResult="openNewDeudaClienteResult"
        @openHistorialClienteResult="openHistorialClienteResult"
        />

        <newCliente @actualizarClientes="obtenerClientes()" v-if="Vs_newCliente" @closeNewCliente="Vs_newCliente = false"/>

        <HeaderApp @openNewCliente="Vs_newCliente = true" @openNewAbono="VsNewAbono = true" @openResultBusqueda="openResultBusqueda" :visibilidadBusquedad='true' name="Inicio"/>
        <footerApp/>
         
        <!-- Contenido -->
 
        <section class="w-full flex fixed z-30 mt-[59vh] flex-row p-2">
            <button @click="VsNewAbono=true" class="order-1 mr-[10%] p-2 flex flex-row rounded-sm shadow-lg items-center w-[50%] h-[48px] bg-[#32D558]">
                <img class="order-1 w-[25px] h-[25px] mr-[5px]" src="/menu/newAbono.png" alt="">
                <h3 class="order-2">Registrar abono</h3>
            </button>
            
            <button @click="VsNewDeuda= true" class="order-2 flex flex-row items-center shadow-lg  w-[50%] h-[48px] bg-[#E52B37] rounded-sm p-2">
                <img class="order-1 w-[25px] h-[25px] mr-[5px]" src="/menu/iconNewDeuda.png" alt="">
                <h3 class="order-2">Registrar deuda</h3>
            </button>
        </section>

        <section class="p-2">
            <div class="bg-white w-full h-[70px] mb-[20px] items-center shadow-md p-2 pb-[10px] rounded-sm flex flex-row ">
                <div class="order-1 flex flex-col">
                    <h3 class="order-1 text-[1rem] text-[#5E5E5E] mb-[5px]">Total de la deuda por cobrar</h3>
                    <h3 class="order-2 text-[1.6rem] text-[#111111]">{{deuda_general}}</h3>
                </div>
            </div>
        </section>

        <section class="p-2 w-full pb-[50px] overflow-hidden">
            <h3 class="text-black text-[1.6rem] mb-[10px]">Clientes</h3>
            <div class="w-full mb-[120px]" >

                <div v-for=" datosCliente in listadoClientes" :key="datosCliente.id">
                    <cardCliente
                    :datosCliente="datosCliente"
                    @OpenDetalleCliente="VsDetallesCliente = true,  cliente_operacion = datosCliente"
                    @openEditarCliente="VsEditarCliente = true,  cliente_operacion = datosCliente"
                    @openEliminarCliente="VsEliminarCliente = true, cliente_operacion = datosCliente"
                    @openAbonarCliente="VsAbonarDeudaCliente = true, cliente_operacion = datosCliente"
                    @openNewDeudaCliente="VsnewDeudaCliente = true, cliente_operacion = datosCliente"
                    @openHistorialCliente="VsHistorialCliente = true, cliente_operacion = datosCliente"
                    />
                </div>


            </div>
        </section>
    </div>
    </IonPage>
</template>
 
<script>
import {  IonPage } from '@ionic/vue';
import newDeuda from '../components/generales/newDeuda.vue'
import newAbono from '../components/generales/newAbono.vue'
import footerApp from '../components/generales/footerApp.vue'
import HeaderApp from "../components/generales/HeaderApp.vue"

import newCliente from '../components/clientes/newCliente.vue';

import resultBusqueda from '../components/generales/resultBusqueda.vue';
import historialCliente from '../components/clientes/historialCliente.vue';
import newDeudaCliente from '../components/clientes/newDeudaCliente.vue';
import detallesCliente from '../components/clientes/detallesCliente.vue';
import cardCliente from '../components/generales/cardCliente.vue'
import editarClienteVue from '../components/clientes/editarCliente.vue';
import eliminarClienteVue from '../components/clientes/eliminarCliente.vue';
import abonarDeudaClienteVue from '../components/clientes/abonarDeudaCliente.vue';
import {obtenerClientes} from '../servicioDB/clienteOperacion'

//estado de la app
import {useGlobalStare} from '@/store/state'
export default  {
    mounted(){
        this.obtenerClientes();
    }, 
    data(){
        return{
            cliente_operacion:'',
            listadoClientes:[],

            deuda_general:0,

            //datos de la busqueda de cliente
            NameBusqueda:'',
            listadoClientesBusqueda:[],

            //variables de visibilidad para los componentes 
            VsNewAbono: false,
            VsNewDeuda: false,
            VsDetallesCliente:false,
            VsEditarCliente:false,
            VsEliminarCliente:false,
            VsAbonarDeudaCliente:false,
            VsnewDeudaCliente:false,
            VsHistorialCliente:false,
            Vs_newCliente: false,
            Vs_resultBusqueda:false,
        }
    }, 
    methods:{
        async obtenerClientes(){
            try {
                this.listadoClientes = await obtenerClientes();
                this.MontoPorCobrar();
                //definir el estado para las otras vistas
                const store = useGlobalStare();
                store.actualizarState(this.listadoClientes)
            } catch (error) {
                console.error("error al obtener los clientes:", error)
            }
        },

        MontoPorCobrar(){
            this.deuda_general = 0;
            this.listadoClientes.forEach((item)=>{
                this.deuda_general += item.deuda_general;
            })
        },

        openResultBusqueda(listadoCliente,nombreBusqueda){
            this.NameBusqueda = nombreBusqueda
            this.listadoClientesBusqueda= listadoCliente
            this.Vs_resultBusqueda = true
        },

        //operaciones del cliente encontrado en el resultado de busqueda
        openDetalleClienteResult(cliente_operacion){
            this.cliente_operacion = cliente_operacion
            this.VsDetallesCliente = true
        },
        openEditarClienteResult(cliente_operacion){
            this.cliente_operacion = cliente_operacion
            this.VsEditarCliente = true
        },
        openEliminarClienteResult(cliente_operacion){
            this.cliente_operacion = cliente_operacion
            this.VsEliminarCliente = true
        },
        openAbonarClienteResult(cliente_operacion){
            this.cliente_operacion = cliente_operacion
            this.VsAbonarDeudaCliente = true
        },
        openNewDeudaClienteResult(cliente_operacion){
            this.cliente_operacion = cliente_operacion
            this.VsnewDeudaCliente = true
        },
        openHistorialClienteResult(cliente_operacion){
            this.cliente_operacion = cliente_operacion
            this.VsHistorialCliente = true
        }
    },

    components:{
        resultBusqueda,
        newCliente,
        historialCliente,
        newDeudaCliente,
        abonarDeudaClienteVue,
        eliminarClienteVue,
        editarClienteVue,
        detallesCliente,
        HeaderApp,
        footerApp,
        newDeuda,
        newAbono,
        cardCliente,
        IonPage
    }
}
</script>

