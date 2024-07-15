import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

class SQLiteService {
  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.db = null;
  }

  async openConnection() {
    try {
      const ret = await this.sqlite.checkConnectionsConsistency();
      const platform = Capacitor.getPlatform();
      const isConn = (await this.sqlite.isConnection("db_vite", platform === 'web')).result;

      if (ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection("db_vite", platform === 'web');
      } else {
        this.db = await this.sqlite.createConnection("db_vite", platform === 'web', "no-encryption", 1, false);
      }
      await this.db.open();
      console.log('db: db_vite opened');
    } catch (error) {
      console.error('Error opening database connection:', error);
      throw new Error('Error opening database connection');
    }
  }

  async closeConnection() {
    try {
      if (this.db) {
        await this.db.close();
        console.log('db: db_vite closed');
      }
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw new Error('Error closing database connection');
    }
  }

  getConnection() {
    return this.sqlite;
  }

  getDb() {
    return this.db;
  }
}

const sqliteService = new SQLiteService();
export default sqliteService;