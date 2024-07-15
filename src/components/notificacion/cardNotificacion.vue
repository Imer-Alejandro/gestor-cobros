<template>
    <div class="w-full p-2  mb-[20px] rounded-md bg-white shadow-md flex flex-row h-[80px]">             
        <div class="order-1 flex-col h-full overflow-hidden border-r-[#EFEEEE] border-r-2 w-[60%] ">
            <h3 class="order-1 text-neutral-800 mb-[8px]">{{datos_clientes.nombre}}</h3>
            <h3 class="text-[#464646] font-light  order-2">Total de la deuda: <span class=" text-[#4866EB] ">{{datos_clientes.deuda_general}}</span></h3>
        </div>

        <div class="order-2 flex flex-row w-[40%] justify-center items-center  h-full">
            <button @click="enviarRecordatorio()" class="order-1 flex justify-center mr-[15%] items-center w-[50px] h-[50px]  bg-[#4EC433] rounded">
                <img class="w-[30px] h-[30px]" src="/notificationSentAlert.png">
            </button>

            <button @click="eliminarRecordatorio()" class="order-2 flex justify-center items-center w-[50px] h-[50px] bg-[#E63B52] rounded">
                <img class="w-[30px] h-[30px]" src="/deleteAlertNotification.png">
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props:['datos_clientes'],
    methods:{
        eliminarRecordatorio(){
            this.$emit("openEliminarRecordatorio")
        },
        enviarRecordatorio(){
            this.$emit("enviarRecordatorioCobro")
        }
    }
}
</script>