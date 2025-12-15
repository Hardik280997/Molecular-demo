const greeterService = {
    name: "greeter",
    actions: {
        async hello(ctx) {
            const result = await ctx.call("greeter.welcome", { name: "hardik" });
            console.log('result', result);

            return "Hello Moleculer " + result;
        },
        welcome: {
            params: {
                name: "string"
            },
            handler(ctx) {
                return `Welcome ${ctx?.params?.name}`
            }
        },
    },
    methods: {

    }
}

export default greeterService