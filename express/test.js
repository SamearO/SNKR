import { resolve } from 'dns';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const spawn = require('child_process').spawn;

const python = spawn('/Library/Frameworks/Python.framework/Versions/3.8/bin/python3', ['./predictor.py']);

python.stdout.on('data', function (data) {
    let result = data.toString();
    console.log(result)
  });
  python.on('close', function (code) {
    console.log("closed with ", {code})
  });
  

