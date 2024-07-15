<template>
    <IonPage>
        <div class="bg-[#F9F9F9]  overflow-x-hidden w-full h-full">
           
            <newCliente @actualizarClientes="obtenerClientes()" v-if="Vs_newCliente" @closeNewCliente="Vs_newCliente = false"/>
            <newAbono @actualizarClientes="obtenerClientes()" @closeNewAbono="VsNewAbono = false" v-if="VsNewAbono"/>

        <!-- Componentes del cliente -->
        <detallesCliente :cliente_operacion="cliente_operacion" v-if="VsDetallesCliente" @closeDetallesCliente="VsDetallesCliente =  false"/>
        <editarClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsEditarCliente" @closeEditarCliente="VsEditarCliente = false"/>
        <eliminarClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsEliminarCliente" @closeEliminarCliente="VsEliminarCliente =false "/>
        <abonarDeudaClienteVue @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsAbonarDeudaCliente" @closeAbonarCliente="VsAbonarDeudaCliente = false"/>
        <newDeudaCliente @actualizarClientes="obtenerClientes()" :cliente_operacion="cliente_operacion" v-if="VsnewDeudaCliente" @closeNewDeudaCliente="VsnewDeudaCliente = false"/>
        <historialCliente :cliente_operacion="cliente_operacion" v-if="VsHistorialCliente" @closeHistorialCliente="VsHistorialCliente = false"/>
        

            <HeaderApp @openNewCliente="Vs_newCliente = true" @openNewAbono="VsNewAbono = true" @openResultBusqueda="openResultBusqueda" :visibilidadBusquedad='true' name="Busqueda"/>
            <footerApp/>
            <!-- Contenido -->
            <section class="flex flex-col w-full mb-[20px] border-b-[#EFEEEE] pb-[20px] border-b-[1.5px] p-2">
                <div class="order-1 flex flex-row items-center mb-[10px] ">
                    <h2 class=" order-1 text-neutral-900 text-[1.4rem] mr-[10px] ">Resultados - </h2>
                    <div class="order-2 bg-[#4866EB] rounded-sm flex items-center justify-center p-1">
                        <span class="text-white">{{listadoClientesBusqueda.length}}</span>
                    </div>
                </div>
                <h3 class="order-2 text-[0.9rem] text-[#3D3D3D]">Termino de busqueda: <span class="text-[#ACACAC]">{{NameBusqueda}}</span></h3>
            </section>

            <div class="w-full p-2 pt-[10px] mb-[120px]" >
                <div v-if="listadoClientesBusqueda.length > 0">
                    <div v-for="datosCliente in listadoClientesBusqueda " :key="datosCliente.id">
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
            </div>
        </div>
    </IonPage>
</template> 

<script>
import {  IonPage } from '@ionic/vue';
import cardCliente from '../components/generales/cardCliente.vue'
import footerApp from '../components/generales/footerApp.vue'
import HeaderApp from "../components/generales/HeaderApp.vue"
import newCliente from '../components/clientes/newCliente.vue';
import newAbono from '../components/generales/newAbono.vue'

import editarClienteVue from '../components/clientes/editarCliente.vue';
import eliminarClienteVue from '../components/clientes/eliminarCliente.vue';
import abonarDeudaClienteVue from '../components/clientes/abonarDeudaCliente.vue';
import historialCliente from '../components/clientes/historialCliente.vue';
import newDeudaCliente from '../components/clientes/newDeudaCliente.vue';
import detallesCliente from '../components/clientes/detallesCliente.vue';
export default {
    data(){
        return{
            cliente_operacion:'',

            VsDetallesCliente:false,
            VsEliminarCliente:false,
            VsAbonarDeudaCliente:false,
            VsEditarCliente:false,
            VsHistorialCliente:false,
            VsnewDeudaCliente:false,

            Vs_newCliente:false,
            VsNewAbono:false,

            listadoClientesBusqueda:[],
            NameBusqueda:''
        }
    },
    components:{
        cardCliente,
        editarClienteVue,
        eliminarClienteVue,
        abonarDeudaClienteVue,
        historialCliente,
        newDeudaCliente,
        detallesCliente,
        newCliente,
        newAbono,
        HeaderApp,
        footerApp,
        IonPage
    },
    methods:{
        openResultBusqueda(listadoCliente,nombreBusqueda){
            this.NameBusqueda = nombreBusqueda
            this.listadoClientesBusqueda= listadoCliente
        },
    }
}
</script>