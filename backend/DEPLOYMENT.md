# Roomeze Backend - Production Deployment Guide

## Vercel Deployment Instructions

### Prerequisites
1. Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed (optional): `npm install -g vercel`

### Environment Variables to Set in Vercel

Go to your Vercel project settings → Environment Variables and add:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://rjdhav67_db_user:zZCK838qK1vqaGDB@roomeze.cmvpkvz.mongodb.net/
JWT_SECRET=roomeze_jwt_secret_key
FRONTEND_URL=https://roomeze.vercel.app
```

**Important Notes:**
- Replace `https://roomeze.vercel.app` with your actual frontend Vercel URL
- All environment variables should be set for Production, Preview, and Development environments
- Never commit `.env` file to version control

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your backend repository from GitHub/GitLab/Bitbucket
3. Vercel will auto-detect the configuration from `vercel.json`
4. Add environment variables in the project settings
5. Click "Deploy"

#### Option 2: Deploy via Vercel CLI
```bash
# Login to Vercel
vercel login

# Navigate to backend directory
cd backend

# Deploy to production
vercel --prod
```

### Post-Deployment

1. **Get your backend URL**: After deployment, Vercel will provide a URL like:
   - `https://your-backend-name.vercel.app`

2. **Update Frontend Environment Variable**:
   - Go to your frontend Vercel project
   - Update `NEXT_PUBLIC_API_URL` to your backend URL:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-name.vercel.app/api
     ```
   - Redeploy the frontend

3. **Test the deployment**:
   ```bash
   # Test health endpoint
   curl https://your-backend-name.vercel.app/api/health
   
   # Test root endpoint
   curl https://your-backend-name.vercel.app/
   ```

### Updating CORS Origins

After deployment, if you need to add more allowed origins:

1. Edit `server.js` and update the `allowedOrigins` array:
   ```javascript
   const allowedOrigins = [
     'http://localhost:3000',
     'http://localhost:3001',
     'https://roomeze.vercel.app',
     'https://your-custom-domain.com',
     process.env.FRONTEND_URL,
   ].filter(Boolean);
   ```

2. Commit and push changes, or redeploy

### MongoDB Atlas Configuration

Ensure your MongoDB Atlas is configured for production:

1. **Network Access**: Add `0.0.0.0/0` to IP whitelist (allows Vercel)
2. **Database User**: Verify credentials in connection string
3. **Connection String**: Should be in format:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   ```

### Monitoring & Logs

- View deployment logs in Vercel Dashboard
- Check function logs under "Functions" tab
- Monitor MongoDB connection in Atlas dashboard

### Common Issues

**CORS Errors:**
- Verify frontend URL is in `allowedOrigins` array
- Check environment variables are set correctly

**Database Connection Timeout:**
- Verify MongoDB Atlas network access settings
- Check connection string is correct
- Ensure database user has proper permissions

**Route Not Found:**
- Verify `vercel.json` routes configuration
- Check all routes are properly registered in `server.js`

### Local Testing Before Deployment

Test the production build locally:

```bash
# Set environment to production
$env:NODE_ENV="production"

# Start server
node server.js

# Test endpoints
curl http://localhost:5000/api/health
```

### Custom Domain (Optional)

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `allowedOrigins` in server.js with your custom domain

### Security Checklist

- ✅ Environment variables set in Vercel (not in code)
- ✅ `.env` file in `.gitignore`
- ✅ CORS properly configured
- ✅ JWT secret is strong and unique
- ✅ MongoDB connection uses authentication
- ✅ MongoDB network access properly configured
- ✅ Helmet security headers enabled

### Support

For issues:
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Express.js: https://expressjs.com/

---

**Backend Version:** 1.0.0  
**Last Updated:** November 2025
