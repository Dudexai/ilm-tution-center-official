# Deploying to Cloudflare Pages

This project is built using **TanStack Start** and configured with **Nitro** to bundle and deploy seamlessly to Cloudflare Pages.

## Prerequisites

Ensure you have your environment variables (e.g. Supabase credentials or other keys) ready.

---

## Method 1: Automatic Deployment via Git (Recommended)

To automatically deploy your website whenever you push to GitHub/GitLab:

1. Go to the **Cloudflare Dashboard** and select **Workers & Pages**.
2. Click **Create** -> **Pages** -> **Connect to Git**.
3. Choose your repository.
4. Set up the **Build settings**:
   - **Framework preset**: `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Under **Environment variables (advanced)**, add any variables from your `.env` file (e.g., Supabase keys).
6. Click **Save and Deploy**.

---

## Method 2: Manual Deployment via Wrangler CLI

If you prefer to deploy directly from your local terminal using Wrangler:

1. Log in to your Cloudflare account:
   ```bash
   npx wrangler login
   ```
2. Build the project locally:
   ```bash
   npm run build
   ```
3. Deploy the build directory:
   ```bash
   npx wrangler pages deploy dist
   ```
