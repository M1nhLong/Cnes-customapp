import { Webhook } from 'node_modules/@shopify/shopify-api/dist/ts/rest/admin/2024-04/webhook';

export type IWebhook = Webhook;

export interface IShopifyMerchant {
  shop: string;
  is_installed: boolean;
  webhooks: IWebhook[];
}

export enum EShopifyRestAPIMandatoryWebhookTopics {
  CUSTOMERS_DATA_REQUEST = 'customers/data_request',
  CUSTOMERS_REDACT = 'customers/redact',
  SHOP_REDACT = 'shop/redact',
}

export enum EShopifyRestAPIWebhookTopics {
  APP_UNINSTALLED = 'app/uninstalled',
  APP_SUBSCRIPTIONS_UPDATE = 'app_subscriptions/update',
  ATTRIBUTED_SESSIONS_FIRST = 'attributed_sessions/first',
  ATTRIBUTED_SESSIONS_LAST = 'attributed_sessions/last',
  BULK_OPERATIONS_FINISH = 'bulk_operations/finish',
  CARTS_CREATE = 'carts/create',
  CARTS_UPDATE = 'carts/update',
  CHANNELS_DELETE = 'channels/delete',
  CHECKOUTS_CREATE = 'checkouts/create',
  CHECKOUTS_DELETE = 'checkouts/delete',
  CHECKOUTS_UPDATE = 'checkouts/update',
  COLLECTION_LISTINGS_ADD = 'collection_listings/add',
  COLLECTION_LISTINGS_REMOVE = 'collection_listings/remove',
  COLLECTION_LISTINGS_UPDATE = 'collection_listings/update',
  COLLECTION_PUBLICATIONS_CREATE = 'collection_publications/create',
  COLLECTION_PUBLICATIONS_DELETE = 'collection_publications/delete',
  COLLECTION_PUBLICATIONS_UPDATE = 'collection_publications/update',
  COLLECTIONS_CREATE = 'collections/create',
  COLLECTIONS_DELETE = 'collections/delete',
  COLLECTIONS_UPDATE = 'collections/update',
  COMPANIES_CREATE = 'companies/create',
  COMPANIES_DELETE = 'companies/delete',
  COMPANIES_UPDATE = 'companies/update',
  COMPANY_CONTACT_ROLES_ASSIGN = 'company_contact_roles/assign',
  COMPANY_CONTACT_ROLES_REVOKE = 'company_contact_roles/revoke',
  COMPANY_CONTACTS_CREATE = 'company_contacts/create',
  COMPANY_CONTACTS_DELETE = 'company_contacts/delete',
  COMPANY_CONTACTS_UPDATE = 'company_contacts/update',
  COMPANY_LOCATIONS_CREATE = 'company_locations/create',
  COMPANY_LOCATIONS_DELETE = 'company_locations/delete',
  COMPANY_LOCATIONS_UPDATE = 'company_locations/update',
  CUSTOMER_GROUPS_CREATE = 'customer_groups/create',
  CUSTOMER_GROUPS_DELETE = 'customer_groups/delete',
  CUSTOMER_GROUPS_UPDATE = 'customer_groups/update',
  CUSTOMER_PAYMENT_METHODS_CREATE = 'customer_payment_methods/create',
  CUSTOMER_PAYMENT_METHODS_REVOKE = 'customer_payment_methods/revoke',
  CUSTOMER_PAYMENT_METHODS_UPDATE = 'customer_payment_methods/update',
  CUSTOMERS_CREATE = 'customers/create',
  CUSTOMERS_DELETE = 'customers/delete',
  CUSTOMERS_DISABLE = 'customers/disable',
  CUSTOMERS_ENABLE = 'customers/enable',
  CUSTOMERS_MERGE = 'customers/merge',
  CUSTOMERS_UPDATE = 'customers/update',
  CUSTOMERS_EMAIL_MARKETING_CONSENT_UPDATE = 'customers_email_marketing_consent/update',
  CUSTOMERS_MARKETING_CONSENT_UPDATE = 'customers_marketing_consent/update',
  DISCOUNTS_CREATE = 'discounts/create',
  DISCOUNTS_DELETE = 'discounts/delete',
  DISCOUNTS_REDEEMCODE_ADDED = 'discounts/redeemcode_added',
  DISCOUNTS_REDEEMCODE_REMOVED = 'discounts/redeemcode_removed',
  DISCOUNTS_UPDATE = 'discounts/update',
  DISPUTES_CREATE = 'disputes/create',
  DISPUTES_UPDATE = 'disputes/update',
  DOMAINS_CREATE = 'domains/create',
  DOMAINS_DESTROY = 'domains/destroy',
  DOMAINS_UPDATE = 'domains/update',
  DRAFT_ORDERS_CREATE = 'draft_orders/create',
  DRAFT_ORDERS_DELETE = 'draft_orders/delete',
  DRAFT_ORDERS_UPDATE = 'draft_orders/update',
  FULFILLMENT_EVENTS_CREATE = 'fulfillment_events/create',
  FULFILLMENT_EVENTS_DELETE = 'fulfillment_events/delete',
  FULFILLMENT_ORDERS_CANCELLATION_REQUEST_ACCEPTED = 'fulfillment_orders/cancellation_request_accepted',
  FULFILLMENT_ORDERS_CANCELLATION_REQUEST_REJECTED = 'fulfillment_orders/cancellation_request_rejected',
  FULFILLMENT_ORDERS_CANCELLATION_REQUEST_SUBMITTED = 'fulfillment_orders/cancellation_request_submitted',
  FULFILLMENT_ORDERS_CANCELLED = 'fulfillment_orders/cancelled',
  FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_ACCEPTED = 'fulfillment_orders/fulfillment_request_accepted',
  FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_REJECTED = 'fulfillment_orders/fulfillment_request_rejected',
  FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_SUBMITTED = 'fulfillment_orders/fulfillment_request_submitted',
  FULFILLMENT_ORDERS_FULFILLMENT_SERVICE_FAILED_TO_COMPLETE = 'fulfillment_orders/fulfillment_service_failed_to_complete',
  FULFILLMENT_ORDERS_HOLD_RELEASED = 'fulfillment_orders/hold_released',
  FULFILLMENT_ORDERS_LINE_ITEMS_PREPARED_FOR_LOCAL_DELIVERY = 'fulfillment_orders/line_items_prepared_for_local_delivery',
  FULFILLMENT_ORDERS_LINE_ITEMS_PREPARED_FOR_PICKUP = 'fulfillment_orders/line_items_prepared_for_pickup',
  FULFILLMENT_ORDERS_MERGED = 'fulfillment_orders/merged',
  FULFILLMENT_ORDERS_MOVED = 'fulfillment_orders/moved',
  FULFILLMENT_ORDERS_ORDER_ROUTING_COMPLETE = 'fulfillment_orders/order_routing_complete',
  FULFILLMENT_ORDERS_PLACED_ON_HOLD = 'fulfillment_orders/placed_on_hold',
  FULFILLMENT_ORDERS_RESCHEDULED = 'fulfillment_orders/rescheduled',
  FULFILLMENT_ORDERS_SCHEDULED_FULFILLMENT_ORDER_READY = 'fulfillment_orders/scheduled_fulfillment_order_ready',
  FULFILLMENT_ORDERS_SPLIT = 'fulfillment_orders/split',
  FULFILLMENTS_CREATE = 'fulfillments/create',
  FULFILLMENTS_UPDATE = 'fulfillments/update',
  INVENTORY_ITEMS_CREATE = 'inventory_items/create',
  INVENTORY_ITEMS_DELETE = 'inventory_items/delete',
  INVENTORY_ITEMS_UPDATE = 'inventory_items/update',
  INVENTORY_LEVELS_CONNECT = 'inventory_levels/connect',
  INVENTORY_LEVELS_DISCONNECT = 'inventory_levels/disconnect',
  INVENTORY_LEVELS_UPDATE = 'inventory_levels/update',
  LOCALES_CREATE = 'locales/create',
  LOCALES_UPDATE = 'locales/update',
  LOCATIONS_ACTIVATE = 'locations/activate',
  LOCATIONS_CREATE = 'locations/create',
  LOCATIONS_DEACTIVATE = 'locations/deactivate',
  LOCATIONS_DELETE = 'locations/delete',
  LOCATIONS_UPDATE = 'locations/update',
  MARKETS_CREATE = 'markets/create',
  MARKETS_DELETE = 'markets/delete',
  MARKETS_UPDATE = 'markets/update',
  ORDER_TRANSACTIONS_CREATE = 'order_transactions/create',
  ORDERS_CANCELLED = 'orders/cancelled',
  ORDERS_CREATE = 'orders/create',
  ORDERS_DELETE = 'orders/delete',
  ORDERS_EDITED = 'orders/edited',
  ORDERS_FULFILLED = 'orders/fulfilled',
  ORDERS_PAID = 'orders/paid',
  ORDERS_PARTIALLY_FULFILLED = 'orders/partially_fulfilled',
  ORDERS_SHOPIFY_PROTECT_ELIGIBILITY_CHANGED = 'orders/shopify_protect_eligibility_changed',
  ORDERS_UPDATED = 'orders/updated',
  PAYMENT_SCHEDULES_DUE = 'payment_schedules/due',
  PAYMENT_TERMS_CREATE = 'payment_terms/create',
  PAYMENT_TERMS_DELETE = 'payment_terms/delete',
  PAYMENT_TERMS_UPDATE = 'payment_terms/update',
  PRODUCT_FEEDS_CREATE = 'product_feeds/create',
  PRODUCT_FEEDS_FULL_SYNC = 'product_feeds/full_sync',
  PRODUCT_FEEDS_INCREMENTAL_SYNC = 'product_feeds/incremental_sync',
  PRODUCT_FEEDS_UPDATE = 'product_feeds/update',
  PRODUCT_LISTINGS_ADD = 'product_listings/add',
  PRODUCT_LISTINGS_REMOVE = 'product_listings/remove',
  PRODUCT_LISTINGS_UPDATE = 'product_listings/update',
  PRODUCT_PUBLICATIONS_CREATE = 'product_publications/create',
  PRODUCT_PUBLICATIONS_DELETE = 'product_publications/delete',
  PRODUCT_PUBLICATIONS_UPDATE = 'product_publications/update',
  PRODUCTS_CREATE = 'products/create',
  PRODUCTS_DELETE = 'products/delete',
  PRODUCTS_UPDATE = 'products/update',
  PROFILES_CREATE = 'profiles/create',
  PROFILES_DELETE = 'profiles/delete',
  PROFILES_UPDATE = 'profiles/update',
  REFUNDS_CREATE = 'refunds/create',
  SCHEDULED_PRODUCT_LISTINGS_ADD = 'scheduled_product_listings/add',
  SCHEDULED_PRODUCT_LISTINGS_REMOVE = 'scheduled_product_listings/remove',
  SCHEDULED_PRODUCT_LISTINGS_UPDATE = 'scheduled_product_listings/update',
  SELLING_PLAN_GROUPS_CREATE = 'selling_plan_groups/create',
  SELLING_PLAN_GROUPS_DELETE = 'selling_plan_groups/delete',
  SELLING_PLAN_GROUPS_UPDATE = 'selling_plan_groups/update',
  SHIPPING_ADDRESSES_CREATE = 'shipping_addresses/create',
  SHIPPING_ADDRESSES_UPDATE = 'shipping_addresses/update',
  SHOP_UPDATE = 'shop/update',
  SUBSCRIPTION_BILLING_ATTEMPTS_CHALLENGED = 'subscription_billing_attempts/challenged',
  SUBSCRIPTION_BILLING_ATTEMPTS_FAILURE = 'subscription_billing_attempts/failure',
  SUBSCRIPTION_BILLING_ATTEMPTS_SUCCESS = 'subscription_billing_attempts/success',
  SUBSCRIPTION_BILLING_CYCLE_EDITS_CREATE = 'subscription_billing_cycle_edits/create',
  SUBSCRIPTION_BILLING_CYCLE_EDITS_DELETE = 'subscription_billing_cycle_edits/delete',
  SUBSCRIPTION_BILLING_CYCLE_EDITS_UPDATE = 'subscription_billing_cycle_edits/update',
  SUBSCRIPTION_BILLING_CYCLES_SKIP = 'subscription_billing_cycles/skip',
  SUBSCRIPTION_BILLING_CYCLES_UNSKIP = 'subscription_billing_cycles/unskip',
  SUBSCRIPTION_CONTRACTS_ACTIVATE = 'subscription_contracts/activate',
  SUBSCRIPTION_CONTRACTS_CANCEL = 'subscription_contracts/cancel',
  SUBSCRIPTION_CONTRACTS_CREATE = 'subscription_contracts/create',
  SUBSCRIPTION_CONTRACTS_EXPIRE = 'subscription_contracts/expire',
  SUBSCRIPTION_CONTRACTS_FAIL = 'subscription_contracts/fail',
  SUBSCRIPTION_CONTRACTS_PAUSE = 'subscription_contracts/pause',
  SUBSCRIPTION_CONTRACTS_UPDATE = 'subscription_contracts/update',
  TENDER_TRANSACTIONS_CREATE = 'tender_transactions/create',
  THEMES_CREATE = 'themes/create',
  THEMES_DELETE = 'themes/delete',
  THEMES_PUBLISH = 'themes/publish',
  THEMES_UPDATE = 'themes/update',
  VARIANTS_IN_STOCK = 'variants/in_stock',
  VARIANTS_OUT_OF_STOCK = 'variants/out_of_stock',
}

