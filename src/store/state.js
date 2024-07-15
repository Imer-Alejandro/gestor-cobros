import { defineStore } from "pinia";
import {obtenerClientes} from '../servicioDB/clienteOperacion'

export const useGlobalStare = defineStore("stateGlobal",{
    state:()=>({
        listadoClientes: []
    }),
    actions:{
        actualizarState(newList){
            this.listadoClientes =newList;
        },
        registrarUsuario(newCliente){
            this.listadoClientes.shift(newCliente);
        },
        async BuscarClientes(){
            try {
                this.listadoClientes = await obtenerClientes();
            } catch (error) {
                console.error("error al cargar los clientes en el estado", error)
            }
        }
    }
})