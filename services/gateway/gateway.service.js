import ApiGatewayService from "moleculer-web"

const gatewayService = {
    name: "api",
    mixins: [ApiGatewayService],
    settings: {
        port: 5000,
        // Exposed IP
        ip: "0.0.0.0",

        // Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
        use: [],
        routes: [
            {
                path: '/',
                whitelist: ["**"],
                mappingPolicy: "all",
                aliases: {
                    "GET /~node/actions": "$node.actions",
                    "GET /~node/options": "$node.options",
                    "GET /~node/services": "$node.services",
                    "GET /~node/list": "$node.list",
                },
            },
            {
                path: "/users",
                aliases: {
                    "GET /lists": "v2.users.getAllUsers",
                    "GET /list": "v2.users.list"
                },
                whitelist: ["**"],
                // When using multiple routes you should explicitly
                // set the body parser(s) for each route.
                bodyParsers: {
                    json: true,
                    urlencoded: { extended: true }
                }
            },
            {
                path: "/clicks",
                aliases: {
                    "GET /lists": "clicks.getAllClicks",
                    "GET /list": "clicks.list",
                    "GET /count": "clicks.count",
                    "POST /create/:id": "clicks.createUser",
                    "POST /update/:id": "clicks.updateUser"
                },
                whitelist: ["**"],
                // When using multiple routes you should explicitly
                // set the body parser(s) for each route.
                bodyParsers: {
                    json: true,
                    urlencoded: { extended: true }
                }
            },
        ],
        assets: {
            folder: "public",

            // Options to `server-static` module
            options: {},
        },
    },
    actions: {
        myAction() {

        }
    }
}

export default gatewayService