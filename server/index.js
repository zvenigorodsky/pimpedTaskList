const {startServer, configureServer} = require('./server');

const port= 3000;
const start = async() => {
    await configureServer();
    startServer(port);
}

start();