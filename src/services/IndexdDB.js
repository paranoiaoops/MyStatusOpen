const DB_NAME = "MyStatus";
const DB_STORE_NAME = "status";
const DB_VERSION = 1;

let request;
let db;


let sampleData = [
    {
        title : "Sample 1",
        subject: "Sample 1 Data",
        require_exp_point: 7,
        exp: 0
    },
    {
        title : "Sample 2",
        subject: "Sample 2 Data",
        require_exp_point: 10,
        exp: 0
    }
]

function openDb() {
    console.log("openDb ...");
    let req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // ガベージコレクションの問題を避けるため、結果を得る際は
        // "req" より "this" を使用する方がよい
        // db = req.result;
        globalThis.db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        let db2 = evt.target.result;
        let store = evt.target.result.createObjectStore(
            DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

        // sample
        // store.transaction.oncomplete = function(event) {
        //     // 新たに作成した objectStore に値を保存します。
        //     let customerObjectStore = db2.transaction(DB_STORE_NAME, "readwrite").objectStore(DB_STORE_NAME);
        //     for (let i in sampleData) {
        //         customerObjectStore.add(sampleData[i]);
        //     }
        // };
    };
}

openDb();

async function getAll(db, storeName) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction([storeName]);
        const store = tr.objectStore(storeName);
        // 全件取得
        const request = store.getAll();
        request.onsuccess = (ev) => resolve(ev.target.result);
        request.onerror = (err) => reject(err);
    });
}

async function putData(db, storeName, value) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction([storeName], "readwrite");
        const store = tr.objectStore(storeName);
        // ここでデータを追加
        const request = store.put(value);

        tr.oncomplete = () => resolve();
        tr.onerror = (err) => reject(err);
    });
}

async function getByKey (db, storeName, key) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction([storeName]);
        const store = tr.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = (ev) => resolve(request.result);
        request.onerror = (err) => reject(err);
    });
}

async function deleteData(db, storeName, key) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction([storeName], "readwrite");
        const store = tr.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = (ev) => resolve();
        request.onerror = (err) => reject(err);
    });
}

async function addExp(id) {
    let data = {};
    await getByKey(db, DB_STORE_NAME, Number(id)).then((received)=> {
        data = received;
    });
    data.exp = data.exp + 1;
    await putData(db, DB_STORE_NAME, data).then(() => {
        if ((data.exp % data.require_exp_point) == 0 ){
            document.getElementById("information-dialog").showModal();
            document.getElementById("information").innerText = `スキル"${data.title}"のLVが上がりました。\n次のレベルには あと ${data.require_exp_point} の経験が必要です。`
        } else {
            dispatchHashchange();
        }
    });
}

let showDialog = async (id) => {
    document.getElementById("delete-dialog").showModal();
    document.getElementById("exec-delete").addEventListener('click', async () => {
        await deleteData(db, DB_STORE_NAME, Number(id)).then(() => {
            dispatchHashchange();
        })
    });
}

function dispatchHashchange() {
    let event = new Event('hashchange');
    window.dispatchEvent(event);
}