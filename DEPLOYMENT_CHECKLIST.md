# Render Deployment Quick Checklist

## Before Deployment
- [ ] All code committed to Git
- [ ] Pushed to GitHub repository
- [ ] `.env` file NOT committed (should be in .gitignore)
- [ ] `package.json` has all dependencies
- [ ] Build and start scripts work locally

## Render Setup - Database
- [ ] Create PostgreSQL database on Render
- [ ] Copy Internal Database URL
- [ ] Run `npm run db:push` locally to set up schema

## Render Setup - Web Service
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] `DATABASE_URL`
  - [ ] `NODE_VERSION` = `20.11.0`
  - [ ] `NODE_ENV` = `production`

## After Deployment
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Test the live URL
- [ ] Check application logs
- [ ] Verify database connection
- [ ] Test all features

## Optional
- [ ] Set up custom domain
- [ ] Enable health check monitoring
- [ ] Configure auto-deploy from GitHub
- [ ] Set up alerts

## Your URLs
- Render Dashboard: https://dashboard.render.com
- Your App URL: (will be provided after deployment)
- Database Dashboard: (in your Render PostgreSQL service)

## Quick Commands
```bash
# Push updates
git add .
git commit -m "Update message"
git push

# Database schema updates
npm run db:push

# Test locally
npm run dev
```

## Common Issues
- **Build fails**: Check logs, verify dependencies
- **App crashes**: Check environment variables
- **Database error**: Verify DATABASE_URL is correct
- **Slow first load**: Free tier spins down after inactivity
