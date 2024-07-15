<template> 
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Editar deuda</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <form @submit.prevent="editar_deuda()" class="p-2" >
 
                    <div class="mb-[50px]">
                        <label class="text-[#A4A4A4]">Fecha del registro <span class="text-[#E81624]"> *</span> </label>
                        <input v-model="datos_deuda.fecha_registro" required class="w-full outline-none text-black pl-2 h-[50px] bg-[#ECECEC] rounded-sm"   type="datetime-local">
                    </div>

                    <div class="mb-[50px]">
                        <label class="text-[#A4A4A4]">Detalles de la deuda <span class="text-[#E81624]"> *</span></label>
                        <textarea v-model="datos_deuda.detalles_deuda" required maxlength="820"  class="w-full outline-none resize-none text-black p-2 h-[250px] bg-[#ECECEC] rounded-sm" name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <button class="w-full  text-[1.4rem] h-[80px] bg-[#32D53D] rounded-sm shadow-sm">Guardar cambios</button>
                </form>
            </div>
        </section>
</template>

<script>
import {actualizarDeuda} from '../../servicioDB/deudaOperacion'
import {alertController  } from '@ionic/vue'

export default {
    props:['deuda_operacion'],
    mounted(){
        this.convertirFehca(this.deuda_operacion.fecha_registro)
    },
        data(){
        return{
            datos_deuda:{
                id_deuda:this.deuda_operacion.id_deuda,
                fecha_registro:'',
                detalles_deuda:this.deuda_operacion.detalles_deuda
            },
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
            this.$emit("closeEditarDeuda")
        },
        convertirFehca(sqliteDate){
             // Verificar que la entrada es una cadena y cumple con el formato esperado
                const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (typeof sqliteDate !== 'string' || !regex.test(sqliteDate)) {
                    // Retornar null si la fecha no tiene el formato adecuado
                    return this.datos_deuda.fecha_registro = sqliteDate ;
                }

                // Extraer la parte de la fecha y la hora
                const [date, time] = sqliteDate.split(' ');

                // Recortar los segundos de la hora
                const shortTime = time.slice(0, 5);

                // Formatear la fecha y la hora en el formato esperado por el input datetime-local
                const datetimeLocal = `${date}T${shortTime}`;

                this.datos_deuda.fecha_registro = datetimeLocal;
        },
        async editar_deuda(){
            try {
                await actualizarDeuda(this.datos_deuda)
                this.mostrarAlerta("Deuda editada!","se edito la deuda correctamente")
            } catch (error) {
                this.mostrarAlerta("No se puedo editar la deuda","ocurrio un error al editar la deuda")
                console.error("error al editar la deuda",error)
            }finally{
                this.close();
                this.$emit('actualizarClientes')
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