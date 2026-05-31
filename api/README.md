# 🔌 Cloudflare Worker APIs

Real-time data fetching from Spotify, GitHub, Steam, Discord, and Roblox. Each worker requires specific environment variables and secrets.

---

## 📂 Structure

```
api/
├── spotify.js       # 🎵 Currently playing song
├── github.js        # 🐙 Profile stats and repositories  
├── steam.js         # 🎮 Player status and current game
├── discord.js       # 💬 Status and activities (Lanyard)
├── roblox.js        # 🎮 Presence status
└── README.md        # 📖 Documentation
```

---

## ⚙️ Shared Configuration

### Privacy Mode

All workers check a **Privacy Mode** flag in KV namespace `STATE`:

```env
KEY: PRIVACY_MODE
VALUE: "true" | "false"
```

When enabled (`"true"`), all endpoints return:

```json
{
  "privacyMode": true,
  "message": "Privacy Mode Active"
}
```

### CORS Configuration

Default allowed origins:
- `https://piotrunius.dev` (production)
- `http://127.0.0.1:5500` (local development)

Edit `ALLOWED_ORIGIN` in worker files to change.

---

## 🎵 Spotify Worker

**File:** `spotify.js`  
**Purpose:** Fetch currently playing track with album art and progress

### Required Secrets

```env
SPOTIFY_CLIENT_ID          # Spotify app ID
SPOTIFY_CLIENT_SECRET      # ⚠️ SECRET - Never commit
SPOTIFY_REFRESH_TOKEN      # OAuth refresh token
```

