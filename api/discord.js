export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const ALLOWED_ORIGIN = "https://piotrunius.github.io";
    const corsHeaders = {
      "Access-Control-Allow-Origin": origin === "http://127.0.0.1:5500" ? origin : ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      // --- PRIVACY MODE CHECK ---
      const privacyStatus = await env.STATE.get("PRIVACY_MODE");
      if (privacyStatus === "true") {
        return new Response(JSON.stringify({ privacyMode: true, message: "Privacy Mode Active" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const discordId = env.DISCORD_ID;
      if (!discordId) throw new Error("DISCORD_ID is not defined.");

      const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
      const json = await res.json();
      if (!json.success) throw new Error("Lanyard API could not find user.");

      const data = json.data;
      const statusMap = { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" };

      const activities = data.activities
        .filter(a => a.type !== 2)
        .map(a => ({
          name: a.name,
          details: a.details || "",
          state: a.state || "",
          largeImage: a.assets?.large_image ?
            (a.assets.large_image.startsWith("mp:external")
              ? a.assets.large_image.replace(/mp:external\/.*\/https\//, "https://")
              : `https://cdn.discordapp.com/app-assets/${a.application_id}/${a.assets.large_image}.png`)
            : null
        }));

      const payload = {
        privacyMode: false,
        user: {
          username: data.discord_user.username,
          avatar: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`,
        },
        presence: {
          status: data.discord_status,
          statusText: statusMap[data.discord_status] || "Offline",
          isOnline: data.discord_status !== "offline",
        },
        activities: activities,
        timestamp: new Date().toISOString()
      };

      return new Response(JSON.stringify(payload), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: "Discord Worker Error", details: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};
