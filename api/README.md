# Cloudflare Worker APIs

This folder contains Cloudflare Worker scripts for fetching real-time data from various services. Each worker requires specific environment variables and secrets.

## Structure

```
api/
├── spotify.js      # Spotify - currently playing song
├── github.js       # GitHub - profile stats and repositories
├── steam.js        # Steam - player status and current game
├── discord.js      # Discord (via Lanyard) - status and activities
├── roblox.js       # Roblox - presence status
└── README.md       # This documentation
```

---

## Shared Environment Variables

All workers have access to a **KV Namespace** `STATE` to check privacy mode:

```
PRIVACY_MODE: "true" | "false"  (KV Namespace)
```

When `PRIVACY_MODE` is set to `"true"`, all workers return:
```json
{
  "privacyMode": true,
  "message": "Privacy Mode Active"
}
```

---

## 🎵 Spotify (`spotify.js`)

Fetches the currently playing song from your Spotify account.

### Environment Variables (Secrets)

```
SPOTIFY_CLIENT_ID          # Get from https://developer.spotify.com/dashboard
SPOTIFY_CLIENT_SECRET      # ⚠️ SECRET - never commit this
SPOTIFY_REFRESH_TOKEN      # OAuth refresh token
```

### How to Get Credentials:

1. Visit https://developer.spotify.com/dashboard
2. Create an application
3. Go to "Edit Settings" → Copy `Client ID` and `Client Secret`
4. For `SPOTIFY_REFRESH_TOKEN`, perform OAuth authorization on your account
   - Or use https://accounts.spotify.com/authorize with scope parameters

### KV Storage

Caches token in KV namespace `STATE` as `SPOTIFY_TOKEN`:
```json
{
  "access_token": "...",
  "expires_at": 1234567890
}
```

### API Response

```json
{
  "privacyMode": false,
  "isPlaying": true,
  "title": "Song Name",
  "artist": "Artist Name",
  "album": "Album Name",
  "albumArt": "https://...",
  "url": "https://open.spotify.com/track/...",
  "progressMs": 120000,
  "durationMs": 240000
}
```

---

## 🐙 GitHub (`github.js`)

Fetches profile stats, repositories, gists, and commits.

### Environment Variables (Secrets)

```
GITHUB_TOKEN               # Personal Access Token (PAT)
GITHUB_USERNAME            # Optional (default: 'Piotrunius')
```

### How to Get PAT:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with scopes:
   - `repo` (repository access)
   - `read:user` (read profile)
   - `gist` (access to gists)
3. Copy token as `GITHUB_TOKEN`

### API Response

```json
{
  "privacyMode": false,
  "user": {
    "login": "Piotrunius",
    "name": "Full Name",
    "avatar": "https://...",
    "bio": "Bio text",
    "publicRepos": 25,
    "privateRepos": 5
  },
  "summary": {
    "projects": 30,
    "starredCount": 150,
    "followers": 50,
    "commits": 1200,
    "gists": 10,
    "starsReceived": 300
  },
  "projects": [...],
  "starred": [...],
  "recentCommits": [...],
  "languages": [...],
  "lastUpdate": "2024-01-20T10:30:00Z"
}
```

---

## 🎮 Steam (`steam.js`)

Fetches player status and currently playing game.

### Environment Variables (Secrets)

```
STEAM_API_KEY              # API key from https://steamcommunity.com/dev/apikey
STEAM_ID                   # Steam ID (64-bit number)
```

### How to Get Credentials:

1. Visit https://steamcommunity.com/dev/apikey (you must be logged in)
2. Fill out the form and unlock your API key
3. Copy it as `STEAM_API_KEY`
4. To find your `STEAM_ID`:
   - Visit your Steam profile → Copy profile link
   - Use https://steamidfinder.com/ or API: https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=YOUR_KEY&vanityurl=USERNAME

### API Response

```json
{
  "privacyMode": false,
  "name": "Player Name",
  "state": 1,
  "game": "CS2",
  "avatar": "https://..."
}
```