### Getting Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an application
3. Copy **Client ID** and **Client Secret** from settings
4. Generate **Refresh Token** via OAuth flow at [accounts.spotify.com/authorize](https://accounts.spotify.com/authorize)

### Caching

Token cached in KV as `SPOTIFY_TOKEN`:
```json
{
  "access_token": "...",
  "expires_at": 1234567890000
}
```

### Response

```json
{
  "privacyMode": false,
  "isPlaying": true,
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "album": "After Hours",
  "albumArt": "https://i.scdn.co/image/...",
  "url": "https://open.spotify.com/track/...",
  "progressMs": 125000,
  "durationMs": 200040
}
```

---

## 🐙 GitHub Worker

**File:** `github.js`  
**Purpose:** Fetch profile stats, repositories, gists, and recent commits

### Required Secrets

```env
GITHUB_TOKEN               # Personal Access Token (PAT)
GITHUB_USERNAME            # Optional (default: 'Piotrunius')
```

### Getting Credentials

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Tokens (classic)"
3. Generate new token with scopes:
   - ✅ `repo` - Repository access
   - ✅ `read:user` - Read profile info
   - ✅ `gist` - Access to gists
4. Copy and use as `GITHUB_TOKEN`

### Response

```json
{
  "privacyMode": false,
  "user": {
    "login": "Piotrunius",
    "name": "Full Name",
    "avatar": "https://avatars.githubusercontent.com/u/...",
    "bio": "Developer & Open Source Enthusiast",
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
  "projects": [
    {
      "name": "project-name",
      "description": "Brief description",
      "stars": 42,
      "lang": "TypeScript",
      "url": "https://github.com/...",
      "isPrivate": false
    }
  ],
  "starred": [...],
  "recentCommits": [...],
  "languages": [
    {"name": "TypeScript", "repos": 8},
    {"name": "JavaScript", "repos": 5}
  ],
  "lastUpdate": "2024-01-20T10:30:00Z"
}
```

---

## 🎮 Steam Worker

**File:** `steam.js`  
**Purpose:** Fetch player status and currently playing game

### Required Secrets

```env
STEAM_API_KEY              # API key from Steam Community
STEAM_ID                   # 64-bit Steam ID
```

### Getting Credentials

**API Key:**
1. Visit [Steam Community → API Key](https://steamcommunity.com/dev/apikey) (must be logged in)
2. Fill registration form
3. Copy your API key

**Steam ID:**
1. Visit your Steam profile
2. Copy URL (extract ID from `https://steamcommunity.com/profiles/STEAMID`)
3. Or use [steamidfinder.com](https://steamidfinder.com/)

### Response

```json
{
  "privacyMode": false,
  "name": "PlayerName",
  "state": 1,
  "game": "Counter-Strike 2",
  "avatar": "https://avatars.steamstatic.com/..."
}
```

**State Codes:**
| Code | Status |
|------|--------|
| 0 | Offline |
| 1 | Online |
| 2 | Busy |
| 3 | Away |
| 4 | Snooze |

---

## 💬 Discord Worker

**File:** `discord.js`  
**Purpose:** Fetch Discord status and activities (via Lanyard API)

### Required Secrets

```env
DISCORD_ID                 # Discord User ID
```

### Getting Credentials

1. Open Discord → User Settings → Advanced
2. Enable **Developer Mode**
3. Right-click your profile → **Copy User ID**
4. Or test via [lanyard.rest](https://lanyard.rest/api/users/YOUR_ID)

### Lanyard Setup

Lanyard is a **free public service** (no API key needed) that tracks Discord status.

1. Visit [lanyard.rest](https://lanyard.rest)
2. Click **"Invite Bot"**
3. The bot tracks your status and activities in real-time

### Response

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
      "name": "Visual Studio Code",
      "details": "Editing api/README.md",
      "state": "Working on portfolio",
      "largeImage": "https://cdn.discordapp.com/app-assets/..."
    }
  ],
  "timestamp": "2024-01-20T10:30:00Z"
}
```

**Status Values:** `online` | `idle` | `dnd` | `offline`

---

## 🎮 Roblox Worker

**File:** `roblox.js`  
**Purpose:** Fetch player presence status and avatar

### Required Secrets

```env
ROBLOX_USER_ID             # Roblox User ID (number)
```

### Getting Credentials

1. Visit your [Roblox Profile](https://www.roblox.com/users)
2. Extract ID from URL: `https://www.roblox.com/users/ID/profile`
3. Or use API: `https://api.roblox.com/users/get-by-username?username=USERNAME`

### Response

```json
{
  "privacyMode": false,
  "status": "Online",
  "location": "Bloxburg",
  "avatar": "https://www.roblox.com/bust-thumbnails/..."
}
```

**Status Values:** `Online` | `Offline` | `InGame` | `InStudio`

---

## 🚀 Deployment

### Cloudflare Workers Setup

Each `.js` file is a standalone worker deployable via:

1. **[Cloudflare Dashboard](https://dash.cloudflare.com/)** - Copy & paste code
2. **[Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)** - `wrangler publish`
3. **[Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)** - Auto-routing

### Configuration File (wrangler.toml)

```toml
name = "portfolio-workers"
main = "src/index.js"
compatibility_date = "2024-01-20"

[env.production]
vars = { GITHUB_USERNAME = "Piotrunius" }

[[env.production.secrets]]
SPOTIFY_CLIENT_ID = "your-client-id"
SPOTIFY_CLIENT_SECRET = "your-client-secret"
SPOTIFY_REFRESH_TOKEN = "your-refresh-token"
GITHUB_TOKEN = "ghp_xxxxxxxxxxxx"
STEAM_API_KEY = "your-steam-key"
STEAM_ID = "76561198xxxxx"
DISCORD_ID = "1166309729371439104"
ROBLOX_USER_ID = "12345678"

[[env.production.kv_namespaces]]
binding = "STATE"
id = "xxxxxxxxxxxxxxxx"
preview_id = "yyyyyyyyyyyyyyyy"
```

### Step-by-Step

```bash
# 1. Install Wrangler
npm install -g @cloudflare/wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Create KV namespace
wrangler kv:namespace create "STATE" --preview false

# 4. Deploy worker
wrangler publish --env production
```

---

## 🔐 Security Best Practices

> ⚠️ **Never commit secrets to version control**

- ✅ Store all secrets in **Cloudflare Dashboard** only
- ✅ Use `.gitignore` for `wrangler.toml` with secrets
- ✅ Ensure KV Namespace `STATE` exists and is bound
- ✅ Rotate tokens regularly (GitHub PAT, Spotify refresh token)
- ✅ Use separate credentials for dev/staging/production
- ✅ Monitor API rate limits

---

## 🆘 Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **401 Unauthorized** | Missing/invalid secret | Verify secret exists in Dashboard |
| **403 Forbidden** | Insufficient permissions | Check token scopes (GitHub) or app permissions (Spotify) |
| **CORS Error** | Origin not whitelisted | Add origin to `ALLOWED_ORIGIN` in worker |
| **KV Error** | Binding missing | Ensure `STATE` KV namespace is bound in `wrangler.toml` |
| **204 No Content** | No data available | Spotify: not playing; Steam: profile private |
| **Rate Limited** | Too many requests | Implement caching or increase request interval |

### Testing

Use curl to test workers locally:

```bash
# Test Spotify
curl -X GET "http://localhost:8787/spotify" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test GitHub
curl -X GET "http://localhost:8787/github"

# Test with privacy mode
curl -X GET "http://localhost:8787/spotify" \
  -H "X-Privacy-Mode: true"
```

---

## 📋 Implementation Notes

- **Caching:** Spotify tokens cached in KV to reduce API calls
- **CORS:** All workers support OPTIONS preflight requests
- **Privacy Mode:** Global kill-switch for all endpoints (set `PRIVACY_MODE = "true"`)
- **Timestamps:** All dates in ISO 8601 format (UTC)
- **Error Handling:** Graceful fallbacks with descriptive error messages
- **Rate Limiting:** Respect API rate limits of each service

---

## 📚 References

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [GitHub REST API](https://docs.github.com/rest)
- [Steam Web API](https://steamcommunity.com/dev)
- [Lanyard API](https://lanyard.rest/)
- [Roblox API](https://wiki.roblox.com/)

---

**Last Updated:** January 2024 | **Status:** ✅ Production Ready
