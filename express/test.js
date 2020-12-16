import { resolve } from 'dns';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const spawn = require('child_process').spawn;

const python = spawn('python', ['./test.py']);

data = 9;
python.stdin.write(data.toString())



