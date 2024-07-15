import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import {initializeDatabase} from './servicioDB/inicializedb'
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// Crear una instancia de Pinia y la asociamos a la aplicación
const pinia = createPinia();

/* Theme variables */
import './theme/variables.css';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';

// Custom elements registration
customElements.define('jeep-sqlite', JeepSqlite);
console.log('after customElements.define');

// Main event listener for DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
    const platform = Capacitor.getPlatform();

    try {
        console.log(`platform: ${platform}`);

        // Initialize the SQLite service
        const sqlite = new SQLiteConnection(CapacitorSQLite);

        if (platform === "web") {
            // Create the 'jeep-sqlite' Stencil component
            const jeepSqliteEl = document.createElement('jeep-sqlite');
            document.body.appendChild(jeepSqliteEl);
            await customElements.whenDefined('jeep-sqlite');
            console.log(`after customElements.whenDefined`);

            // Initialize the Web store
            await sqlite.initWebStore();
            console.log(`after initWebStore`);
        }

        // Check and initialize the SQLite database
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection("db_vite", false)).result;
        let db = null;

        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_vite", false);
        } else {
            db = await sqlite.createConnection("db_vite", false, "no-encryption", 1, false);
        }

        await db.open();
        console.log(`db: db_vite opened`);

        // Example: create a test table
        const query = `
            CREATE TABLE IF NOT EXISTS test (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL
            );
        `;
        const res = await db.execute(query);
        console.log(`res: ${JSON.stringify(res)}`);

        if (res.changes && res.changes.changes && res.changes.changes < 0) {
            throw new Error(`Error: execute failed`);
        }

        await initializeDatabase(db)

        //closed the connection 
        await sqlite.closeConnection("db_vite", false);
        console.log(`db: db_vite closed`);
        

        // Mount the Vue app
        createApp(App).use(IonicVue).use(pinia).use(router).mount('#app');
    } catch (err) {
        console.log(`Error: ${err}`);
        throw new Error(`Error: ${err}`);
    }
});
