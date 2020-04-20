// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const open = require('open');
const isDev = require('electron-is-dev');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    minWidth: 1280,
    minHeight: 1024,
    icon: __dirname + './assets/img/phoenix.png',
    //webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
    //}
    webPreferences: {
      nodeIntegration: true,
    }
  })

  mainWindow.webContents.on('will-navigate', function(event, url){
    event.preventDefault();
    open(url);
  });
  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  //mainWindow.loadFile('index.html')

  // Open the DevTools.
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.