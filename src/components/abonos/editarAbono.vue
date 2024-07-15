<template> 
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">


        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Editar abono</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <form @submit.prevent="editarAbonoDeLaDeuda()" class="p-2" >

                    <div class="mb-[50px]">
                        <label class="text-[#A4A4A4]">Monto abonado <span class="text-[#E81624]"> *</span> </label>
                        <input v-model="datos_abono.monto" required class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm" step="any"  type="number">
                    </div>

                    <div class="mb-[50px]">
                        <label class="text-[#A4A4A4]">Fecha del registro <span class="text-[#E81624]"> *</span> </label>
                        <input v-model="datos_abono.fecha" required class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="datetime-local">
                    </div>

                    <div class="mb-[50px]">
                        <label class="text-[#A4A4A4]">Comentario del abono </label>
                        <textarea v-model="datos_abono.comentario"  maxlength="150"  class="w-full outline-none resize-none text-black p-2 h-[100px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <button class="w-full  text-[1.4rem] h-[80px] bg-[#32D53D] rounded-sm shadow-sm">Guardar cambios</button>
                </form>
            </div>
        </section>
</template> 
 
<script>
import {alertController  } from '@ionic/vue'
import {obtenerDeudasID} from '../../servicioDB/deudaOperacion'
import {editarAbono} from '../../servicioDB/abonoOperacion'

export default {
    props:['abono_operacion'],
    mounted(){
        this.convertirFehca(this.abono_operacion.fecha_registro)
        this.obtener_deuda()
    },
    data(){
        return{
            datos_abono:{
                id_abono:this.abono_operacion.id_abono,
                monto:this.abono_operacion.monto_abono,
                monto_original:this.abono_operacion.monto_abono,
                comentario:this.abono_operacion.comentario,
                fecha:'',
                id_deuda:this.abono_operacion.id_deuda,
                MontoPendienteDeuda:''
            },
            deuda_abono:'',

            alerta: {
                isOpen: false,
                header: '',
                message: '',
                buttons: ['OK']
            }
        }
    },
    methods:{ 
        close(){
            this.$emit("closeEditarAbono")
        },
        convertirFehca(sqliteDate){
             // Verificar que la entrada es una cadena y cumple con el formato esperado
                const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (typeof sqliteDate !== 'string' || !regex.test(sqliteDate)) {
                    // Retornar null si la fecha no tiene el formato adecuado
                    return this.datos_abono.fecha = sqliteDate ;
                }

                // Extraer la parte de la fecha y la hora
                const [date, time] = sqliteDate.split(' ');
 
                // Recortar los segundos de la hora
                 const shortTime = time.slice(0, 5);

                // Formatear la fecha y la hora en el formato esperado por el input datetime-local
                const datetimeLocal = `${date}T${shortTime}`;

                this.datos_abono.fecha = datetimeLocal;
        },
        async obtener_deuda(){
            try {
                this.deuda_abono = await obtenerDeudasID(this.abono_operacion.id_deuda)
                this.datos_abono.MontoPendienteDeuda= this.deuda_abono[0].monto_pendiente
            } catch (error) {
                console.error("error al obtener la deuda",error)
            }
        },
       
            async editarAbonoDeLaDeuda(){
                if (this.monto > this.deuda_abono[0].monto_pendiente ) {
                    this.mostrarAlerta("error de registro","el abono no puede ser mayor a la deuda")
                }else{
                    try {
                        await editarAbono(this.datos_abono)
                        this.mostrarAlerta("abono editado!","se edito correctamente el abono de la deuda")
                    } catch (error) {
                        this.mostrarAlerta("error al editar el abono!","no se puedo editar correctamente el abono")
                        console.error("error al editar el abono",error)
                    }finally{
                        this.$emit("actualizarAbonos")
                        this.close()
                    }
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
    },

}
</script>