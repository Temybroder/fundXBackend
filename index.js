// SERVER CALL
const server = require('./system/server');

// CHILD PROCESS MANAGER
const worker = require('./core_lib/background_workers');

  worker();
  server();