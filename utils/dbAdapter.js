import DbService from "moleculer-db"
import SqlAdapter from "moleculer-db-adapter-sequelize"

const connectionConfig = new SqlAdapter(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
})

const DbAdapter = {
    mixins: [DbService],
    adapter: connectionConfig,
    // collection
    settings: {
        // Optional: Moleculer DB mixin settings
    },
    methods: {
        // Optional: Common database methods
    },
}

export default DbAdapter