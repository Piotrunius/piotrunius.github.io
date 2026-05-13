export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const ALLOWED_ORIGIN = "https://piotrunius.github.io";
    const corsHeaders = {
      "Access-Control-Allow-Origin": origin === "http://127.0.0.1:5500" ? origin : ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      const privacyStatus = await env.STATE.get("PRIVACY_MODE");
      if (privacyStatus === "true") {
        return new Response(JSON.stringify({
          privacyMode: true,
          message: "Privacy Mode Active"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const userId = env.ROBLOX_USER_ID;
      const [presenceRes, thumbRes] = await Promise.all([
        fetch("https://presence.roblox.com/v1/presence/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userIds: [parseInt(userId)] })
        }),
        fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`)
      ]);

      const pData = await presenceRes.json();
      const tData = await thumbRes.json();
      const p = pData.userPresences[0];

      return new Response(JSON.stringify({
        privacyMode: false,
        status: p.userPresenceType,
        location: p.lastLocation,
        avatar: tData.data[0]?.imageUrl
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500, headers: corsHeaders
      });
    }
  }
};
