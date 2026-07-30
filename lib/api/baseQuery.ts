import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";

const API_ENDPOINT = process.env.API_ENDPOINT;


const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.API_ENDPOINT,
  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      headers.set(
        "Authorization",
        `Bearer ${session.user.accessToken}`
      );
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Refresh token logic here

    // Show a styled session-ex pired modal instead of alert
    try {
      showSessionExpiredModal();
    } catch (e) {
      // Fallback to simple alert if DOM is not available
      // eslint-disable-next-line no-alert
      alert("Session expired. Please sign in again.");
      await signOut({ callbackUrl: "/login" });
    }
  }

  return result;
};

function showSessionExpiredModal() {
  if (typeof document === "undefined") throw new Error("no-dom");
  if (document.getElementById("session-expired-modal")) return;

  const overlay = document.createElement("div");
  overlay.id = "session-expired-modal";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "rgba(0,0,0,0.45)";
  overlay.style.zIndex = "999999";

  const modal = document.createElement("div");
  modal.style.width = "min(520px, 90vw)";
  modal.style.maxHeight = "80vh";
  modal.style.background = "#fff";
  modal.style.borderRadius = "12px";
  modal.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
  modal.style.padding = "28px 24px";
  modal.style.textAlign = "center";
  modal.style.fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
  modal.style.overflowY = "auto";

  modal.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px;align-items:center;max-width:460px;margin:0 auto">
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#fff" stroke="#ff6b6b" stroke-width="1.5" />
        <path d="M12 8v5" stroke="#ff6b6b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 16h.01" stroke="#ff6b6b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div style="width:100%;text-align:left;">
        <div style="text-transform:uppercase;letter-spacing:0.12em;font-size:12px;font-weight:700;color:#666;margin-bottom:8px;">Session timeout</div>
        <h2 style="margin:0;font-size:22px;color:#111;font-weight:700;line-height:1.2">Your session expired</h2>
        <p style="margin:12px 0 0;color:#666;line-height:1.6;font-size:15px">For your security, we signed you out. Tap the button below to return to the login page and continue.</p>
      </div>
      <div style="display:flex;gap:10px;margin-top:22px;width:100%;justify-content:center;flex-wrap:wrap">
        <button id="session-expired-login" style="min-width:120px;background:#111;color:#fff;border:none;padding:12px 18px;border-radius:10px;cursor:pointer;font-weight:600">Login again</button>
        <button id="session-expired-dismiss" style="min-width:120px;background:transparent;color:#444;border:1px solid #ddd;padding:12px 18px;border-radius:10px;cursor:pointer">Close</button>
      </div>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const cleanup = () => {
    const el = document.getElementById("session-expired-modal");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  };

  const loginBtn = document.getElementById("session-expired-login");
  const dismissBtn = document.getElementById("session-expired-dismiss");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      cleanup();
      await signOut({ callbackUrl: "/login" });
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      cleanup();
    });
  }
}