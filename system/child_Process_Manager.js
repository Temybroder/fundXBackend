const childProcess = require('child_process');
const os = require('os');
const numOfCPUS = os.cpus().length;

// BACKGROUND WORKERS
const bg_workers = require('../core_lib/background_workers');
const reporters = require('../core_lib/reporters')

const _pre_children_pool = [bg_workers, reporters];
let _main_children_pool = [];

const child_Proc_Manager = () => {

    for (let i = 0; i < numOfCPUS.length - 2; i++){
        // Fork the individual processes
     
      }
      
}
module.exports = child_Proc_Manager;