<template>
    <section class="w-full h-full z-40 fixed flex flex-row bg-[#0a0e3480]">
    <!-- Contenedor principal -->
    <div class="w-full h-[90vh] mt-[10vh] pt-[20px] bg-white p-2">
        <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
            <h3 class="text-center order-1 text-[1.5rem] text-black">Resultado de busqueda</h3>
            <button @click="close()" class="order-2 ml-[85%] absolute ">
                <img class="w-[25px] h-[25px]" src="/cerrar.png" >
            </button>
        </header>

        <div class="flex flex-col">
            <section class="flex flex-col w-full mb-[5px]  pb-[20px] p-2">
                <div class="order-1 flex flex-row items-center mb-[10px] ">
                    <h2 class=" order-1 text-neutral-900 text-[1.4rem] mr-[10px] ">Resultados - </h2>
                    <div class="order-2 bg-[#4866EB] rounded-sm flex items-center justify-center p-1">
                        <span class="text-white">{{this.listadoClientesBusqueda.length}}</span>
                    </div>
                </div>
                <h3 class="order-2 text-[0.9rem] text-[#3D3D3D]">nombre de busqueda: <span class="text-[#ACACAC]">{{this.NameBusqueda}}</span></h3>
            </section>

        </div>

        <div class="   w-full pb-[20px] overflow-hidden overflow-y-scroll h-[500px]">
            <div v-for="datosCliente in this.listadoClientesBusqueda" :key="datosCliente.id">
                <cardCliente 
                :datosCliente="datosCliente"
                
                @OpenDetalleCliente="OpenDetalleCliente(datosCliente)"
                @openEditarCliente="openEditarCliente(datosCliente)"
                @openEliminarCliente="openEliminarCliente(datosCliente)"
                @openAbonarCliente="openAbonarCliente(datosCliente)"
                @openNewDeudaCliente="openNewDeudaCliente(datosCliente)"
                @openHistorialCliente="openHistorialCliente(datosCliente)"
                />
            </div>
        </div>
    </div>
    </section>
</template>

<script>
import cardCliente from './cardCliente.vue';


export default {
    props:['NameBusqueda','listadoClientesBusqueda'],
    data(){
        return{
            cliente_operacion:''
        }
    },
    methods:{
        close(){
            this.$emit('closeResultBusqueda')
        },
        OpenDetalleCliente(datosCliente){
            this.$emit('openDetalleClienteResult',datosCliente)
            this.close();  
        },
        openEditarCliente(datosCliente){
            this.$emit('openEditarClienteResult',datosCliente)
            this.close();
        },
        openEliminarCliente(datosCliente){
            this.$emit('openEliminarClienteResult',datosCliente)
            this.close();
        },
        openAbonarCliente(datosCliente){
            this.$emit('openAbonarClienteResult',datosCliente)
            this.close();
        },
        openNewDeudaCliente(datosCliente){
            this.$emit('openNewDeudaClienteResult',datosCliente)
            this.close();
        },
        openHistorialCliente(datosCliente){
            this.$emit('openHistorialClienteResult',datosCliente)
            this.close();
        }
    },
    components:{
        cardCliente,

    }
}
</script>
    