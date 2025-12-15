// moleculer.config.js
"use strict";
import os from 'os'

const config = {
    name: "MainBroker",
    // Unique node identifier. Can be a hostname or any string.
    nodeID: (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase(),
    logger: true,
    logLevel: "info",
    hotReload: true,
    // transporter: process.env.TRANSPORTER || "NATS",
    transporter: "redis://127.0.0.1:6379",
    logger: {
        type: "Console",
        options: {
            // Logging level
            level: "info",
            // Using colors on the output
            colors: true,
            // Print module names with different colors (like docker-compose for containers)
            moduleColors: true,
            // Line formatter. It can be "json", "short", "simple", "full", a `Function` or a template string like "{timestamp} {level} {nodeID}/{mod}: {msg}"
            formatter: "full",
            // Custom object printer. If not defined, it uses the `util.inspect` method.
            objectPrinter: null,
            // Auto-padding the module name in order to messages begin at the same column.
            autoPadding: false
        }
    }
};

export default config
