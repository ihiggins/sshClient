const electron = require('electron');
const { app, BrowserWindow } = require('electron')

function createWindow () {

   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const config = {
  host: '192.168.10.194',
  port: 22,
  username: 'isaac',
  password: 'Higgins090'
};

const sshConnect = require('./scripts/sshConnect.js');

sshConnect.connect(config);
