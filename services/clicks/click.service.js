import { Sequelize } from "sequelize"
import DbAdapter from "../../utils/dbAdapter.js"
import axios from "axios";
import { UAParser } from "@ua-parser-js/pro-business";
import { Bots } from '@ua-parser-js/pro-business/extensions'
import { isAIBot, isBot, isFrozenUA } from '@ua-parser-js/pro-business/helpers'

const clickService = {
    name: "clicks",
    mixins: [DbAdapter],
    model: {
        name: "Clicks",
        define: {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            click_id: {
                type: Sequelize.STRING,
            },
            domain_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: "Domains", // Links to Domains table
                    key: "domain_id",
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            ip_address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            timestamp: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            source: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            utm_parameters: {
                type: Sequelize.JSONB,
                allowNull: true,
            },
            bot_detection: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            blocked: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            conversion: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            time_on_site: {
                type: Sequelize.INTEGER,
            },
            geodata: {
                type: Sequelize.JSONB,
            },
            tracking_id: {
                type: Sequelize.STRING
            },
            visitor_type: {
                type: Sequelize.STRING,
            },
            bounce: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            landing_page: {
                type: Sequelize.STRING,
            },
            screen_width: {
                type: Sequelize.INTEGER
            },
            screen_height: {
                type: Sequelize.INTEGER
            },
            color_depth: {
                type: Sequelize.INTEGER
            },
            touch_enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            utm_source: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            utm_medium: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            utm_campaign: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            utm_term: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            kw_matchtype: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            placement: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            referrer: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            ads_click_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            ads_campaign_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            // mm_proxy: {
            //   type: Sequelize.BOOLEAN,
            //   defaultValue: false
            // },
            // mm_hosting_provider: {
            //   type: Sequelize.BOOLEAN,
            //   defaultValue: false
            // },
            // mm_asn: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_organization: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_isp: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // connection_type: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // user_type: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_continent: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_country: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_isocode: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_region: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_regioncode: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_city: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            // mm_postcode: {
            //   type: Sequelize.INTEGER,
            //   allowNull: true,
            // },
            // mm_timezone: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
            risk_score: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            pc_proxy: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            pc_type: {
                type: Sequelize.STRING
            },
            pc_provider: {
                type: Sequelize.STRING
            },
            pc_organization: {
                type: Sequelize.STRING
            },
            pc_continent: {
                type: Sequelize.STRING
            },
            pc_country: {
                type: Sequelize.STRING
            },
            pc_country_code: {
                type: Sequelize.STRING
            },
            pc_region: {
                type: Sequelize.STRING
            },
            pc_region_code: {
                type: Sequelize.STRING
            },
            pc_city: {
                type: Sequelize.STRING
            },
            ppc_network: {
                type: Sequelize.STRING
            },
            internal_bot_score: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            bot_reason: {
                type: Sequelize.STRING
            },
            device_id: {
                type: Sequelize.STRING
            },
            click_count: {
                type: Sequelize.INTEGER
            },
            blocked_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: "BlockedIp",
                    key: "block_id",
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            bots_detection_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: "BotDetectionLog",
                    key: "id",
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            operating_system: {
                type: Sequelize.STRING,
            },

            user_agent: {
                type: Sequelize.STRING,
            },
            browser_name: {
                type: Sequelize.STRING,
            },

            pc_asn: {
                type: Sequelize.STRING,
            },
            pc_ip_range: {
                type: Sequelize.STRING,
            },
            pc_continentcode: {
                type: Sequelize.STRING,
            },
            pc_timezone: {
                type: Sequelize.STRING,
            },
            pc_latitude: {
                type: Sequelize.DOUBLE,
            },
            pc_longitude: {
                type: Sequelize.DOUBLE,
            },
            pc_currency: {
                type: Sequelize.JSONB,
            },
            pc_devices: {
                type: Sequelize.JSONB,
            },

            rir: {
                type: Sequelize.STRING,
            },
            is_bogon: {
                type: Sequelize.BOOLEAN,
            },
            is_mobile: {
                type: Sequelize.BOOLEAN,
            },
            is_satellite: {
                type: Sequelize.BOOLEAN,
            },
            is_crawler: {
                type: Sequelize.STRING,
            },
            is_datacenter: {
                type: Sequelize.BOOLEAN,
            },
            is_tor: {
                type: Sequelize.BOOLEAN,
            },
            is_proxy: {
                type: Sequelize.BOOLEAN,
            },
            is_vpn: {
                type: Sequelize.BOOLEAN,
            },
            is_abuser: {
                type: Sequelize.BOOLEAN,
            },

            vpn_service: {
                type: Sequelize.STRING,
            },
            vpn_url: {
                type: Sequelize.STRING,
            },
            vpn_type: {
                type: Sequelize.STRING,
            },
            vpn_last_seen: {
                type: Sequelize.STRING,
            },
            vpn_last_seen_str: {
                type: Sequelize.STRING,
            },
            vpn_exit_node_region: {
                type: Sequelize.STRING,
            },
            vpn_country_code: {
                type: Sequelize.STRING,
            },
            vpn_city_name: {
                type: Sequelize.STRING,
            },
            vpn_latitude: {
                type: Sequelize.DOUBLE,
            },
            vpn_longitude: {
                type: Sequelize.DOUBLE,
            },

            dc_datacenter: {
                type: Sequelize.STRING,
            },
            dc_domain: {
                type: Sequelize.STRING,
            },
            dc_service: {
                type: Sequelize.STRING,
            },
            dc_network: {
                type: Sequelize.STRING,
            },
            dc_network_border_group: {
                type: Sequelize.STRING,
            },
            dc_code: {
                type: Sequelize.STRING,
            },
            dc_country: {
                type: Sequelize.STRING,
            },
            dc_state: {
                type: Sequelize.STRING,
            },
            dc_region: {
                type: Sequelize.STRING,
            },
            dc_city: {
                type: Sequelize.STRING,
            },

            company_name: {
                type: Sequelize.STRING,
            },
            company_abuser_score: {
                type: Sequelize.STRING,
            },
            company_domain: {
                type: Sequelize.STRING,
            },
            company_type: {
                type: Sequelize.STRING,
            },
            company_network: {
                type: Sequelize.STRING,
            },
            company_whois: {
                type: Sequelize.STRING,
            },

            abuse_name: {
                type: Sequelize.STRING,
            },
            abuse_address: {
                type: Sequelize.STRING,
            },
            abuse_country: {
                type: Sequelize.STRING,
            },
            abuse_email: {
                type: Sequelize.STRING,
            },
            abuse_phone: {
                type: Sequelize.STRING,
            },

            ip_asn: {
                type: Sequelize.INTEGER,
            },
            asn_abuser_score: {
                type: Sequelize.STRING,
            },
            asn_route: {
                type: Sequelize.STRING,
            },
            asn_descr: {
                type: Sequelize.STRING,
            },
            asn_country: {
                type: Sequelize.STRING,
            },
            asn_active: {
                type: Sequelize.STRING,
            },
            asn_org: {
                type: Sequelize.STRING,
            },
            asn_domain: {
                type: Sequelize.STRING,
            },
            asn_abuse: {
                type: Sequelize.STRING,
            },
            asn_type: {
                type: Sequelize.STRING,
            },
            asn_created: {
                type: Sequelize.STRING,
            },
            asn_updated: {
                type: Sequelize.STRING,
            },
            asn_rir: {
                type: Sequelize.STRING,
            },
            asn_whois: {
                type: Sequelize.STRING,
            },

            location_is_eu_member: {
                type: Sequelize.BOOLEAN,
            },
            location_calling_code: {
                type: Sequelize.STRING,
            },
            location_currency_code: {
                type: Sequelize.STRING,
            },
            location_continent: {
                type: Sequelize.STRING,
            },
            location_country: {
                type: Sequelize.STRING,
            },
            location_country_code: {
                type: Sequelize.STRING,
            },
            location_state: {
                type: Sequelize.STRING,
            },
            location_city: {
                type: Sequelize.STRING,
            },
            location_latitude: {
                type: Sequelize.DOUBLE,
            },
            location_longitude: {
                type: Sequelize.DOUBLE,
            },
            location_zip: {
                type: Sequelize.STRING,
            },
            location_timezone: {
                type: Sequelize.STRING,
            },
            location_local_time: {
                type: Sequelize.STRING,
            },
            location_local_time_unix: {
                type: Sequelize.STRING,
            },
            location_is_dst: {
                type: Sequelize.BOOLEAN,
            },

            browser_engine: {
                type: Sequelize.STRING,
            },
            cpu_architecture: {
                type: Sequelize.STRING,
            },
            device_type: {
                type: Sequelize.STRING,
            },
            device_model: {
                type: Sequelize.STRING,
            },
            device_vendor: {
                type: Sequelize.STRING,
            },
            is_ai_bot: {
                type: Sequelize.BOOLEAN,
            },
            is_bot: {
                type: Sequelize.BOOLEAN,
            },
            client_device_id: {
                type: Sequelize.STRING,
            },
            is_honey_pot: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            honey_pot_value: {
                type: Sequelize.STRING,
            },
            is_form_filled: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            form_data: {
                type: Sequelize.JSONB,
            },
            is_js_enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_dark_traffic: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_crawler_ua: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_frozen_ua: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
            gpt_analyzed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            analyzed_timestamp: {
                type: Sequelize.DATE,
            },
            is_crawlers: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
        },
        options: {
            createdAt: false,
            updatedAt: false
        }
    },
    settings: {
        fields: ["id", "timestamp", "ip_address", "visitor_type"]
    },
    actions: {
        getAllClicks: {
            async handler(ctx) {

                const userData = await ctx.call("v2.users.getAllUsers");
                console.log('userData', userData);

                return this.adapter.find(ctx);
            }
        },
        lists: {
            async handler(ctx) {
                const clickList = await this.adapter.find({
                    options: {
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                });
                return clickList
            }
        },
        createUser: {
            async handler(ctx) {
                const domainId = ctx?.params?.id
                const {
                    queryParams,
                    ip,
                    timestamp,
                    adsSourceType,
                    trackingId,
                    visitorType,
                    timeOnSite,
                    reason,
                    isConversionURL
                } = ctx?.params?.data;
                const data = ctx?.params?.data
                const formattedQueryParams = formatQueryParams(queryParams)
                const UA = new UAParser(data?.user_agent);
                const parserUaData = await UA.getResult().withFeatureCheck()
                const botParser = new UAParser(Bots);
                const parserBotData = await botParser.setUA(data?.user_agent).getResult().withFeatureCheck()

                const storeData = {
                    domain_id: domainId,
                    ip_address: ip,
                    time_on_site: timeOnSite,
                    utm_parameters: formattedQueryParams,
                    blocked: reason ? true : false,
                    // geodata: formattedData,
                    tracking_id: trackingId,
                    visitor_type: visitorType,
                    // bounce: false,
                    conversion: isConversionURL,
                    screen_width: data?.screenWidth,
                    screen_height: data?.screenHeight,
                    color_depth: data?.colorDepth,
                    touch_enabled: data?.touchEnabled,
                    referrer: data?.referrer,
                    device_id: data?.deviceId,
                    client_device_id: data?.deviceIdFromClient,
                    bot_detection: data?.botDetected,
                    bot_reason: data?.botReason,
                    utm_source: queryParams?.['utm_source'],
                    utm_medium: queryParams?.['utm_medium'],
                    utm_campaign: queryParams?.['utm_campaign'],
                    utm_term: queryParams?.['utm_term'],
                    kw_matchtype: queryParams?.['match'],
                    placement: queryParams?.['placement'],
                    operating_system: parserBotData?.os?.name ?? parserUaData?.os?.name ?? data?.device_operating_system,
                    user_agent: parserBotData?.ua ?? parserUaData?.ua ?? data?.user_agent,
                    browser_name: parserBotData?.browser?.name ?? parserUaData?.browser?.name ?? data?.browser_name,
                    browser_engine: parserBotData?.engine?.name ?? parserUaData?.engine?.name,
                    cpu_architecture: parserBotData?.cpu?.architecture ?? parserUaData?.cpu?.architecture,
                    device_type: parserBotData?.device?.type ?? parserUaData?.device?.type,
                    device_model: parserBotData?.device?.model ?? parserUaData?.device?.model,
                    device_vendor: parserBotData?.device?.vendor ?? parserUaData?.device?.vendor,
                    is_crawler_ua: parserBotData?.browser?.type === 'crawler' || parserBotData?.browser?.type === 'fetcher',
                    is_frozen_ua: isFrozenUA(data?.user_agent),
                    is_ai_bot: isAIBot(data?.user_agent),
                    is_bot: isBot(data?.user_agent),
                    source: adsSourceType ?? null,
                    ads_click_id: queryParams['gclid'] || queryParams['gclid_token'] || queryParams['msclkid'] || queryParams['msclkid_token'] || queryParams['fbclid'] || queryParams['fbclid_token'],
                    ads_campaign_id: queryParams['g_campaignid'] || queryParams['m_campaignid'] || queryParams['fb_campaignid'] || queryParams['gad_campaignid'],
                    ppc_network: queryParams.gclid || queryParams.gclid_token ? 'Google' :
                        queryParams.msclkid || queryParams.msclkid_token ? 'Microsoft' :
                            queryParams.fbclid || queryParams.fbclid_token ? 'Meta' : null,

                    // ('gclid' in queryParams || 'gclid_token' in queryParams) && (queryParams['gclid'] || queryParams['gclid_token']) ? 'Google' :
                    // 'msclkid' in queryParams && queryParams['msclkid'] ? 'Microsoft' :
                    // 'fbclid' in queryParams && queryParams['fbclid'] ? 'Meta' : null,
                    // honey_pot_value: data?.honeyPotValue,
                    // is_honey_pot: data?.honeyPotValue && data.honeyPotValue ? true : false, // Commented as updating directly from input field
                    is_js_enabled: data?.isJsEnabled && data.isJsEnabled ? true : false,
                    is_dark_traffic: data?.isDarkTraffic && data.isDarkTraffic,
                    is_crawlers: data?.is_crawlers,
                    // blocked_id: data?.blocked_id
                }

                if (ctx?.params?.proxycheckdata) {
                    const proxycheckData = ctx?.params?.proxycheckdata[ip]
                    storeData['risk_score'] = proxycheckData?.risk
                    storeData['pc_proxy'] = proxycheckData?.proxy === 'yes' ? true : false
                    storeData['pc_type'] = proxycheckData?.type
                    storeData['pc_provider'] = proxycheckData?.provider
                    storeData['pc_organization'] = proxycheckData?.organisation
                    storeData['pc_continent'] = proxycheckData?.continent
                    storeData['pc_continentcode'] = proxycheckData?.continentcode
                    storeData['pc_country'] = proxycheckData?.country
                    storeData['pc_country_code'] = proxycheckData?.isocode
                    storeData['pc_region'] = proxycheckData?.region
                    storeData['pc_region_code'] = proxycheckData?.regioncode
                    storeData['pc_city'] = proxycheckData?.city
                    storeData['pc_latitude'] = proxycheckData?.latitude
                    storeData['pc_longitude'] = proxycheckData?.longitude
                    storeData['pc_currency'] = proxycheckData?.currency
                    storeData['pc_devices'] = proxycheckData?.devices
                    storeData['pc_timezone'] = proxycheckData?.timezone
                    storeData['pc_asn'] = proxycheckData?.asn
                    storeData['pc_ip_range'] = proxycheckData?.range
                }

                if (ctx.params?.ipApiData) {
                    const ipApiData = ctx.params?.ipApiData
                    storeData['rir'] = ipApiData?.rir
                    storeData['is_bogon'] = ipApiData?.is_bogon
                    storeData['is_mobile'] = ipApiData?.is_mobile
                    storeData['is_satellite'] = ipApiData?.is_satellite
                    storeData['is_crawler'] = ipApiData?.is_crawler ?? 'false'
                    storeData['is_datacenter'] = ipApiData?.is_datacenter
                    storeData['is_tor'] = ipApiData?.is_tor
                    storeData['is_proxy'] = ipApiData?.is_proxy
                    storeData['is_vpn'] = ipApiData?.is_vpn
                    storeData['is_abuser'] = ipApiData?.is_abuser

                    storeData['vpn_service'] = ipApiData?.vpn?.service
                    storeData['vpn_url'] = ipApiData?.vpn?.url
                    storeData['vpn_type'] = ipApiData?.vpn?.type
                    storeData['vpn_last_seen'] = ipApiData?.vpn?.last_seen
                    storeData['vpn_last_seen_str'] = ipApiData?.vpn?.last_seen_str
                    storeData['vpn_exit_node_region'] = ipApiData?.vpn?.exit_node_region
                    storeData['vpn_country_code'] = ipApiData?.vpn?.country_code
                    storeData['vpn_city_name'] = ipApiData?.vpn?.city_name
                    storeData['vpn_latitude'] = ipApiData?.vpn?.latitude
                    storeData['vpn_longitude'] = ipApiData?.vpn?.longitude

                    storeData['dc_datacenter'] = ipApiData?.datacenter?.datacenter
                    storeData['dc_domain'] = ipApiData?.datacenter?.domain
                    storeData['dc_service'] = ipApiData?.datacenter?.service
                    storeData['dc_network'] = ipApiData?.datacenter?.network
                    storeData['dc_network_border_group'] = ipApiData?.datacenter?.network_border_group
                    storeData['dc_code'] = ipApiData?.datacenter?.code
                    storeData['dc_country'] = ipApiData?.datacenter?.country
                    storeData['dc_state'] = ipApiData?.datacenter?.state
                    storeData['dc_region'] = ipApiData?.datacenter?.region
                    storeData['dc_city'] = ipApiData?.datacenter?.city

                    storeData['company_name'] = ipApiData?.company?.name
                    storeData['company_abuser_score'] = ipApiData?.company?.abuser_score
                    storeData['company_domain'] = ipApiData?.company?.domain
                    storeData['company_type'] = ipApiData?.company?.type
                    storeData['company_network'] = ipApiData?.company?.network
                    storeData['company_whois'] = ipApiData?.company?.whois

                    storeData['abuse_name'] = ipApiData?.abuse?.name
                    storeData['abuse_address'] = ipApiData?.abuse?.address
                    storeData['abuse_country'] = ipApiData?.abuse?.country
                    storeData['abuse_email'] = ipApiData?.abuse?.email
                    storeData['abuse_phone'] = ipApiData?.abuse?.phone

                    storeData['ip_asn'] = ipApiData?.asn?.asn
                    storeData['asn_abuser_score'] = ipApiData?.asn?.abuser_score
                    storeData['asn_route'] = ipApiData?.asn?.route
                    storeData['asn_descr'] = ipApiData?.asn?.descr
                    storeData['asn_country'] = ipApiData?.asn?.country
                    storeData['asn_active'] = ipApiData?.asn?.active
                    storeData['asn_org'] = ipApiData?.asn?.org
                    storeData['asn_domain'] = ipApiData?.asn?.domain
                    storeData['asn_abuse'] = ipApiData?.asn?.abuse
                    storeData['asn_type'] = ipApiData?.asn?.type
                    storeData['asn_created'] = ipApiData?.asn?.created
                    storeData['asn_updated'] = ipApiData?.asn?.updated
                    storeData['asn_rir'] = ipApiData?.asn?.rir
                    storeData['asn_whois'] = ipApiData?.asn?.whois

                    storeData['location_is_eu_member'] = ipApiData?.location?.is_eu_member
                    storeData['location_calling_code'] = ipApiData?.location?.calling_code
                    storeData['location_currency_code'] = ipApiData?.location?.currency_code
                    storeData['location_continent'] = ipApiData?.location?.continent
                    storeData['location_country'] = ipApiData?.location?.country
                    storeData['location_country_code'] = ipApiData?.location?.country_code
                    storeData['location_state'] = ipApiData?.location?.state
                    storeData['location_city'] = ipApiData?.location?.city
                    storeData['location_latitude'] = ipApiData?.location?.latitude
                    storeData['location_longitude'] = ipApiData?.location?.longitude
                    storeData['location_zip'] = ipApiData?.location?.zip
                    storeData['location_timezone'] = ipApiData?.location?.timezone
                    storeData['location_local_time'] = ipApiData?.location?.local_time
                    storeData['location_local_time_unix'] = ipApiData?.location?.local_time_unix
                    storeData['location_is_dst'] = ipApiData?.location?.is_dst
                }

                const clickDetails = await this.adapter.model.create(storeData)

                return clickDetails

                function formatQueryParams(params) {
                    if (!params || Object.keys(params).length === 0) {
                        return;
                    }
                    if (
                        Object.keys(params).length === 1 &&
                        params.message === "No query parameters found"
                    ) {
                        return null; // Return null to indicate no valid parameters for the database
                    }
                    return Object.entries(params)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ");
                }
            }
        },
        updateUser: {
            fallback: (ctx, err) => "Some cached result",
            async handler(ctx) {
                const domainId = ctx?.params?.id
                const clickId = ctx?.params?.data?.click_id
                const {
                    queryParams,
                    ip,
                    timestamp,
                    adsSourceType,
                    trackingId,
                    visitorType,
                    timeOnSite,
                    reason,
                    isConversionURL
                } = ctx?.params?.data;
                const data = ctx?.params?.data
                const formattedQueryParams = formatQueryParams(queryParams)
                const UA = new UAParser(data?.user_agent);
                const parserUaData = await UA.getResult().withFeatureCheck()
                const botParser = new UAParser(Bots);
                const parserBotData = await botParser.setUA(data?.user_agent).getResult().withFeatureCheck()

                const storeData = {
                    domain_id: domainId,
                    ip_address: ip,
                    time_on_site: timeOnSite,
                    utm_parameters: formattedQueryParams,
                    blocked: reason ? true : false,
                    // geodata: formattedData,
                    tracking_id: trackingId,
                    visitor_type: visitorType,
                    // bounce: false,
                    conversion: isConversionURL,
                    screen_width: data?.screenWidth,
                    screen_height: data?.screenHeight,
                    color_depth: data?.colorDepth,
                    touch_enabled: data?.touchEnabled,
                    referrer: data?.referrer,
                    device_id: data?.deviceId,
                    client_device_id: data?.deviceIdFromClient,
                    bot_detection: data?.botDetected,
                    bot_reason: data?.botReason,
                    utm_source: queryParams?.['utm_source'],
                    utm_medium: queryParams?.['utm_medium'],
                    utm_campaign: queryParams?.['utm_campaign'],
                    utm_term: queryParams?.['utm_term'],
                    kw_matchtype: queryParams?.['match'],
                    placement: queryParams?.['placement'],
                    operating_system: parserBotData?.os?.name ?? parserUaData?.os?.name ?? data?.device_operating_system,
                    user_agent: parserBotData?.ua ?? parserUaData?.ua ?? data?.user_agent,
                    browser_name: parserBotData?.browser?.name ?? parserUaData?.browser?.name ?? data?.browser_name,
                    browser_engine: parserBotData?.engine?.name ?? parserUaData?.engine?.name,
                    cpu_architecture: parserBotData?.cpu?.architecture ?? parserUaData?.cpu?.architecture,
                    device_type: parserBotData?.device?.type ?? parserUaData?.device?.type,
                    device_model: parserBotData?.device?.model ?? parserUaData?.device?.model,
                    device_vendor: parserBotData?.device?.vendor ?? parserUaData?.device?.vendor,
                    is_crawler_ua: parserBotData?.browser?.type === 'crawler' || parserBotData?.browser?.type === 'fetcher',
                    is_frozen_ua: isFrozenUA(data?.user_agent),
                    is_ai_bot: isAIBot(data?.user_agent),
                    is_bot: isBot(data?.user_agent),
                    source: adsSourceType ?? null,
                    ads_click_id: queryParams['gclid'] || queryParams['gclid_token'] || queryParams['msclkid'] || queryParams['msclkid_token'] || queryParams['fbclid'] || queryParams['fbclid_token'],
                    ads_campaign_id: queryParams['g_campaignid'] || queryParams['m_campaignid'] || queryParams['fb_campaignid'] || queryParams['gad_campaignid'],
                    ppc_network: queryParams.gclid || queryParams.gclid_token ? 'Google' :
                        queryParams.msclkid || queryParams.msclkid_token ? 'Microsoft' :
                            queryParams.fbclid || queryParams.fbclid_token ? 'Meta' : null,

                    // ('gclid' in queryParams || 'gclid_token' in queryParams) && (queryParams['gclid'] || queryParams['gclid_token']) ? 'Google' :
                    // 'msclkid' in queryParams && queryParams['msclkid'] ? 'Microsoft' :
                    // 'fbclid' in queryParams && queryParams['fbclid'] ? 'Meta' : null,
                    // honey_pot_value: data?.honeyPotValue,
                    // is_honey_pot: data?.honeyPotValue && data.honeyPotValue ? true : false, // Commented as updating directly from input field
                    is_js_enabled: data?.isJsEnabled && data.isJsEnabled ? true : false,
                    is_dark_traffic: data?.isDarkTraffic && data.isDarkTraffic,
                    is_crawlers: data?.is_crawlers,
                    // blocked_id: data?.blocked_id
                }

                if (ctx?.params?.proxycheckdata) {
                    const proxycheckData = ctx?.params?.proxycheckdata[ip]
                    storeData['risk_score'] = proxycheckData?.risk
                    storeData['pc_proxy'] = proxycheckData?.proxy === 'yes' ? true : false
                    storeData['pc_type'] = proxycheckData?.type
                    storeData['pc_provider'] = proxycheckData?.provider
                    storeData['pc_organization'] = proxycheckData?.organisation
                    storeData['pc_continent'] = proxycheckData?.continent
                    storeData['pc_continentcode'] = proxycheckData?.continentcode
                    storeData['pc_country'] = proxycheckData?.country
                    storeData['pc_country_code'] = proxycheckData?.isocode
                    storeData['pc_region'] = proxycheckData?.region
                    storeData['pc_region_code'] = proxycheckData?.regioncode
                    storeData['pc_city'] = proxycheckData?.city
                    storeData['pc_latitude'] = proxycheckData?.latitude
                    storeData['pc_longitude'] = proxycheckData?.longitude
                    storeData['pc_currency'] = proxycheckData?.currency
                    storeData['pc_devices'] = proxycheckData?.devices
                    storeData['pc_timezone'] = proxycheckData?.timezone
                    storeData['pc_asn'] = proxycheckData?.asn
                    storeData['pc_ip_range'] = proxycheckData?.range
                }

                if (ctx.params?.ipApiData) {
                    const ipApiData = ctx.params?.ipApiData
                    storeData['rir'] = ipApiData?.rir
                    storeData['is_bogon'] = ipApiData?.is_bogon
                    storeData['is_mobile'] = ipApiData?.is_mobile
                    storeData['is_satellite'] = ipApiData?.is_satellite
                    storeData['is_crawler'] = ipApiData?.is_crawler ?? 'false'
                    storeData['is_datacenter'] = ipApiData?.is_datacenter
                    storeData['is_tor'] = ipApiData?.is_tor
                    storeData['is_proxy'] = ipApiData?.is_proxy
                    storeData['is_vpn'] = ipApiData?.is_vpn
                    storeData['is_abuser'] = ipApiData?.is_abuser

                    storeData['vpn_service'] = ipApiData?.vpn?.service
                    storeData['vpn_url'] = ipApiData?.vpn?.url
                    storeData['vpn_type'] = ipApiData?.vpn?.type
                    storeData['vpn_last_seen'] = ipApiData?.vpn?.last_seen
                    storeData['vpn_last_seen_str'] = ipApiData?.vpn?.last_seen_str
                    storeData['vpn_exit_node_region'] = ipApiData?.vpn?.exit_node_region
                    storeData['vpn_country_code'] = ipApiData?.vpn?.country_code
                    storeData['vpn_city_name'] = ipApiData?.vpn?.city_name
                    storeData['vpn_latitude'] = ipApiData?.vpn?.latitude
                    storeData['vpn_longitude'] = ipApiData?.vpn?.longitude

                    storeData['dc_datacenter'] = ipApiData?.datacenter?.datacenter
                    storeData['dc_domain'] = ipApiData?.datacenter?.domain
                    storeData['dc_service'] = ipApiData?.datacenter?.service
                    storeData['dc_network'] = ipApiData?.datacenter?.network
                    storeData['dc_network_border_group'] = ipApiData?.datacenter?.network_border_group
                    storeData['dc_code'] = ipApiData?.datacenter?.code
                    storeData['dc_country'] = ipApiData?.datacenter?.country
                    storeData['dc_state'] = ipApiData?.datacenter?.state
                    storeData['dc_region'] = ipApiData?.datacenter?.region
                    storeData['dc_city'] = ipApiData?.datacenter?.city

                    storeData['company_name'] = ipApiData?.company?.name
                    storeData['company_abuser_score'] = ipApiData?.company?.abuser_score
                    storeData['company_domain'] = ipApiData?.company?.domain
                    storeData['company_type'] = ipApiData?.company?.type
                    storeData['company_network'] = ipApiData?.company?.network
                    storeData['company_whois'] = ipApiData?.company?.whois

                    storeData['abuse_name'] = ipApiData?.abuse?.name
                    storeData['abuse_address'] = ipApiData?.abuse?.address
                    storeData['abuse_country'] = ipApiData?.abuse?.country
                    storeData['abuse_email'] = ipApiData?.abuse?.email
                    storeData['abuse_phone'] = ipApiData?.abuse?.phone

                    storeData['ip_asn'] = ipApiData?.asn?.asn
                    storeData['asn_abuser_score'] = ipApiData?.asn?.abuser_score
                    storeData['asn_route'] = ipApiData?.asn?.route
                    storeData['asn_descr'] = ipApiData?.asn?.descr
                    storeData['asn_country'] = ipApiData?.asn?.country
                    storeData['asn_active'] = ipApiData?.asn?.active
                    storeData['asn_org'] = ipApiData?.asn?.org
                    storeData['asn_domain'] = ipApiData?.asn?.domain
                    storeData['asn_abuse'] = ipApiData?.asn?.abuse
                    storeData['asn_type'] = ipApiData?.asn?.type
                    storeData['asn_created'] = ipApiData?.asn?.created
                    storeData['asn_updated'] = ipApiData?.asn?.updated
                    storeData['asn_rir'] = ipApiData?.asn?.rir
                    storeData['asn_whois'] = ipApiData?.asn?.whois

                    storeData['location_is_eu_member'] = ipApiData?.location?.is_eu_member
                    storeData['location_calling_code'] = ipApiData?.location?.calling_code
                    storeData['location_currency_code'] = ipApiData?.location?.currency_code
                    storeData['location_continent'] = ipApiData?.location?.continent
                    storeData['location_country'] = ipApiData?.location?.country
                    storeData['location_country_code'] = ipApiData?.location?.country_code
                    storeData['location_state'] = ipApiData?.location?.state
                    storeData['location_city'] = ipApiData?.location?.city
                    storeData['location_latitude'] = ipApiData?.location?.latitude
                    storeData['location_longitude'] = ipApiData?.location?.longitude
                    storeData['location_zip'] = ipApiData?.location?.zip
                    storeData['location_timezone'] = ipApiData?.location?.timezone
                    storeData['location_local_time'] = ipApiData?.location?.local_time
                    storeData['location_local_time_unix'] = ipApiData?.location?.local_time_unix
                    storeData['location_is_dst'] = ipApiData?.location?.is_dst
                }

                const clickDetails = await this.adapter.model.update(storeData, {
                    where: {
                        id: clickId
                    }
                })

                return clickDetails

                function formatQueryParams(params) {
                    if (!params || Object.keys(params).length === 0) {
                        return;
                    }
                    if (
                        Object.keys(params).length === 1 &&
                        params.message === "No query parameters found"
                    ) {
                        return null; // Return null to indicate no valid parameters for the database
                    }
                    return Object.entries(params)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ");
                }
            }
        }
    },
    hooks: {
        before: {
            "createUser|updateUser": [async function (ctx) {
                const { ip } = ctx.params?.data;
                try {
                    const res = await axios.get(`https://proxycheck.io/v2/${ip}?key=385451b0eaeb3fb69666294c4621d0b05630c8b44e2dca218cff86ef3ffdf3c4&vpn=1&asn=1&risk=1`);
                    ctx.params.proxycheckdata = res.data
                    if (res.data.status !== 'ok') {
                        throw new Error("Proxy Check failed to get the response");
                    }

                    const response = await axios.get(`https://app.clickbuddha.com/ipapi/?ip=${ip}`);
                    ctx.params.ipApiData = response.data

                } catch (err) {
                    console.log('err', err);

                    // Any error from API or validation will block insertion
                    throw new Error("Failed to validate email: " + err.message);
                }
            }]
        }
    }
}

export default clickService