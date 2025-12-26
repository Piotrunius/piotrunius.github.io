# Steam Status Troubleshooting Guide

## Problem: Steam Status Not Updating (Shows as "idle")

If your Steam status is stuck showing "idle" or not updating, this guide will help you fix the issue.

## Common Causes

### 1. Steam Web API Returns 403 Forbidden

This is the most common issue. The Steam Web API may block requests for several reasons:

- **Invalid or Expired API Key**: Your Steam API key may have expired or been revoked
- **Profile Privacy Settings**: Your Steam profile must be set to "Public"
- **Missing User-Agent**: Requests without proper User-Agent headers may be blocked
- **Rate Limiting**: Too many requests in a short time period

## Solutions

### Step 1: Verify Your Steam API Key

1. Go to https://steamcommunity.com/dev/apikey
2. Check if your API key is still valid
3. If needed, generate a new API key
4. Update the `STEAM_API_KEY` secret in your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Update or create the `STEAM_API_KEY` secret with your new key

### Step 2: Check Steam Profile Privacy

1. Go to your Steam profile
2. Click "Edit Profile"
3. Go to "Privacy Settings"
4. Set "My profile" to **Public**
5. Set "Game details" to **Public**
6. Save changes

### Step 3: Verify Steam ID

Make sure your `STEAM_ID64` is correct:
1. Go to https://steamid.io/
2. Enter your Steam profile URL or username
3. Copy your `steamID64` (it's a long number like `76561199034113344`)
4. Update the `STEAM_ID64` secret in your GitHub repository if needed

### Step 4: Wait for Automatic Fix

The workflow now includes:
- **User-Agent headers** to prevent blocks
- **Retry logic** with exponential backoff
- **Better error messages** for debugging
- **Fallback data** when API fails

The next scheduled run (every 15 minutes) will use the improved code and should work better.

### Step 5: Manual Workflow Trigger

To test immediately:
1. Go to your repository on GitHub
2. Click "Actions" tab
3. Select "Update and Deploy" workflow
4. Click "Run workflow"
5. Check the logs for error messages

## Understanding the Error in `steam-status.json`

If you see an error like:
```json
{
  "error": "HTTP 403: Forbidden"
}
```

This means the Steam API rejected the request. Follow the steps above to fix it.

## Recent Improvements

The code has been updated to:
- ✅ Add User-Agent header to all Steam API requests
- ✅ Increase retry attempts with longer delays for Steam
- ✅ Provide detailed error messages and troubleshooting tips
- ✅ Show current status in workflow logs
- ✅ Better fallback handling when API fails

## Still Having Issues?

If you've followed all steps and it's still not working:

1. **Check Steam Web API Status**: Visit https://steamstat.us/ to see if Steam's API is down
2. **Review Workflow Logs**: Check the "Actions" tab for detailed error messages
3. **Test API Key Manually**: Use a tool like curl or Postman to test your API key:
   ```bash
   curl "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=YOUR_KEY&steamids=YOUR_STEAM_ID"
   ```
4. **Contact Steam Support**: If your API key doesn't work even after regenerating, contact Steam Support

## Status Meanings

When working correctly, `personastate` values mean:
- `0` = Offline
- `1` = Online
- `2` = Busy
- `3` = Away
- `4` = Snooze
- `5` = Looking to trade
- `6` = Looking to play

The status should update automatically every 15 minutes when the workflow runs.
