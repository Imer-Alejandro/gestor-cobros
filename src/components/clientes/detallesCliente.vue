<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">

        <!-- Contenedor principal -->
            <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
                <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                    <h3 class="text-center order-1 text-[1.5rem] text-black">Detalles del cliente</h3>
                    <button @click="close()" class="order-2 ml-[85%] absolute ">
                        <img class="w-[25px] h-[25px]" src="/cerrar.png" >
                    </button>
                </header>

                <section class="w-full p-2">
                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Nombre del cliente</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{this.cliente_operacion.nombre}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Telefono del cliente</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{this.cliente_operacion.telefono}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Cedula del cliente</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{this.cliente_operacion.cedula}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Dirección del cliente</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{this.cliente_operacion.direccion}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Deuda general</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{this.cliente_operacion.deuda_general}}</h3>
                    </div>

                    <div class="flex flex-col mb-[20px]">
                        <h3 class="text-black order-1 text-[1.3rem] mb-[10px]">Comentario del cliente</h3>
                        <h3 class="text-[#A4A4A4] order-2">{{this.cliente_operacion.comentario}}</h3>
                    </div>

                </section>
               
            </div>
        </section>
</template>

<script>
export default {
    props:['cliente_operacion'],
    methods:{
        close(){
            this.$emit('closeDetallesCliente');
        }
    }
}
</script>