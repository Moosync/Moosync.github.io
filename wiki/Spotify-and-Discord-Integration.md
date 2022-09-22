---
layout: page
permalink: /wiki/integrations
index: 1
---

# 3rd party Integrations

## Enabling Spotify integration

Due to restrictions from Spotify, a public api key could not be integrated into the app.
Due to this, each user will be required to generate an API key for themselves.

### Creating an app on Spotify developer portal

Head over to the [Spotify developer dashboard](https://developer.spotify.com/dashboard/applications) and create a new application

After creating a new app, click on the newly created app and you will be taken to a new page listing your **Client ID** and **Client Secret**. Note these down as they will be used later.

Click on **Edit Settings** button on top-right and add the following URLs into **Redirect URI** field:

- <http://localhost:8080>
- <http://localhost>
- <https://moosync.app/spotify>

These URLs are required to allow fetching a token from the Spotify OAuth2 code.

If you feel moosync.app is suspicious, don't worry you can check out its code [here](https://github.com/Moosync/Moosync.github.io)

Now you can head over to Moosync app and click on Settings. Under Settings > System you will find text fields for **Spotify Client ID** and **Spotify Client Secret**.

Paste the string you copied earlier into these fields. Now you should be able to log in to your Spotify account.

You can add your alternate accounts under **Users and Access** and use the same Client ID and Client Secret for multiple users.


## Enabling Youtube integration

Due to restrictions from Youtube, a public API key could not be integrated into the app.
Due to this, each user will be required to generate an API key for themselves.

### Creating a project on Google cloud console

- Head over to [Google console create project](https://console.cloud.google.com/projectcreate). 

- Enter a project name and press "Create".
![Cloud console new app](/assets/img/cloud_console_new_app.png)

### Enabling Youtube API
- Click on "+ ENABLE APIS AND SERVICES" button at top of the dashboard.

- Search for youtube and select "YouTube Data API v3"
  ![Cloud console search API](/assets/img/cloud_console_search_api.png). 

- Click on the "ENABLE" button. You'll then be redirected to "API/Service Details" dashboard.

### Configuring consent screen
- Select "OAuth consent screen" on the left sidebar and select "Configure Consent screen".

- Select "External" and press "CREATE"
  ![Cloud console oauth consent](/assets/img/cloud_console_oauth_consent.png)

- Fill in required details.  
  ![Cloud console app details](/assets/img/cloud_console_oauth_app_details.png)

- Under "Authorized domains", input "moosync.app"
  ![Cloud console authorized domain](/assets/img/cloud_console_oauth_authorized_domain.png)

- Press "SAVE AND CONTINUE"

- Press on "ADD OR REMOVE SCOPES" and search for "Youtube Data API v3". Under it select the scope ".../auth/youtube.readonly" and press update. Then press "SAVE AND CONTINUE"
  ![Cloud console oauth scope](/assets/img/cloud_console_oauth_scope.png)


- Under test users add all the email addresses you wish to use.

- Press "SAVE AND CONTINUE" and return back to the dashboard


### Creating credentials
- Head over to "Credentials" in the sidebar and press "Create credentials". Under it select "OAuth Client ID"

- Set Application type as "Web application" and fill in other required details.

- Under "Authorized Javascript origins" add the URIs
  - http://localhost
  - http://localhost:8080

- Under "Authorized redirect URIs" add the URI
  - https://moosync.app/youtube

  ![Cloud console JS origins](/assets/img/cloud_console_cred_js_origins.png)

  ![Cloud console authorized redirects](/assets/img/cloud_console_cred_authorized_redirect.png)

- Click on create

- Copy the client ID and secret and paste it under Settings > System > Youtube Client ID and Youtube Client Secret
## Discord integration
- [Moosync Discord RPC](https://github.com/Ovenoboyo/moosync-discord-rpc/releases): Show your song details in discord through Discord RPC.
