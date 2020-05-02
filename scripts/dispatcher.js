
const { ipcRenderer } = require("electron");
var Convert = require("ansi-to-html");
let options = {
  newline: true,
  escapeXML: false,
  stream: false,
  colors: {
    0: "#000",
    1: "#de382b",
    2: "#39b54a",
    3: "#ffc706",
    4: "#006FB8",
    5: "#762671",
    6: "#2cb5e9",
    7: "#cccccc",
    8: "#808080",
    9: "#ff0000",
    10: "#00ff00",
    11: "#ffff00",
    12: "#0000ff",
    13: "#ff00ff",
    14: "#00ffff",
    15: "#FFF"
  }
};
var convert = new Convert(options);

var output = data => {
  var lines = data.split("\n");
  for (var i = 0; i < lines.length-1; i++) {
    document.getElementById("terminal").innerHTML +=
      "</br>" + convert.toHtml(lines[i]);
  }

  document.getElementById("input-content").innerHTML = lines[lines.length - 1];

  document.getElementById("input-input").focus();
  var div = document.body;
  div.scrollTop = div.clientHeight;
};

ipcRenderer.on("update", (event, data) => {
  output(data);
});

document.body.addEventListener("keyup", function(event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    ipcRenderer.send("command", document.getElementById("input-input").textContent);
    document.getElementById("input-input").textContent = "";
  }else{
     if(document.activeElement !== document.getElementById("input-input")){

    document.getElementById("input-input").focus();}
  }
});
