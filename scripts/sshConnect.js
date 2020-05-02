const { ipcMain } = require('electron')


var Client = require('ssh2').Client;

var connect = (config) => {

 Conn = new Client();

Conn.on('ready', function() {


  Conn.shell(function(err, stream) {

    ipcMain.on('command', (event, arg) => {
      console.log(arg)
      stream.write(arg+'\n');
      })


    if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');
      Conn.end();
    }).on('data', function(data) {
      win.webContents.send('update',data.toString('utf8') );
    });

  });

  //
  // getDirs('/home/'+config.username );

}).connect(config);


}
module.exports = {connect}




var getDirs = (path) =>{
  Conn.sftp(function(err, sftp) {
    if (err) throw err;
    sftp.readdir(path, function(err, list) {
      if (err) throw err;
      console.dir(list);
      return list
    });
  });


}
