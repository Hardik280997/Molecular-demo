export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            google_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            password_hash: {
                type: DataTypes.STRING,
            },
            two_factor_enabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            subscription_plan: {
                type: DataTypes.STRING,
                defaultValue: "free",
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "active",
            },
            resetPasswordToken: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            resetPasswordExpires: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            stripe_customer_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            stripe_subscription_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            stripe_plan_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "parent", // Possible values: parent, child, super-admin
            },
            failed_payment_attempts: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            verification_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true,
            }, // Stores the OTP
            otp_expiry: {
                type: DataTypes.DATE,
                allowNull: true,
            }, // OTP expiry time
            trusted_ips: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            }, // Trusted IPs for 2FA bypass
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            parent_id: {
                type: DataTypes.INTEGER, // Parent-child relationship
                allowNull: true, // Null if the user is a parent
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            last_loggedin: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
            profile_picture: {
                type: DataTypes.TEXT
            },
            firstname: {
                type: DataTypes.STRING
            },
            lastname: {
                type: DataTypes.STRING
            },
            company_name: {
                type: DataTypes.STRING
            },
            phone_country_code: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Countries',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            house_no: {
                type: DataTypes.STRING
            },
            country_code: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'Countries',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            state_code: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'States',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            city_code: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'Cities',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            postal_code: {
                type: DataTypes.STRING
            },
            domains: {
                type: DataTypes.JSONB
            },
            is_lifetime_user: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            subscription_date: {
                type: DataTypes.DATE
            },
            chat_gpt_api_key: {
                type: DataTypes.STRING
            },
            chat_gpt_model_name: {
                type: DataTypes.STRING
            },
            chat_gpt_clicks_per_batch: {
                type: DataTypes.INTEGER
            },
            is_special_plan_limit: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            previous_stripe_plan_id: {
                type: DataTypes.STRING
            },
            billing_start_date: {
                type: DataTypes.DATE
            },
            billing_end_date: {
                type: DataTypes.DATE
            },
        },
        {}
    );

    // User.associate = (models) => {
    //     User.belongsTo(models.Price, {
    //         foreignKey: "stripe_plan_id",
    //         targetKey: "stripe_price_id",
    //         as: "price",
    //     });

    //     User.hasMany(models.Domain, { foreignKey: "user_id", onDelete: "CASCADE" });
    //     User.hasMany(models.Alert, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    //     User.hasMany(models.SpecialUserPlanLimit, { foreignKey: "user_id", onDelete: "CASCADE" });
    //     User.belongsTo(models.Countries, { foreignKey: "country_code", targetKey: 'id', onDelete: "CASCADE" });
    //     User.belongsTo(models.States, { foreignKey: "state_code", targetKey: 'id', onDelete: "CASCADE" });
    //     User.belongsTo(models.Cities, { foreignKey: "city_code", targetKey: 'id', onDelete: "CASCADE" });
    //     User.belongsTo(models.Domain, { foreignKey: "domains", targetKey: 'id', onDelete: "CASCADE" });

    //     // User.belongsTo(models.UserPlans, { foreignKey: "plan_id", targetKey: 'id', onDelete: "CASCADE" });
    //     User.hasMany(models.UserPlans, { foreignKey: "user_id", targetKey: 'id', onDelete: "CASCADE" });

    //     // User.hasOne(models.PromoCodes, {
    //     //   foreignKey: "user_id",
    //     //   targetKey: 'id',
    //     // });
    //     // User.hasMany(models.Click, { foreignKey: "user_id", onDelete: "CASCADE" });
    //     User.hasMany(models.BlockedIp, {
    //         foreignKey: "user_id",
    //         onDelete: "CASCADE",
    //     });
    //     User.hasMany(models.BlockedIp, {
    //         targetKey: "id",
    //         foreignKey: "whitelisted_by",
    //         as: "WhitelistUser",
    //     });
    //     // User.hasMany(models.Click, { foreignKey: "user_id", onDelete: "CASCADE" });
    //     // User.hasMany(models.BlockedIp, {
    //     //   foreignKey: "user_id",
    //     //   onDelete: "CASCADE",
    //     // });
    //     User.hasMany(models.Keyword, {
    //         foreignKey: "user_id",
    //         onDelete: "CASCADE",
    //     });
    //     User.hasMany(models.Exclusion, {
    //         foreignKey: "user_id",
    //         onDelete: "CASCADE",
    //     });
    //     User.hasMany(models.ApiLog, { foreignKey: "user_id", onDelete: "CASCADE" });
    //     User.hasMany(models.AuditLog, {
    //         foreignKey: "user_id",
    //         onDelete: "CASCADE",
    //     });
    //     User.hasMany(models.UserNotificationSetting, { foreignKey: "user_id" });
    //     User.hasMany(models.ScriptConfiguration, {
    //         foreignKey: 'user_id',
    //         as: 'scriptConfigurations',
    //     });
    // };

    User.prototype.toJSON = function () {
        const attributes = { ...this.get() };
        // Remove fields before sending to the client
        delete attributes.password_hash;
        delete attributes.resetPasswordToken;
        delete attributes.verification_token;
        delete attributes.otp;
        return attributes;
    };

    return User;
};
