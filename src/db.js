import Dexie from 'dexie';

export const db = new Dexie('demo-electron-react-db');

db.version(1).stores({
    Records: '++id, site, account, password',
});

db.open().catch(function(error){
    console.error("ERROR: "+ error);
});