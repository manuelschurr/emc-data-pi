//new patient route --> POST (or GET) trigger

//obtain patientId

var pID = //next avialable patientId

/*var url = 'https://wifo1-29.bwl.uni-mannheim.de/patient/findNextPatientId'

function httpGet(theURL: string) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theURL, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var pID = httpGet(url);*/

//start child process that runs python script when patient is approached first
var spawn = require('child_process');
var child = spawn('python3', ['../pulox.py', 'pID']);




//finish patient route --> POST (or GET) trigger

//kill child process that runs python script after patient is delivered to hospital
child.kill('SIGTERM');