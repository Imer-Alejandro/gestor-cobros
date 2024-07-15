<template>
    <IonPage>
        <div  class="bg-[#F9F9F9]  overflow-hidden w-full h-full">
        <enviarNotificacion v-if="Vs_enviarRecordatorio" :cliente_operacion="cliente_operacion"/>
        
        <eliminarRecordatorio @eliminar_cliente="eliminar_cliente" v-if="Vs_eliminarRecordatorio" @actualizarVista="obtenerClientes()" :cliente_operacion="cliente_operacion" @closeEliminarRecordatorio="Vs_eliminarRecordatorio= false"/>
         
        <newAbono @actualizarClientes="obtenerClientes()" @closeNewAbono="VsNewAbono = false" v-if="VsNewAbono"/>
        <newCliente @actualizarClientes="obtenerClientes()" v-if="Vs_newCliente" @closeNewCliente="Vs_newCliente = false"/>
          
        <HeaderApp @openNewCliente="Vs_newCliente = true" @openNewAbono="VsNewAbono = true" :visibilidadBusquedad='false' name="Notificaciones"/>
        <footerApp  :desplazamiento='true'/>

        <section class="flex flex-col w-full mb-[20px] border-b-[#EFEEEE] pb-[20px] border-b-[1.5px] p-2">
                <div class="order-1 flex flex-row items-center mb-[10px] ">
                    <h2 class=" order-1 text-neutral-900 text-[1.4rem] mr-[10px] ">Recordatorios de pago - </h2>
                    <div class="order-2 bg-[#4866EB] rounded-sm flex items-center justify-center p-1">
                        <span class="text-white">{{ listadoCliente.length }}</span>
                    </div>
                </div>  
        </section>

        <section class="w-full p-2"> 
            <div v-for="datos_clientes in  listadoCliente" :key="datos_clientes.id">
                <cardNotificacion
                :datos_clientes="datos_clientes"
                @enviarRecordatorioCobro="Vs_enviarRecordatorio = true, cliente_operacion = datos_clientes"
                @openEliminarRecordatorio="Vs_eliminarRecordatorio = true, cliente_operacion = datos_clientes "
                />
            </div>


        </section>
        
    </div>
    </IonPage>
</template>

<script>
import {  IonPage } from '@ionic/vue';
import {clientesRecordatorioCobro} from '../servicioDB/clienteOperacion'
import enviarNotificacion from '../components/notificacion/enviarNotificacion.vue';
import eliminarRecordatorio from '../components/notificacion/eliminarRecordatorio.vue';
import cardNotificacion from '../components/notificacion/cardNotificacion.vue';
import footerApp from '../components/generales/footerApp.vue'
import HeaderApp from "../components/generales/HeaderApp.vue"
import newAbono from '../components/generales/newAbono.vue'
import newCliente from '../components/clientes/newCliente.vue';

export default {
    mounted(){
        this.obtenerClientes()
    },
    data(){
        return{
            cliente_operacion:'',
            listadoCliente:[],
            Vs_eliminarRecordatorio:false,
            Vs_enviarRecordatorio:false,
            VsNewAbono:false,
            Vs_newCliente:false

        }
    },
    methods:{
        async obtenerClientes(){
            try {
                this.listadoCliente = await clientesRecordatorioCobro()
                console.log(this.listadoCliente)
            } catch (error) {
                console.log("error al obtener los clientes",error)
            }
        },
        eliminar_cliente(id_cliente){
            try {
                const newList= this.listadoCliente.filter( element => element.id != id_cliente)
                this.listadoCliente = newList;
            } catch (error) {
                console.error("error al eliminar el cliente del listado",error)
            }

        }

    },
    components:{
        newCliente,
        newAbono,
        enviarNotificacion,
        eliminarRecordatorio,
        cardNotificacion,
        HeaderApp,
        footerApp,
        IonPage
    }
}
</script>