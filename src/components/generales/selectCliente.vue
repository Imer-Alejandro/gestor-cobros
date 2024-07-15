<template>
    <section class="w-full h-full justify-center items-center z-50 fixed flex bg-[#0a0e3480]">
        <div class="w-[90%] h-[70vh] pt-[20px] bg-white p-2">
            <header class="w-full flex justify-center mb-[20px] flex-row pb-[20px] border-b-[1.5px] border-b-[#D9D9D9]">
                <h3 class="text-center order-1 text-[1.5rem] text-black">Indicar cliente</h3>
                <button @click="close()" class="order-2 ml-[75%] absolute">
                    <img class="w-[25px] h-[25px]" src="/cerrar.png">
                </button>
            </header>
            <form>
                <input v-model="cliente_busqueda" class="h-[40px] pl-2 outline-none bg-[#f5f5f5] border-b-[1.5px] border-b-black text-black rounded-sm border-0 w-full" type="text" placeholder="buscar clientes por nombre...">
            </form>
            <section class="w-full h-[420px] p-1 overflow-hidden overflow-y-scroll pt-[20px]">
                <div v-for="(cliente, index) in clientes_filtrados" :key="index" class="w-full h-[75px] mb-[15px] pb-[5px] flex flex-row p-2 overflow-hidden shadow-lg rounded-sm">
                    <div class="h-full order-1 flex justify-center items-center p-2">
                        <input class="w-[30px] bg-white h-[30px] mr-[5px]" type="checkbox" :checked="index === clienteSeleccionado" @change="selectCliente(index)">
                    </div>
                    <div class="flex order-2 flex-col h-full justify-center border-l-[1.5px] border-l-[#D9D9D9] p-2">
                        <h3 class="text-[#0D0D0D] mb-[3px] order-1">{{ cliente.nombre }}</h3>
                        <h3 class="text-[#A4A4A4] text-[0.8rem] font-light order-2">{{ cliente.comentario }}</h3>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import { obtenerClientes } from '../../servicioDB/clienteOperacion';

export default {
    mounted() {
        this.obtenerClientes();
    },
    data() {
        return {
            cliente_busqueda: '',
            clientes: [],
            clientes_filtrados: [],
            clienteSeleccionado: null,
        };
    },
    watch: {
        cliente_busqueda: function () {
            this.filtrarClientes();
        },
    },
    methods: {
        close() {
            this.$emit('closeSelectCliente');
        },
        async obtenerClientes() {
            try {
                this.clientes = await obtenerClientes();
                this.clientes_filtrados = this.clientes; // Inicializar los clientes filtrados
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        },
        filtrarClientes() {
            if (this.cliente_busqueda === '') {
                this.clientes_filtrados = this.clientes;
            } else {
                const busqueda = this.cliente_busqueda.toLowerCase();
                this.clientes_filtrados = this.clientes.filter(cliente =>
                    cliente.nombre.toLowerCase().includes(busqueda)
                );
            }
        },
        selectCliente(index) {
            if (this.clienteSeleccionado === index) {
                this.clienteSeleccionado = null;
            } else {
                this.clienteSeleccionado = index;
                this.$emit('asignarCliente', this.clientes_filtrados[index]);
                this.close();
            }
        },
    },
};
</script>
