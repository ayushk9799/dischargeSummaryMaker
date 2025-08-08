const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // Remove default menu
  Menu.setApplicationMenu(null);

  // In development, load from localhost
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000');
    // Open DevTools if in development
   
  } else {
    // In production, load the built files
     win.loadFile(path.join(__dirname, 'build', 'index.html'));
    // Open DevTools if in development
   
  }

  // Prevent default menu from showing on Alt key press
  win.setAutoHideMenuBar(true);
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