**State Codes:**
- `0` - Offline
- `1` - Online
- `2` - Busy
- `3` - Away
- `4` - Snooze

---

## 💬 Discord (`discord.js`)

Fetches Discord user status and activities using the **Lanyard API**.

### Environment Variables (Secrets)

```
DISCORD_ID                 # Discord User ID
```

### How to Get Discord ID:

1. Discord → User Settings → Advanced → Developer Mode (enable)
2. Right-click on profile → Copy User ID
3. Or test at: https://lanyard.rest/api/users/YOUR_ID

### Lanyard Setup:

Lanyard is a public service (no API key required), but you need to have the **Lanyard bot** on your Discord server.

1. Visit https://lanyard.rest
2. Click "Invite Bot"
3. The bot will track your status and activities

### API Response

```json
{
  "privacyMode": false,
  "user": {
    "username": "username",
    "avatar": "https://cdn.discordapp.com/avatars/..."
  },
  "presence": {
    "status": "online",
    "statusText": "Online",
    "isOnline": true
  },
  "activities": [
    {
      "name": "Activity Name",
      "details": "Details",
      "state": "State",
      "largeImage": "https://..."
    }
  ],
  "timestamp": "2024-01-20T10:30:00Z"
}
```

---

## 🎮 Roblox (`roblox.js`)

Fetches Roblox player presence status and avatar.

### Environment Variables (Secrets)

```
ROBLOX_USER_ID             # Roblox User ID (number)
```

### How to Get Roblox User ID:

1. Visit your Roblox profile
2. URL: `https://www.roblox.com/users/ID/profile` → copy the ID
3. Or use API: `https://api.roblox.com/users/get-by-username?username=USERNAME`

### API Response

```json
{
  "privacyMode": false,
  "status": "Online",
  "location": "Game Name",
  "avatar": "https://..."
}
```

---

## Deployment to Cloudflare Workers

### Overview

Each `.js` file in this folder is a standalone Cloudflare Worker that can be deployed via:

1. **Cloudflare Dashboard** - Drag and drop file in the editor
2. **Wrangler CLI** - `wrangler publish`
3. **Cloudflare Pages Functions** - Place in `functions/api/` for automatic routing

### Configuration (wrangler.toml)

```toml
[env.production]
vars = { GITHUB_USERNAME = "Piotrunius" }

[[env.production.secrets]]
SPOTIFY_CLIENT_ID = "your-id"
SPOTIFY_CLIENT_SECRET = "your-secret"
SPOTIFY_REFRESH_TOKEN = "your-token"
GITHUB_TOKEN = "your-token"
STEAM_API_KEY = "your-key"
STEAM_ID = "your-id"
DISCORD_ID = "your-id"
ROBLOX_USER_ID = "your-id"

[[env.production.kv_namespaces]]
binding = "STATE"
id = "your-kv-id"
```

### CORS Origins

By default, workers allow requests from:
- `https://piotrunius.github.io` (production)
- `http://127.0.0.1:5500` (local dev)

To change, edit `ALLOWED_ORIGIN` in each worker file.

---

## ⚠️ Security

- **Never** commit secrets (SPOTIFY_CLIENT_SECRET, GITHUB_TOKEN, etc.)
- Use environment variables / secrets in Cloudflare Dashboard
- Ensure KV Namespace `STATE` exists in your Cloudflare project
- Restrict API access via CORS headers
- Regularly rotate tokens (Spotify refresh token, GitHub PAT)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 401 Unauthorized | Check if secret exists and is correct |
| 403 Forbidden | GitHub PAT missing required scopes, Spotify app lacks permissions |
| CORS Error | Verify origin is in the `ALLOWED_ORIGIN` list |
| KV Error | Ensure `STATE` binding exists in `wrangler.toml` |
| No content (204) | Spotify: nothing playing; Steam: profile is private |

---

## Notes

- Each worker caches data where possible (e.g., Spotify token in KV)
- All requests support CORS preflights (OPTIONS)
- Privacy Mode disables all data (KV: `PRIVACY_MODE = "true"`)
- Timestamps are in ISO 8601 (UTC)
