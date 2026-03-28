import SQLite from 'react-native-sqlite-storage';
import { cancelMedicationNotification, scheduleMedicationNotification } from '../../utils/Notification';

SQLite.enablePromise(true);

let db: any;


//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   medicationName TEXT NOT NULL,
//   frequency TEXT,
//   schedule TEXT,        -- JSON string
//   timing INTEGER,       -- timestamp
//   started INTEGER,      -- timestamp
//   stock INTEGER,
//   notification INTEGER  -- 0 / 1

export const initDB = async () => {
    if (db) return db;
    db = await SQLite.openDatabase({
        name: 'app.db',
        location: 'default',
    });

    await db.executeSql(
        "CREATE TABLE IF NOT EXISTS medications (  id INTEGER PRIMARY KEY AUTOINCREMENT,medicationName TEXT NOT NULL,frequency TEXT,schedule TEXT,timing INTEGER,started INTEGER, stock INTEGER,notification INTEGER);"
    );
    return db;
};

// INSERT
export const addMedication = async (medication: {
    medicationName: string;
    frequency: string;
    schedule: { label: string; dose: number }[];
    timing: Date;
    started: Date;
    stock: number;
    notification: boolean;
}) => {
    await initDB();
    const [result] = await db.executeSql(
        `INSERT INTO medications 
     (medicationName, frequency, schedule, timing, started, stock, notification)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            medication.medicationName,
            medication.frequency,
            JSON.stringify(medication.schedule),
            medication.timing.getTime(),
            medication.started.getTime(),
            medication.stock,
            medication.notification ? 1 : 0,
        ]
    );

    const id = result.insertId;
    if (medication.notification && id != null) {
        await scheduleMedicationNotification(
            id,
            medication.medicationName,
            medication.timing
        );
    }
};

// READ
export const getMedications = async () => {
    await initDB();

    const [res] = await db.executeSql('SELECT * FROM medications');

    return res.rows.raw().map((row: any) => ({
        ...row,
        schedule: JSON.parse(row.schedule),
        timing: new Date(row.timing),
        started: new Date(row.started),
        notification: Boolean(row.notification),
    }));
};

export const getUpcomingMedications = async () => {
    const db = await initDB();

    const now = Date.now();

    const [res] = await db.executeSql(
        `SELECT * FROM medications
         WHERE timing >= ?
         ORDER BY timing ASC
         LIMIT 3`,
        [now]
    );

    return res.rows.raw().map((row: any) => ({
        ...row,
        schedule: JSON.parse(row.schedule),
        timing: new Date(row.timing),
        started: new Date(row.started),
        notification: Boolean(row.notification),
    }));
};

export const getMedicationById = async (id: number) => {
    await initDB();

    const [res] = await db.executeSql(
        'SELECT * FROM medications WHERE id = ?',
        [id]
    );

    if (res.rows.length === 0) return null;

    const row = res.rows.item(0);

    return {
        ...row,
        schedule: JSON.parse(row.schedule),
        timing: new Date(row.timing),
        started: new Date(row.started),
        notification: row.notification === 1,
    };
};

// UPDATE
export const updateMedication = async (
    id: number,
    medication: {
        medicationName: string;
        frequency: string;
        schedule: { label: string; dose: number }[];
        timing: Date;
        started: Date;
        stock: number;
        notification: boolean;
    }
) => {
    const db = await initDB();

    await db.executeSql(
        `UPDATE medications
     SET medicationName=?,
         frequency=?,
         schedule=?,
         timing=?,
         started=?,
         stock=?,
         notification=?
     WHERE id=?`,
        [
            medication.medicationName,
            medication.frequency,
            JSON.stringify(medication.schedule),
            medication.timing.getTime(),
            medication.started.getTime(),
            medication.stock,
            medication.notification ? 1 : 0,
            id,
        ]
    );
    // 🔔 Handle notification update
    await cancelMedicationNotification(id);

    if (medication.notification) {
        await scheduleMedicationNotification(
            id,
            medication.medicationName,
            medication.timing
        );
    }
};

// DELETE
export const deleteMedication = async (id: number) => {
    const db = await initDB();

    await cancelMedicationNotification(id);
    await db.executeSql(
        'DELETE FROM medications WHERE id=?',
        [id]
    );
};