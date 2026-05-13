# Piotrunius Portfolio

Personal portfolio site with a focus on real-time presence, a local audio player, and a glassmorphism UI. Built with plain HTML, CSS, and JavaScript.

**Authorship note:** this project was made by a human, with about 20–30% AI assistance (ideation, wording, and small refinements).

## Highlights

- Animated background and theme toggle
- Local music player + visualizer
- Live status panels (Spotify, Steam, Discord, GitHub and Roblox)
- PWA install + offline caching

## Tech

- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome 6.5.1
- Umami analytics
- Custom worker APIs (GitHub, Spotify, Steam, Discord and Roblox)

## Live

https://piotrunius.github.io/

## Project structure

```
├── index.html
├── styles.css
├── app.js
├── sw.js
├── manifest.json
├── assets/
│   ├── pfp.png
│   ├── audio.mp3
│   └── nobara-icon.png
├── projects.json
├── api/
│   ├── spotify.js      # Spotify Worker
│   ├── github.js       # GitHub Worker
│   ├── steam.js        # Steam Worker
│   ├── discord.js      # Discord (Lanyard) Worker
│   ├── roblox.js       # Roblox Worker
│   └── README.md       # API Documentation
```

## Local development

Open index.html directly, or run a local server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## API Setup

The portfolio uses **Cloudflare Workers** to fetch real-time data from various services. Each worker requires specific environment variables and secrets.

### Workers

All API workers are located in the `api/` folder:

- **`spotify.js`** - Currently playing song
  - Requires: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
  
- **`github.js`** - Profile stats, repositories, gists, and commits
  - Requires: `GITHUB_TOKEN`, `GITHUB_USERNAME` (optional)
  
- **`steam.js`** - Player status and current game
  - Requires: `STEAM_API_KEY`, `STEAM_ID`
  
- **`discord.js`** - Status and activities (via Lanyard API)
  - Requires: `DISCORD_ID`
  
- **`roblox.js`** - Presence status and avatar
  - Requires: `ROBLOX_USER_ID`

### Privacy Mode

All workers respect a **privacy mode** flag stored in KV namespace `STATE`:

```
KEY: PRIVACY_MODE
VALUE: "true" | "false"
```

When enabled, all APIs return `{ privacyMode: true, message: "Privacy Mode Active" }`

### Getting Started

For detailed setup instructions, environment variables, and how to obtain API credentials, see **[`api/README.md`](api/README.md)**

**Quick steps:**

1. Create a Cloudflare Workers project
2. Create a KV namespace named `STATE`
3. Deploy each `.js` file from the `api/` folder
4. Set all required secrets in Cloudflare Dashboard
5. Update API endpoint URLs in `app.js` to match your deployed workers

## License

[MIT](LICENSE) - License

## Contact

- Discord: [alciaforlife](https://discord.com/users/1166309729371439104)
- GitHub: [Piotrunius](https://github.com/Piotrunius)
- Email: piotrunius.v2@gmail.com
