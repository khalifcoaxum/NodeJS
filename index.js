const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;
 
process.env.UV_THREADPOOL_SIZE = dbConfig.credentials.poolMax + defaultThreadPoolSize;

async function start() {
  try {
    console.log('Starting database');
    await database.initialize(); 
  } catch (err) {
    console.error(err);

    process.exit(1); 
  }
  console.log('Starting application');
  try {
    console.log('Initializing web server');
    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); 
  }
}

start();

async function shutdown(e) {
  let err = e;
    
  console.log('Shutting down');
 
  try {
    console.log('Shutting down web server');
 
    await webServer.close();
  } catch (e) {
    console.log('Encountered error', e);
 
    err = err || e;
  }
 
   try {
    console.log('Shutting down database');
 
    await database.close(); 
  } catch (err) {
    console.log('Encountered error', e);
 
    err = err || e;
  }


  console.log('Exiting');
 
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
 
process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
  shutdown();
});
 
process.on('SIGINT', () => {
  console.log('Received SIGINT');
  shutdown();
});
 
process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);
 
  shutdown(err);
});