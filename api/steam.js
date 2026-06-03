export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const ALLOWED_ORIGIN = "https://piotrunius.dev";
    const corsHeaders = {
      "Access-Control-Allow-Origin":
        origin === "http://127.0.0.1:5500" ? origin : ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS")
      return new Response(null, { headers: corsHeaders });

    try {
      const privacyStatus = await env.STATE.get("PRIVACY_MODE");
      if (privacyStatus === "true") {
        return new Response(
          JSON.stringify({
            privacyMode: true,
            message: "Privacy Mode Active",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const res = await fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${env.STEAM_ID}`,
      );
      const data = await res.json();
      const player = data.response.players[0];

      return new Response(
        JSON.stringify({
          privacyMode: false,
          name: player.personaname,
          state: player.personastate,
          game: player.gameextrainfo,
          avatar: player.avatarfull,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