export interface IShopifyShop {
  id: number;
  name: string;
  email: string;
  domain: string;
  province: string | null;
  country: string;
  address1: string | null;
  zip: string | null;
  city: string | null;
  source: string | null;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  primary_locale: string;
  address2: string | null;
  created_at: string;
  updated_at: string;
  country_code: string;
  country_name: string;
  currency: string;
  customer_email: string;
  timezone: string;
  iana_timezone: string;
  shop_owner: string;
  money_format: string;
  money_with_currency_format: string;
  weight_unit: string;
  province_code: string | null;
  taxes_included: boolean;
  auto_configure_tax_inclusivity: boolean | null;
  tax_shipping: boolean | null;
  county_taxes: boolean;
  plan_display_name: string;
  plan_name: string;
  has_discounts: boolean;
  has_gift_cards: boolean;
  myshopify_domain: string;
  google_apps_domain: string | null;
  google_apps_login_enabled: boolean | null;
  money_in_emails_format: string;
  money_with_currency_in_emails_format: string;
  eligible_for_payments: boolean;
  requires_extra_payments_agreement: boolean;
  password_enabled: boolean;
  has_storefront: boolean;
  finances: boolean;
  primary_location_id: number;
  checkout_api_supported: boolean;
  multi_location_enabled: boolean;
  setup_required: boolean;
  pre_launch_enabled: boolean;
  enabled_presentment_currencies: string[];
  transactional_sms_disabled: boolean;
  marketing_sms_consent_enabled_at_checkout: boolean;
}
