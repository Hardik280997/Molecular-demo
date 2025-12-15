import { Sequelize } from "sequelize"
import DbAdapter from "../../utils/dbAdapter.js"

const userService = {
    name: "users",
    version: 2,
    mixins: [DbAdapter],
    model: {
        name: "Users",
        define: {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            google_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            password_hash: {
                type: Sequelize.STRING,
            },
            two_factor_enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            subscription_plan: {
                type: Sequelize.STRING,
                defaultValue: "free",
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: "active",
            },
            resetPasswordToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            resetPasswordExpires: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            stripe_customer_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            stripe_subscription_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            stripe_plan_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "parent", // Possible values: parent, child, super-admin
            },
            failed_payment_attempts: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            verification_token: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            otp: {
                type: Sequelize.STRING,
                allowNull: true,
            }, // Stores the OTP
            otp_expiry: {
                type: Sequelize.DATE,
                allowNull: true,
            }, // OTP expiry time
            trusted_ips: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: [],
            }, // Trusted IPs for 2FA bypass
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            parent_id: {
                type: Sequelize.INTEGER, // Parent-child relationship
                allowNull: true, // Null if the user is a parent
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            last_loggedin: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
            },
            profile_picture: {
                type: Sequelize.TEXT
            },
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            company_name: {
                type: Sequelize.STRING
            },
            phone_country_code: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Countries',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            house_no: {
                type: Sequelize.STRING
            },
            country_code: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'Countries',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            state_code: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'States',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            city_code: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'Cities',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            postal_code: {
                type: Sequelize.STRING
            },
            domains: {
                type: Sequelize.JSONB
            },
            is_lifetime_user: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            subscription_date: {
                type: Sequelize.DATE
            },
            chat_gpt_api_key: {
                type: Sequelize.STRING
            },
            chat_gpt_model_name: {
                type: Sequelize.STRING
            },
            chat_gpt_clicks_per_batch: {
                type: Sequelize.INTEGER
            },
            is_special_plan_limit: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            previous_stripe_plan_id: {
                type: Sequelize.STRING
            },
            billing_start_date: {
                type: Sequelize.DATE
            },
            billing_end_date: {
                type: Sequelize.DATE
            },
        }
    },
    settings: {
        fields: ["id", "username", "name", "email", "firstname", "lastname"]
    },
    actions: {
        getAllUsers: {
            handler(ctx) {
                // The built-in find method from moleculer-db can be called
                // You can call it directly within the handler or rely on the default actions.
                return this.adapter.find(ctx);
            }
        },
        lists: {
            async handler(ctx) {
                const userlist = await this.adapter.find(ctx, {});
                return userlist
            }
        }
    }
}

export default userService