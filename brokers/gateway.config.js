import { Middlewares } from 'moleculer';
import os from 'os'

const gatewayConfig = {
    // Unique node identifier. Can be a hostname or any string.
    name: "Gateway Broker",
    // ip: "127.0.0.1",
    nodeID: "gateway-" + (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase() + Date.now(),
    // Log level.
    logLevel: "info",
    hotReload: true,
    cacher: {
        type: "Redis",
        options: {
            // Prefix for keys
            prefix: "MOL",
            // set Time-to-live to 30sec.
            ttl: 30,
            // Turns Redis client monitoring on.
            monitor: false,
            // Redis settings
            cluster: {
                nodes: [
                    { port: 7001, host: "127.0.0.1" },
                    { port: 7002, host: "127.0.0.1" },
                    { port: 7003, host: "127.0.0.1" }
                ],
                options: { /* More information: https://github.com/luin/ioredis#cluster */ }
            }
        }
    },
    registry: {
        discoverer: "redis://127.0.0.1:6379"
    },
    transporter: "redis://127.0.0.1:6379",
    // transporter: "nats://localhost:4222",
    // transporter: {
    //     type: "Redis",
    //     options: {
    //         cluster: {
    //             nodes: [
    //                 { host: "127.0.0.1", port: 7001 },
    //                 { host: "127.0.0.1", port: 7002 },
    //                 { host: "127.0.0.1", port: 7003 },
    //                 { host: "127.0.0.1", port: 7004 },
    //                 { host: "127.0.0.1", port: 7005 },
    //                 { host: "127.0.0.1", port: 7006 }
    //             ],
    //             options: {
    //                 scaleReads: "slave",     // or "master"
    //                 enableReadyCheck: true,
    //                 retryDelayOnFailover: 1000,
    //                 retryDelayOnClusterDown: 1000,
    //                 maxRetriesPerRequest: null,
    //             }
    //         },
    //     }
    // },
    services: [
        "services/gateway/*.service.js"
    ],
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
    },
    // logger: [
    //     {
    //         type: "Console",
    //         options: {
    //             level: "info",
    //         }
    //     },
    //     {
    //         type: "File",
    //         options: {
    //             level: "info",
    //             folder: "/logs/moleculer",
    //             filename: "all-{date}.log",
    //             formatter: "{timestamp} {level} {nodeID}/{mod}: {msg}"
    //         }
    //     },
    //     {
    //         type: "File",
    //         options: {
    //             level: "error",
    //             folder: "/logs/moleculer",
    //             filename: "errors-{date}.json",
    //             formatter: "json"
    //         }
    //     }
    // ],
    middlewares: [
        Middlewares.Debugging.TransitLogger({
            logPacketData: false,
            folder: null,
            colors: {
                send: "magenta",
                receive: "yellow"
            },
            packetFilter: ["HEARTBEAT"]
        })
    ],
    circuitBreaker: {
        enabled: true,
        threshold: 0.5,
        minRequestCount: 20,
        windowTime: 60, // in seconds
        halfOpenTime: 5 * 1000, // in milliseconds
        check: err => err && err.code >= 500
    },
    retryPolicy: {
        enabled: true,
        retries: 5,
        delay: 100,
        maxDelay: 2000,
        factor: 2,
        check: err => err && !!err.retryable
    },
    bulkhead: {
        enabled: true,
        concurrency: 3,
        maxQueueSize: 10,
    }
};

export default gatewayConfig
