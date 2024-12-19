# Shopify App Firebase Template

This template is created to facilitate the running of a Shopify app's source code on the Firebase platform, optimizing operations according to Firebase's capabilities.

## Table of Contents

- [Installation](#installation)
- [Environments](#environments)

## Installation

Follow these instructions to install and run the source code in a development environment:

```bash
# Clone the repository
git clone https://github.com/MeowApps-Solutions/Shopify-App-Firebase-Default.git

# Navigate to the project directory
cd shopify-app-firebase-default

# Navigate to functions directory
cd functions

# Install dependencies for functions
npm install

# Navigate to hosting directory
cd hosting

# Install dependencies for hosting
npm install
```

## Environments

### Hosting
Create a ```.env.development``` file with the following content:

```sh
# SHOPIFY PARTNER APP
VITE_SHOPIFY_API_KEY=your-shopify-partner-app-key

# FIREBASE APP
VITE_FIREBASE_API_KEY=your-firebase-hosting-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-hosting-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-hosting-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-hosting-storage-bucket
VITE_FIREBASE_MEASUREMENT_ID=your-firebase-hosting-measurement-id
VITE_FIREBASE_APP_ID=your-firebase-hosting-app-id

# DEVELOPMENT ONLY
VITE_FIREBASE_AUTH_EMULATOR_HOST=http://127.0.0.1:9099/
VITE_DEFAULT_LOCALE=vi
```

### Functions
Create a ```serviceAccount-staging.json``` file with the following content:

```json
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}
```

Create a ```.runtimeconfig.json``` file with the following content:
```json
{
  "dev": {
    "shopify": {
      "api_key": "shopify-app-api-key",
      "api_secret_key": "shopify-app-api-secret",
      "host_name": "shopify-app-hostname"
    }
  },
  "prod": {
    "shopify": {
      "api_key": "",
      "api_secret_key": "",
      "host_name": ""
    }
  }
}
```

### Starting the Project in Development Environment
To start the project in a development environment, run the following commands:

```bash
# Start hosting
cd hosting
npm run dev

# Start functions
cd functions
npm run start:dev
npm run serve

# Use ngrok for tunneling
ngrok http 5000 --domain=your-app.ngrok.app
```

By following these steps, you will have your Shopify app running on the Firebase platform, optimized for development and testing.
