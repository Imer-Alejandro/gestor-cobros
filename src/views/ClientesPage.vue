<template>
    <IonPage> 
        <div class="bg-[#F9F9F9]  overflow-x-hidden w-full h-full">
        <!-- Componentes del cliente -->
        <detallesCliente :cliente_operacion="cliente_operacion" v-if="VsDetallesCliente" @closeDetallesCliente="VsDetallesCliente =  false"/>
        <editarClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsEditarCliente" @closeEditarCliente="VsEditarCliente = false"/>
        <eliminarClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsEliminarCliente" @closeEliminarCliente="VsEliminarCliente =false "/>
        <abonarDeudaClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsAbonarDeudaCliente" @closeAbonarCliente="VsAbonarDeudaCliente = false"/>
        <newDeudaCliente @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsnewDeudaCliente" @closeNewDeudaCliente="VsnewDeudaCliente = false"/>
        <historialCliente :cliente_operacion="cliente_operacion" v-if="VsHistorialCliente" @closeHistorialCliente="VsHistorialCliente = false"/>
        
        <newAbono @actualizarClientes="obtenerClientes()" @closeNewAbono="VsNewAbono = false" v-if="VsNewAbono"/>

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
        <HeaderApp @openNewCliente="Vs_newCliente = true" @openNewAbono="VsNewAbono = true" :visibilidadBusquedad='true' @openResultBusqueda="openResultBusqueda" name="Clientes"/>
        <footerApp/>
        <!-- Contenido -->
        <section class="w-full  fixed z-30 mt-[57.5vh]  p-2">
            <button @click="Vs_newCliente = true" class=" p-2 flex justify-center rounded-sm shadow-lg items-center w-full h-[60px] bg-[#46c74e]">
                <img class="order-1 w-[30px] h-[30px] mr-[15px]" src="/menu/newCliente.png" alt="">
                <h3 class="order-2 text-[1.2rem]">Registrar nuevo cliente</h3>
            </button>
        </section>

        <section class="p-2">
            <div class="bg-white w-full h-[70px] mb-[20px] items-center shadow-md mt-[10px] p-2 pb-[10px] rounded-sm flex flex-row ">
                <div class="order-1 flex flex-col">
                    <h3 class="order-1 text-[1rem] text-[#5E5E5E] mb-[5px]">Cliente registrados</h3>
                    <h3 class="order-2 text-[1.6rem] text-[#111111]">{{listadoClientes.length}}</h3>
                </div>
            </div>
        </section>

        <section class="p-2 w-full pb-[50px] overflow-hidden">
            <div class="w-full flex flex-row mb-[20px] pb-[10px]">
                <h3 class="text-black order-1 mr-[28%] text-[1.6rem] mb-[10px]">Clientes</h3>
                <select v-model="filtro_cliente" class="order-2 w-[180px]  outline-none text-black pl-2 h-[35px] bg-[#ECECEC] rounded-sm">
                    <option value="todos">Todos los clientes</option>
                    <option value="cliente deuda">clientes con deudas</option>
                    <option value="cliente sin deuda">clientes sin deudas</option>
                    <option value="ordernar por fecha">ordernar por fecha</option>
                </select>
            </div>
            <div class="w-full mb-[120px]" >
                    <div v-for="datosCliente in listadoClientes " :key="datosCliente.id">
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
import {obtenerClientes} from '../servicioDB/clienteOperacion'

import resultBusqueda from '../components/generales/resultBusqueda.vue';

import cardCliente from '../components/generales/cardCliente.vue'
import footerApp from '../components/generales/footerApp.vue'
import HeaderApp from "../components/generales/HeaderApp.vue"
import newCliente from '../components/clientes/newCliente.vue';

import editarClienteVue from '../components/clientes/editarCliente.vue';
import eliminarClienteVue from '../components/clientes/eliminarCliente.vue';
import abonarDeudaClienteVue from '../components/clientes/abonarDeudaCliente.vue';
import historialCliente from '../components/clientes/historialCliente.vue';
import newDeudaCliente from '../components/clientes/newDeudaCliente.vue';
import detallesCliente from '../components/clientes/detallesCliente.vue';
import newAbono from '../components/generales/newAbono.vue'
import {useGlobalStare} from '@/store/state'

export default {
    mounted(){
        //cargar componente con el menu lateral cerrado
        this.menuLateral=false;
        this.obtenerClientes();
    },
    watch:{
        filtro_cliente:{ 
            async handler() {
                
                if (this.filtro_cliente == 'todos') {
                    this.obtenerClientes() 
                }
                else if (this.filtro_cliente == 'cliente deuda') {
                    try {
                        obtenerClientes()
                        const listaCLienteDeuda = this.listadoClientes.filter((item)=> item.deuda_general > 0);
                        this.listadoClientes = listaCLienteDeuda;
                    } catch (error) {
                        console.error('Error al obtener los cliente:', error);   
                    }
                }
                else if(this.filtro_cliente == 'cliente sin deuda'){
                    try {
                        obtenerClientes()
                        const listaCLienteSinDeuda = this.listadoClientes.filter((item)=> item.deuda_general == 0);
                        this.listadoClientes = listaCLienteSinDeuda;
                    } catch (error) {
                        console.error('Error al obtener los cliente:', error);   
                    }
                }
                else if (this.filtro_cliente == 'ordernar por fecha') {
                    try {
                        obtenerClientes()
                        const listaOrdenada = this.listadoClientes.sort((a, b) => b.id - a.id);
                        this.listadoClientes = listaOrdenada;  
                    } catch (error) {
                        console.error('Error al obtener los cliente:', error);   
                    }
      
                }
            },
        // force eager callback execution
        immediate: true
        }
    },
    components:{
        newAbono,
        newDeudaCliente,
        detallesCliente,
        historialCliente,
        abonarDeudaClienteVue,
        editarClienteVue,
        eliminarClienteVue,
        resultBusqueda,
        newCliente,
        cardCliente,
        HeaderApp,
        footerApp,
        IonPage
    },
    data(){
        return{
            cliente_operacion: '',

            //datos de la busqueda de cliente
            NameBusqueda:'',
            listadoClientesBusqueda:[],

            filtro_cliente:'todos',
            listadoClientes:[],
            Vs_newCliente:false,

            Vs_resultBusqueda:false,
            VsDetallesCliente:false,
            VsEditarCliente:false,
            VsEliminarCliente:false,
            VsAbonarDeudaCliente:false,
            VsnewDeudaCliente:false,
            VsHistorialCliente:false,
            VsNewAbono:false
        }
    },
    methods:{
        async obtenerClientes(){
            const store = useGlobalStare();
            this.listadoClientes = store.listadoClientes
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
 
}
</script>