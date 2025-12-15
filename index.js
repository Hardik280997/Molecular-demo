import { ServiceBroker } from 'moleculer';
// import config from './moleculer.config.js'
import os from 'os'

const clickConfig = {
    // Unique node identifier. Can be a hostname or any string.
    name: "Clicks Broker",
    nodeID: "clicks-" + (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase(),
    // Log level.
    logLevel: "info",
    hotReload: true
};

const userConfig = {
    name: "Users Broker",
    // Unique node identifier. Can be a hostname or any string.
    nodeID: "users-" + (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase(),
    // Log level.
    logLevel: "info",
    hotReload: true
};

const clickBroker = new ServiceBroker(clickConfig)

const userBroker = new ServiceBroker(userConfig)

// Loads all the services
clickBroker.loadServices("./services/clicks", "*.service.js");

userBroker.loadServices("./services/users", "*.service.js");

// load API Gateway
// broker.createService(ApiGatewayService)

// broker.start()
//     .then(() => console.log('Broker Started'))
//     .catch((err) => console.log(`Error: Broker Stopped ${err?.message}`));

Promise.all([clickBroker.start(), userBroker.start()])
    .then(() => console.log("All Broker Started"))
    .catch((error) => console.error('Error: While Broker Starting ' + error));
