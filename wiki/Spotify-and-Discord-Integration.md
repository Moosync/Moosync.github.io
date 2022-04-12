## Enabling Spotify integration

Due to restrictions from Spotify, a public api key could not be integrated into the app.
Due to this, each user will be required to generate an API key for themselves

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

## Discord integration
- [Moosync Discord RPC](https://github.com/Ovenoboyo/moosync-discord-rpc/releases): Show your song details in discord through Discord RPC.
