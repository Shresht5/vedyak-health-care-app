import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: any;

//         patiantName: "",
//         title: "",
//         note: "",
//         date: new Date(),
//         images: [] ,
//         pdf: [] 

const initDB = async () => {
    if (db) return db;
    db = await SQLite.openDatabase({
        name: 'app.db',
        location: 'default',
    });

    await db.executeSql(
        "CREATE TABLE IF NOT EXISTS reports (  id INTEGER PRIMARY KEY AUTOINCREMENT,patiantName TEXT NOT NULL,title TEXT,note TEXT,date INTEGER,images TEXT, pdf TEXT);"
    );
    return db;
};


/* ---------- CREATE ---------- */
export const addReport = async (report: {
    patiantName: string;
    title: string;
    note: string;
    date: Date;
    images: string[];
    pdf: string[];
}) => {
    const db = await initDB();
    await db.executeSql(
        `INSERT INTO reports (patiantName, title, note, date, images, pdf)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [
            report.patiantName,
            report.title,
            report.note,
            report.date.getTime(),
            JSON.stringify(report.images),
            JSON.stringify(report.pdf),
        ]
    );
};

/* ---------- READ ---------- */
export const getReports = async () => {
    const db = await initDB();
    const [res] = await db.executeSql(`SELECT * FROM reports`);

    return res.rows.raw().map((row: any) => ({
        ...row,
        date: new Date(row.date),
        images: JSON.parse(row.images || '[]'),
        pdf: JSON.parse(row.pdf || '[]'),
    }));
};

export const getReportsTop3 = async () => {
    const db = await initDB();

    const [res] = await db.executeSql(
        `SELECT * FROM reports 
         ORDER BY date DESC 
         LIMIT 3`
    );

    return res.rows.raw().map((row: any) => ({
        ...row,
        date: new Date(row.date),
        images: JSON.parse(row.images || '[]'),
        pdf: JSON.parse(row.pdf || '[]'),
    }));
};

export const getReport = async (id: number) => {
    const db = await initDB();
    const [res] = await db.executeSql(`SELECT * FROM reports WHERE id=?`, [id]);

    if (res.rows.length === 0) return null;
    const row = res.rows.item(0);

    return {
        ...row,
        date: new Date(row.date),
        images: JSON.parse(row.images || '[]'),
        pdf: JSON.parse(row.pdf || '[]'),
    };
};

/* ---------- UPDATE ---------- */
export const updateReport = async (
    id: number,
    report: {
        patiantName: string;
        title: string;
        note: string;
        date: Date;
        images: string[];
        pdf: string[];
    }
) => {
    const db = await initDB();
    await db.executeSql(
        `UPDATE reports
    SET patiantName=?, title=?, note=?, date=?, images=?, pdf=?
    WHERE id=?`,
        [
            report.patiantName,
            report.title,
            report.note,
            report.date.getTime(),
            JSON.stringify(report.images),
            JSON.stringify(report.pdf),
            id,
        ]
    );
};

/* ---------- DELETE ---------- */
export const deleteReport = async (id: number) => {
    const db = await initDB();
    await db.executeSql(`DELETE FROM reports WHERE id=?`, [id]);
};