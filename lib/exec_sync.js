const execSync = require('child_process').execSync;

let output = function(input){ 
  return execSync(input , { encoding: 'utf-8' });
}

module.exports = output;

