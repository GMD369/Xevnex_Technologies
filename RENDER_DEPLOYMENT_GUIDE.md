# Complete Render Deployment Guide for Xevnex Technologies

## Prerequisites
- GitHub account
- Render account (sign up at https://render.com)
- Your project code ready

## Step 1: Prepare Your Project

### 1.1 Ensure all files are committed
```bash
git status
git add .
git commit -m "Prepare for Render deployment"
```

### 1.2 Push to GitHub
If you haven't pushed to GitHub yet:
```bash
git remote add origin https://github.com/GMD369/Xevnex_Technologies.git
git branch -M main
git push -u origin main
```

## Step 2: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - **Name**: `xevnex-db` (or any name you prefer)
   - **Database**: `xevnex_technologies`
   - **User**: (auto-generated)
   - **Region**: Choose closest to your users (e.g., Ohio, Oregon, Frankfurt)
   - **Plan**: Select **"Free"** (or paid if you need more)
4. Click **"Create Database"**
5. Wait for the database to be created (takes 1-2 minutes)
6. Once created, scroll down to **"Connections"**
7. Copy the **"Internal Database URL"** (starts with `postgres://`)
   - Save this for later! Format: `postgres://user:password@host/database`

## Step 3: Set Up Database Schema

### 3.1 Connect to your database locally
In your `.env` file, temporarily add the database URL you copied:
```
DATABASE_URL=postgres://user:password@host/database
```

### 3.2 Push your schema to the database
```bash
npm run db:push
```

This will create all your database tables on Render's PostgreSQL.

## Step 4: Deploy Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository:
   - Click **"Connect account"** if first time
   - Select your repository: `GMD369/Xevnex_Technologies`
4. Configure the service:

   **Basic Settings:**
   - **Name**: `xevnex-technologies` (or your preferred name)
   - **Region**: Same as your database
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Runtime**: `Node`

   **Build & Deploy:**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

   **Instance Type:**
   - Select **"Free"** (or paid for better performance)

5. **Environment Variables** - Click **"Advanced"**
   Add these environment variables:
   
   | Key | Value |
   |-----|-------|
   | `NODE_VERSION` | `20.11.0` |
   | `DATABASE_URL` | Paste the Internal Database URL from Step 2 |
   | `NODE_ENV` | `production` |

6. Click **"Create Web Service"**

## Step 5: Wait for Deployment

- Render will now:
  1. Clone your repository
  2. Install dependencies
  3. Run the build command
  4. Start your application
- This takes 3-5 minutes for the first deployment
- Watch the logs in real-time on the Render dashboard

## Step 6: Verify Deployment

1. Once deployed, Render provides a URL like: `https://xevnex-technologies.onrender.com`
2. Click the URL to open your live application
3. Test all features to ensure everything works

## Step 7: Set Up Custom Domain (Optional)

1. In your web service dashboard, click **"Settings"**
2. Scroll to **"Custom Domain"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `xevnex.com`)
5. Follow DNS configuration instructions:
   - Add CNAME record pointing to your Render URL
   - Wait for DNS propagation (can take up to 24 hours)

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify `NODE_VERSION` matches your local version

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if database is in the same region
- Ensure database is running (not suspended)

### Application Crashes
- Check application logs in Render dashboard
- Verify all environment variables are set
- Check for port binding issues (Render sets `PORT` automatically)

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Database has storage limits (1GB on free tier)

## Updating Your Application

After making changes to your code:

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. Render automatically detects the push and redeploys
3. Or manually trigger deploy from Render dashboard

## Cost Information

**Free Tier Includes:**
- 750 hours/month of free web service
- PostgreSQL database with 1GB storage
- Automatic SSL/HTTPS
- Automatic deployments from GitHub

**Important:** Free web services spin down after 15 minutes of inactivity.

## Additional Configuration

### Enable Auto-Deploy
- Go to **Settings** → **Build & Deploy**
- Toggle **"Auto-Deploy"** to YES
- Now every git push triggers automatic deployment

### Add Health Check Endpoint (Recommended)
Add this to your `server/routes.ts`:
```typescript
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

Then in Render Settings → Health & Alerts:
- **Health Check Path**: `/api/health`

## Next Steps After Deployment

1. ✅ Test all functionality on production URL
2. ✅ Set up monitoring and alerts in Render dashboard
3. ✅ Configure custom domain (optional)
4. ✅ Set up backup strategy for database
5. ✅ Review and optimize performance
6. ✅ Consider upgrading to paid tier for better performance

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Check logs in dashboard for debugging

---

**Your deployment is complete! 🚀**

Your application is now live and accessible worldwide.
