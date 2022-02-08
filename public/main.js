const fs = require('fs-extra')
const path = require('path')
const storage = require("electron-json-storage");
const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 880,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js') // use a preload script
        },
    })
    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
    } else {
        mainWindow.loadURL('http://localhost:3000')
    }
}

const STORE_PATH = app.getPath('userData') // 获取electron应用的用户目录
// 判断路径是否存在，若不存在，就创建
if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
}

storage.setDataPath(path.join(STORE_PATH, '/data.json'));
console.log(`Data stored at ${STORE_PATH}/data.json`)

storage.get('theme', function(error, data) {
    if (error) throw error;
    mainWindow.webContents.on('did-finish-load', ()=>{
        mainWindow.webContents.send('GET_THEME', data);
    })
});

ipcMain.on('SET_THEME', (event, args) => {
    storage.set('theme', { theme: args }, function(error) {
        if (error) throw error;

        storage.get('theme', function(error, data) {
            if (error) throw error;
            mainWindow.webContents.on('did-finish-load', ()=>{
                mainWindow.webContents.send('GET_THEME', data);
            })
        });
    });
});

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})