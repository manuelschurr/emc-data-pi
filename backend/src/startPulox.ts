//click start
var url = 'https://wifo1-29.bwl.uni-mannheim.de/patient/findNextPatientId'

function httpGet(theURL: string) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theURL, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var pID = httpGet(url);
var spawn = require('child_process');
var child = spawn('python3', ['../pulox.py', 'pID']);

//click end
child.kill('SIGTERM');