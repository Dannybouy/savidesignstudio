# Bootcamp Google Sheets setup

No Google Sheet plugin or shared access is required.

## Sheet headers

Put these headers in row 1. Order does not matter:

- Name
- Email
- Country
- Phone Number
- Occupation
- Experience
- Learning Time
- Figma Experience
- Portfolio
- Submitted At (optional)
- Consent (optional)

The first nine headers are required. Put `Country` before `Phone Number`. The form sends `name`, `email`, `country`, `phone`, `occupation`, `experience`, `learningTime`, `figmaExperience`, and `hasPortfolio`; `Code.gs` maps them to these exact sheet headers. `Phone Number` stores the full E.164 value, for example `+2348012345678`.

## Apps Script

1. Run `pnpm sync:google-apps-script` after changing `google-apps-script/lib/countries.gs`.
2. Replace the contents of the sheet's Apps Script `Code.gs` with the generated `google-apps-script/Code.gs` from this repository. Apps Script receives the country set inline; it does not load the repository file at runtime.
3. Leave `SHEET_NAME` empty to use the first sheet tab. Otherwise, set it to the exact tab name.
4. In **Project Settings**, add a script property named `TURNSTILE_SECRET_KEY` with the secret for the same Cloudflare Turnstile widget used by the website.
5. Add a second script property named `TURNSTILE_HOSTNAMES` with the value `savidesignstudios.com,savidesignstudios.netlify.app`.
6. In Cloudflare Turnstile hostname management, allow `savidesignstudios.com`, `savidesignstudios.netlify.app`, and `localhost`. Cloudflare hostnames do not include ports.
7. Click **Deploy**, then **New deployment**.
8. Select **Web app**.
9. Set **Execute as** to **Me**.
10. Set access to **Anyone**.
11. Deploy and copy the URL ending in `/exec`.

After changing `Code.gs`, saving is not enough. Open **Deploy**, then **Manage deployments**, edit the web-app deployment, select **New version**, and deploy again. The `/exec` URL can stay the same.

## Website

Create `.env.local` in the project root:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_TURNSTILE_SITE_KEY=YOUR_TURNSTILE_SITE_KEY
```

Restart the development server after adding or changing the URL. Do not add the Turnstile secret to a `VITE_` variable or any website environment variable. Store it only in the Apps Script property.

The widget action is `bootcamp_registration`. The production Apps Script hostname allowlist intentionally excludes `localhost`; use a production or Netlify hostname for an end-to-end submission test.

Submit one test registration. Confirm that the new row appears in the sheet before publishing the site.

The website waits for Apps Script to verify Turnstile and confirm that the row was written before it shows the success screen. The server rate-limits repeated attempts for the same email and E.164 phone number; Apps Script does not expose a trustworthy visitor IP for a global IP limit.
