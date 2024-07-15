<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <detallesDeuda :deuda_operacion="datos_deuda[0]" v-if="VsDetalleDeuda" @closeDetallesDeuda="VsDetalleDeuda = false"/>
        <editarDeuda @actualizarClientes="obtenerDeuda()"  :deuda_operacion="datos_deuda[0]" v-if="VsEditarDeuda" @closeEditarDeuda="VsEditarDeuda = false"/>

        <eliminarAbono :monto_deuda="datos_deuda[0].monto_deuda" @actualizarAbonos="actualizar()" :abono_operacion="abono_operacion" v-if="VsEliminarAbono" @closeEliminarAbono="VsEliminarAbono = false"/>
        <editarAbono @actualizarAbonos="actualizar()" :abono_operacion="abono_operacion" v-if="VsEditarAbono" @closeEditarAbono="VsEditarAbono = false"/>
        <detallesAbono :abono_operacion="abono_operacion" v-if="VsDetallesAbono" @closeDetallesAbono="VsDetallesAbono = false"/>

        <!-- Contenedor principal -->
            <div class="w-full h-[95vh] mt-[5vh] pt-[20px] bg-[#F9F9F9] p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Historial de abonos</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <div v-for=" datos_deuda in datos_deuda" :key="datos_deuda.id_deuda">
                    <section class="p-2 w-full">
                    <div class="w-full h-[80px] bg-white shadow-lg mb-[20px] overflow-hidden rounded-sm  flex flex-row ">
                        <div class="w-full  h-full flex flex-row order-1 p-2">
                            <div class="h-full order-1 box-border mr-[10%]  w-[300px] overflow-hidden flex flex-col">
                                <h3 class="text-black order-1 mb-[8px]">Total de la deuda: <span class=" text-[#4866EB] ">{{datos_deuda.monto_deuda}}</span> </h3>
                                <h3 class="order-2 text-[#A4A4A4] overflow-hidden  max-w-[63char] text-[0.8rem] font-light"> {{ datos_deuda.detalles_deuda }}</h3>
                            </div>
                        </div>

                        <button @click="presentActionSheet()" class="order-3 w-[60px] h-full  items-center justify-center">
                             <img class="w-[40px] h-[40px]" src="/optiones.png" alt="">
                        </button>
                    </div>
                </section>

                <section class="flex flex-row w-full pb-[10px] p-2">
                    <div class="w-[50%] flex flex-col items-center shadow-md  justify-center mr-[5%] h-[80px] bg-white order-1 border-b-[#4866EB] border">
                        <h3 class="text-[1.2rem] text-[#313131] order-1 mb-[10px]">Monto abonado</h3>
                        <h3 class="order-2 font-light text-[#4866EB]">{{datos_deuda.monto_deuda - datos_deuda.monto_pendiente}}</h3>
                    </div>
                    <div class="w-[50%] flex flex-col items-center shadow-md justify-center h-[80px] bg-white order-2 border-b-[#E52B37] border">
                        <h3 class="text-[1.2rem] text-[#313131] order-1 mb-[10px]">Monto pendiente</h3>
                        <h3 class="order-2 font-light text-[#E52B37]">{{datos_deuda.monto_pendiente}}</h3>
                    </div>
                </section> 
 
                </div>
                
                <h3 class="text-[#3D3D3D] tex-[1.2rem] mt-[5px] mb-[10px]">Registro de los abonos</h3>
               
                <section class="w-full  h-[420px] pb-[40px] overflow-y-scroll overflow-hidden ">
                    <div v-for="datos_abonos in listado_abonos" :key="datos_abonos.id_abono">
                        <cardAbonos
                        :datos_abonos="datos_abonos"

                        @openEliminarAbono=" VsEliminarAbono = true,abono_operacion = datos_abonos"
                        @openEditarAbono="VsEditarAbono = true, abono_operacion = datos_abonos"
                        @openDetalleAbono="VsDetallesAbono = true, abono_operacion = datos_abonos"
                        />
                    </div> 




                </section>
            </div>
        </section> 
</template>

<script>
import { informationCircle,   pencil,  close } from 'ionicons/icons';
import { actionSheetController  } from '@ionic/vue';

import {obtenerDeudasID} from "../../servicioDB/deudaOperacion"
import {obtenerAbonosDeuda} from "../../servicioDB/abonoOperacion"

import editarDeuda from '../deudas/editarDeuda.vue';
import detallesDeuda from '../deudas/detallesDeuda.vue';
import cardAbonos from '../abonos/cardAbonos.vue';
import eliminarAbono from '../abonos/eliminarAbono.vue';
import editarAbono from '../abonos/editarAbono.vue';
import detallesAbono from '../abonos/detallesAbono.vue'

export default {
    props:['deuda_operacion'],
    mounted(){
        this.obtenerDeuda()
        this.obtenerAbonos()
    },
    data(){
        return{
            datos_deuda:'',
            listado_abonos:[],

            abono_operacion:'',

            VsDetalleDeuda: false,
            VsEditarDeuda:false,
            VsEliminarAbono:false,
            VsEditarAbono:false,
            VsDetallesAbono:false
        }
    },
    methods:{
        close(){
            this.$emit("closeHistorialAbonosDeuda")
        },
        actualizar(){
            this.obtenerDeuda()
            this.obtenerAbonos()
        },
        async obtenerDeuda(){
            try {
                this.datos_deuda = await obtenerDeudasID(this.deuda_operacion.id_deuda)
            } catch (error) {
                console.error("error al obtener  los abonos ")
            }
        },
        async obtenerAbonos(){
            try {
                this.listado_abonos = await obtenerAbonosDeuda(this.deuda_operacion.id_deuda)
            } catch (error) {
                console.error("error al obtener  la deuda ")
            }
        },
        async presentActionSheet() {
      const actionSheet = await actionSheetController.create({
        header: 'Opciones de la deuda',
        buttons: [
          {
            text: 'Ver detalles',
            icon : informationCircle,
            handler: () => {
              this.VsDetalleDeuda = true
            },
          },
          {
            text: 'Editar deuda',
            icon: pencil,
            handler: () => {
                this.VsEditarDeuda = true
            },
          },
          {
            text: 'Cancelar',
            icon: close ,
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
            },
          },
        ],
      });

      await actionSheet.present();
    },
    },
    components:{
        detallesAbono,
        editarAbono,
        eliminarAbono,
        cardAbonos,
        editarDeuda,
        detallesDeuda,
    }
}
</script>