<template>
    <IonPage>
    <div class="bg-[#F9F9F9]  overflow-x-hidden w-full h-full">

        <eliminarAbono :abono_operacion="abono_operacion" v-if="VsEliminarAbono" @closeEliminarAbono="VsEliminarAbono = false"/>
        <editarAbono :abono_operacion="abono_operacion" v-if="VsEditarAbono" @closeEditarAbono="VsEditarAbono = false"/>
        <detallesAbono :abono_operacion="abono_operacion" v-if="VsDetallesAbono" @closeDetallesAbono="VsDetallesAbono = false"/>

        <newAbono @actualizarClientes="obtenerAbonosDelDia()" @closeNewAbono="VsNewAbono = false" v-if="VsNewAbono"/>
        <newCliente v-if="Vs_newCliente" @closeNewCliente="Vs_newCliente = false"/>

        <HeaderApp @openNewCliente="Vs_newCliente = true" @openNewAbono="VsNewAbono = true"  :visibilidadBusquedad='false' name="Abonos"/>
        <footerApp />
       
        <!-- Filtros -->
        <section class="w-full  fixed z-30 mt-[57.5vh]  p-2">
            <button @click="VsNewAbono = true" class=" p-2 flex justify-center rounded-sm shadow-lg items-center w-full h-[60px] bg-[#46c74e]">
                <img class="order-1 w-[30px] h-[30px] mr-[15px]" src="/menu/newAbono.png" alt="">
                <h3 class="order-2 text-[1.2rem]">Registrar nuevo abono</h3>
            </button>
        </section>

        <section class="p-2">
            <div class="bg-white w-full h-[70px] mb-[15px] items-center shadow-md p-2 pb-[10px] rounded-sm flex flex-row ">
                <div class="order-1 flex flex-col">
                    <h3 class="order-1 text-[1rem] text-[#5E5E5E] mb-[5px]">Total de la deuda por cobrar</h3>
                    <h3 class="order-2 text-[1.6rem] text-[#111111]">{{deuda_general}}</h3>
                </div>
            </div>
        </section>
 
        <section class="p-2 w-full pb-[20px]">
            <div class="flex flex-col items-center justify-center ">
                <h3 class="text-[#3D3D3D] mb-[10px] order-1">Filtro de busqueda - abono de deudas</h3>
                <input v-model="filtro_fehca" class="order-2 h-[40px]    placeholder:text-black  outline-none pl-[30%] w-[90%] text-black text-center bg-[#FFFFFF] shadow-lg" type="date" >
            </div>
        </section>

        <section class="w-full p-2">
            <section v-if="Vs_abonoBusquedad == false" class="p-2 mb-[20px]">
                <h2 class=" order-1 text-neutral-900 text-[1.4rem] mr-[10px] ">Abonos de hoy</h2>
            </section>

            <section v-if="Vs_abonoBusquedad == true" class="flex flex-col w-full mb-[20px] border-b-[#EFEEEE] pb-[20px] border-b-[1.5px] p-2">
                <div class="order-1 flex flex-row items-center mb-[10px] ">
                    <h2 class=" order-1 text-neutral-900 text-[1.4rem] mr-[10px] ">Resultados - </h2>
                    <div class="order-2 bg-[#4866EB] rounded-sm flex items-center justify-center p-1">
                        <span class="text-white">{{listado_abonos.length}}</span>
                    </div>
                </div>
                <h3 class="order-2 text-[0.9rem] text-[#3D3D3D]">fecha de busqueda: <span class="text-[#ACACAC]">{{filtro_fehca}}</span></h3>
            </section>

            <div class="w-full  mb-[120px]" >
                <div v-if="listado_abonos.length > 0">
                    <div v-for="datos_abono in listado_abonos" :key="datos_abono.id_abono">
                        <cardAbonos
                        :datos_abono="datos_abono"
                        @openEliminarAbono=" VsEliminarAbono = true,abono_operacion = datos_abono "
                        @openEditarAbono="VsEditarAbono = true, abono_operacion = datos_abono"
                        @openDetalleAbono="VsDetallesAbono = true, abono_operacion = datos_abono"
                        />
                    </div>
                </div>


            </div>
        </section>
    </div>
    </IonPage>
</template>

<script>
import {alertController  } from '@ionic/vue'
import {  IonPage } from '@ionic/vue';
import footerApp from '../components/generales/footerApp.vue'
import HeaderApp from "../components/generales/HeaderApp.vue"

import eliminarAbono from '../components/abonos/eliminarAbono.vue';
import editarAbono from '../components/abonos/editarAbono.vue';
import detallesAbono from '../components/abonos/detallesAbono.vue'
import newAbono from '../components/generales/newAbono.vue'
import newCliente from '../components/clientes/newCliente.vue';

import cardAbonos from '../components/generales/cardAbonos.vue'

import {abonosDelDia} from '../servicioDB/abonoOperacion'
import {obtenerAbonosPorFecha} from '../servicioDB/abonoOperacion'
import {obtenerClientes} from '../servicioDB/clienteOperacion'



export default {
    mounted(){
        this.obtenerAbonosDelDia()
        this.obtenerClientes()
    },
    watch:{
        filtro_fehca:{
            async handler(){
                try {
                    this.listado_abonos = await obtenerAbonosPorFecha(this.filtro_fehca)
                    this.Vs_abonoBusquedad = true;
                } catch (error) {
                    this.mostrarAlerta("error de busqueda!","error al filtrar abonos por fecha")
                    console.error("error al filtrar los abonos")
                }
            }
        }
    },
    data(){
        return{
            filtro_fehca:'',
            Vs_newCliente:false,
            Vs_abonoBusquedad:false,
            //variables de visibilidad para los componentes 
            VsNewAbono: false,
            VsEliminarAbono:false,
            VsEditarAbono:false,
            VsDetallesAbono:false,

            abono_operacion:'',

            listado_abonos:[],
            deuda_general:0,

            alerta: {
                isOpen: false,
                header: '',
                message: '',
                buttons: ['OK']
            }
        }
    },
    components:{
        newCliente,
        eliminarAbono,
        editarAbono,
        detallesAbono,
        newAbono,
        cardAbonos,
        HeaderApp,
        footerApp, 
        IonPage
    },
    methods:{
        async obtenerAbonosDelDia(){
            try {
                this.listado_abonos = await abonosDelDia()
                //asignar la fecha del dia al input de busqueda
                this.getFechaDelDia();
            } catch (error) {
               console.error("error al obtener los abonos del dia",error) 
            }
        },
        getFechaDelDia() {
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            this.filtro_fehca = `${year}-${month}-${day}`;
        },

        MontoPorCobrar(){
            this.deuda_general = 0;
            this.listadoClientes.forEach((item)=>{
                this.deuda_general += item.deuda_general;
            })
        },
        async obtenerClientes(){
            try {
                this.listadoClientes = await obtenerClientes();
                this.MontoPorCobrar();

            } catch (error) {
                console.error('Error al registrar cliente:', error);
                
            } 
        },
        async mostrarAlerta(header, message) {
            const alert = await alertController.create({
                header: header,
                message: message,
                buttons: ['OK']
            });
            await alert.present();
        },

 
    }
}
</script>