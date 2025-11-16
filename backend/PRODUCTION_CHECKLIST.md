# Production Deployment Checklist ✅

## Pre-Deployment Checklist

### Code Configuration
- [x] Server.js updated with production-ready CORS
- [x] Helmet security headers configured
- [x] Database connection optimized for serverless
- [x] Error handling middleware in place
- [x] Health check endpoint available
- [x] Root endpoint documented
- [x] Environment-aware logging (morgan)

### Files & Configuration
- [x] vercel.json configured for Vercel deployment
- [x] .gitignore created (excludes .env, node_modules)
- [x] .env.example created with all required variables
- [x] package.json has Node.js engine specified
- [x] DEPLOYMENT.md guide created

### Security
- [ ] Strong JWT_SECRET set in Vercel environment variables
- [ ] MongoDB Atlas connection string secured
- [ ] CORS origins properly configured
- [ ] Helmet security headers enabled
- [ ] Rate limiting considered (optional)
- [ ] Input validation on all routes

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Database user credentials verified
- [ ] Network access allows Vercel (0.0.0.0/0)
- [ ] Database name matches in connection string
- [ ] Connection pooling configured

### Environment Variables (Vercel Dashboard)
Required variables to set:
- [ ] NODE_ENV=production
- [ ] MONGODB_URI=your_mongodb_atlas_uri
- [ ] JWT_SECRET=your_strong_secret_key
- [ ] FRONTEND_URL=https://your-frontend.vercel.app

Optional variables:
- [ ] CLOUDINARY_CLOUD_NAME (if using image uploads)
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET

## Deployment Steps

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Production-ready backend"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Option A: Via Dashboard (recommended for first deployment)
   - Option B: Via CLI (`vercel --prod`)

3. **Configure Environment Variables**
   - Go to Vercel project settings
   - Add all required environment variables
   - Apply to Production, Preview, and Development

4. **Test Deployment**
   ```bash
   # Test health endpoint
   curl https://your-backend.vercel.app/api/health
   
   # Test root endpoint
   curl https://your-backend.vercel.app/
   ```

## Post-Deployment Verification

### API Endpoints to Test
- [ ] GET /api/health - Health check
- [ ] GET / - Root endpoint with API documentation
- [ ] POST /api/auth/register - User registration
- [ ] POST /api/auth/login - User login
- [ ] GET /api/properties - Properties listing
- [ ] GET /api/mess - Mess partners listing
- [ ] GET /api/laundry - Laundry services listing
- [ ] GET /api/printing - Printing services listing
- [ ] GET /api/events - Events listing
- [ ] GET /api/community/posts - Community posts

### CORS Testing
Test from your frontend domain:
- [ ] Preflight OPTIONS requests working
- [ ] GET requests succeed
- [ ] POST requests succeed
- [ ] Authentication headers accepted

### Database Connectivity
- [ ] MongoDB connection successful
- [ ] Queries executing correctly
- [ ] Connection pooling working
- [ ] No timeout errors

### Performance
- [ ] Response times acceptable (<500ms for simple queries)
- [ ] Cold start time reasonable (<5s)
- [ ] No memory leaks detected
- [ ] Database indexes created for frequently queried fields

## Frontend Integration

1. **Update Frontend Environment Variable**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
   ```

2. **Update CORS Origins in Backend**
   Add your production frontend URL to `allowedOrigins` array

3. **Redeploy Frontend**
   After backend is deployed and tested

## Monitoring & Maintenance

### Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (optional: Sentry)
- [ ] Monitor MongoDB Atlas metrics
- [ ] Set up uptime monitoring (optional: UptimeRobot)

### Regular Maintenance
- [ ] Review function logs weekly
- [ ] Monitor database performance
- [ ] Update dependencies monthly
- [ ] Review and rotate secrets quarterly

## Troubleshooting

### Common Issues & Solutions

**CORS Errors**
- Check frontend URL in allowedOrigins
- Verify environment variables in Vercel
- Ensure credentials: true in both frontend and backend

**Database Connection Timeout**
- Verify MongoDB Atlas network access
- Check connection string format
- Ensure database user has proper permissions
- Consider increasing connection timeout

**Route Not Found**
- Verify vercel.json routes configuration
- Check route registration in server.js
- Ensure HTTP method matches route definition

**Authentication Failures**
- Verify JWT_SECRET is same in all environments
- Check token expiration settings
- Ensure Authorization header format is correct

## Rollback Plan

If deployment fails:
1. Revert to previous Git commit
2. Redeploy from Vercel dashboard
3. Check environment variables haven't changed
4. Review deployment logs for errors

## Success Metrics

Deployment is successful when:
- ✅ All health checks pass
- ✅ All API endpoints respond correctly
- ✅ Frontend can communicate with backend
- ✅ Database queries execute successfully
- ✅ No CORS errors in browser console
- ✅ Authentication flow works end-to-end

---

**Last Updated:** November 2025  
**Deployment Platform:** Vercel  
**Database:** MongoDB Atlas  
**Framework:** Express.js
