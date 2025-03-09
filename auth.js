'use strict';
const { google } = require('@googleapis/calendar');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');

const TOKEN_PATH = path.join(os.homedir(), '.kap-calendar-naming', 'token.json');
const CREDENTIALS_PATH = path.join(os.homedir(), '.kap-calendar-naming', 'credentials.json');

// OAuth2 configuration
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  try {
    await fs.mkdir(path.dirname(TOKEN_PATH), { recursive: true });
    await fs.writeFile(TOKEN_PATH, JSON.stringify({
      type: 'authorized_user',
      client_id: client._clientId,
      client_secret: client._clientSecret,
      refresh_token: client.credentials.refresh_token,
    }));
  } catch (err) {
    console.error('Error saving credentials:', err);
  }
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  try {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    
    client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    
    // Generate the url that will be used for authorization
    const authUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    
    console.log('Authorize this app by visiting this url:', authUrl);
    // Note: In a real implementation, you would need to handle the authorization code
    // that Google returns after the user authorizes the application
    
    return client;
  } catch (err) {
    console.error('Error loading client secret file:', err);
    return null;
  }
}

module.exports = { authorize };
