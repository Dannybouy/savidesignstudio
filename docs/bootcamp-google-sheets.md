# Bootcamp Google Sheets setup

No Google Sheet plugin or shared access is required.

## Sheet headers

Put these headers in row 1. Order does not matter:

- Name
- Email
- Phone Number
- Occupation
- Experience
- Learning Time
- Figma Experience
- Portfolio
- Submitted At (optional)
- Consent (optional)

The first eight headers are required. The form's internal payload keys remain `name`, `email`, `phone`, `occupation`, `experience`, `learningTime`, `figmaExperience`, and `hasPortfolio`; `Code.gs` maps them to these exact sheet headers.

## Apps Script

1. Replace the contents of the sheet's Apps Script `Code.gs` with `google-apps-script/Code.gs` from this repository.
2. Leave `SHEET_NAME` empty to use the first sheet tab. Otherwise, set it to the exact tab name.
3. Click **Deploy**, then **New deployment**.
4. Select **Web app**.
5. Set **Execute as** to **Me**.
6. Set access to **Anyone**.
7. Deploy and copy the URL ending in `/exec`.

After changing `Code.gs`, saving is not enough. Open **Deploy**, then **Manage deployments**, edit the web-app deployment, select **New version**, and deploy again. The `/exec` URL can stay the same.

## Website

Create `.env.local` in the project root:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart the development server after adding or changing the URL.

Submit one test registration. Confirm that the new row appears in the sheet before publishing the site.

The website waits for Apps Script to confirm that the row was written before it shows the success screen.
