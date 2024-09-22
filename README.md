# OpenEdu Demo Keyless

# Setup and running the app
1. Run `npm install` to install the dependencies
2. Run `cp .env .env.local` to create a local file for your environmental variables (so it won't be committed to github)
3. In your .env.local file, uncomment and set the value for GAS_STATION_PLUS_NODE_TESTNET_ACCESS_KEY: your Shinami API access key with rights to Gas Station and Node Service (which you create in your Shinami dashboard: https://app.shinami.com/access-keys)
4. In your .env.local file, uncomment and set the value for VITE_GOOGLE_CLIENT_ID to your Google OAauth client app id.
5. Run `npm run dev` to run the server.  
6. Visit [localhost](http://localhost:3000/) in your browser to use the app.
