import Dexie from 'dexie';

export const db = new Dexie('demo-electron-react-db');

db.version(1).stores({
    Records: '++id, date, part, move, capacity, num, set',
});

db.open().catch(function(error){
    console.error("ERROR: "+ error);
});