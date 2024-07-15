<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Detalles deuda</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <section class="w-full p-2">
                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Fecha registro</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{deuda_operacion.fecha_registro}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Estado de la deuda</h3>
                        <div class="order-2 flex items-center justify-center w-auto p-2 rounded-sm bg-[#E81624]" >
                            <h3 >{{deuda_operacion.estado}}</h3>
                        </div>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Total de la deuda</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{deuda_operacion.monto_deuda}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Monto abonado</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{deuda_operacion.monto_deuda - deuda_operacion.monto_pendiente}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Monto pendiente</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{deuda_operacion.monto_pendiente}}</h3>
                    </div>

                    <div class="flex flex-col w-full h-[200px] overflow-hidden overflow-y-scroll pb-2  mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Detalles de la deuda</h3>
                        <p class="text-[#A4A4A4] order-2">
                            {{deuda_operacion.detalles_deuda}}
                        </p>
                    </div>

                </section>
               
            </div>
        </section>
</template>

<script>
export default {
    props:['deuda_operacion'],
    methods:{
        close(){
            this.$emit('closeDetallesDeuda');
        }
    }
}
</script>