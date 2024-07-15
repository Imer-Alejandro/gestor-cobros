<template>
    <IonPage>
        <div class="bg-[#F9F9F9]  overflow-hidden w-full h-full">
        <HeaderApp :visibilidadBusquedad='true' name="Ajustes"/>
        <footerApp :desplazamiento="true" />
        <!-- Contenido -->
        <section class="p-2 w-full pt-[20px] pb-[80px]">
                <h3 class="text-black  mr-[28%] text-[1.4rem] mb-[30px]">Ajustes generales</h3>
            <form @submit.prevent="registrarDatos()">
                
                <div class="mb-[20px]">
                    <label class="text-[#A4A4A4]">Nombre del negocio</label>
                    <input v-model="datos_negico.nombre_negocio" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="text">
                </div>

                <div class="mb-[20px]">
                    <label class="text-[#A4A4A4]">Dirección del negocio</label>
                    <input v-model="datos_negico.direccion_negocio" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="text">
                </div>

                <div class="mb-[20px]">
                    <label class="text-[#A4A4A4]">Teléfono del negocio</label>
                    <input v-model="datos_negico.telefono_negocio" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm" type="tel">
                </div>

                <div class="mb-[20px]">
                    <label class="text-[#A4A4A4]">Recordatorio de cobros</label>
                    <select v-model="datos_negico.recordatorio" class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm">
                        <option value="Cada dias">Cada dias</option>
                        <option value="Cada 3 dias">Cada 3 dias</option>
                        <option value="Cada 7 dias">Cada 7 dias</option>
                        <option value="cada 15 dias">cada 15 dias</option>
                        <option value="Nunca">Nunca</option>
                    </select>
                </div>
                <button class="bg-[#4866EB] h-[50px] w-full rounded shadow">registrar cambios</button>
            </form>
        </section>
    </div>
    </IonPage>
</template>

<script>
import {  IonPage } from '@ionic/vue';
import footerApp from '../components/generales/footerApp.vue'
import HeaderApp from "../components/generales/HeaderApp.vue"
import { obtenerDatosNegocio,registroDatosNegicio } from "../servicioDB/negocioOperaciones"
export default {
    created(){
        this.obtenerDatos()
    },

    data(){
        return{
            resultDatos:[],
            datos_negico:{
                nombre_negocio:'',
                telefono_negocio:'',
                direccion_negocio:'',
                recordatorio:'Cada dias',
            },
  
        }
    },
    methods:{
        async obtenerDatos(){
            try {
                this.resultDatos = await obtenerDatosNegocio();
                if(this.resultDatos[0] != undefined){
                    this.datos_negico.nombre_negocio=this.resultDatos[0].nombre_negocio
                    this.datos_negico.telefono_negocio=this.resultDatos[0].telefono_negocio
                    this.datos_negico.direccion_negocio=this.resultDatos[0].direccion_negocio
                    this.datos_negico.recordatorio=this.resultDatos[0].recordatorio
                }
            } catch (error) {
                console.error('error al obtener los datos del negico', error)
            }
        },
        async registrarDatos(){
            try {
                await registroDatosNegicio(this.datos_negico);
            } catch (error) {
                console.error('error al registrar los datos del negico', error)
            }
        },
        
    },
    components:{
        HeaderApp,
        footerApp,
        IonPage
    }
}
</script>