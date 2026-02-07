# 🎯 Production Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Copy `.env.example` to `.env.local` (client)
- [ ] Copy `.env.example` to `.env` (server)
- [ ] Fill in all required environment variables
- [ ] Set `NODE_ENV=production`
- [ ] Configure database connection string
- [ ] Set up JWT secret (use strong, random value)
- [ ] Configure CORS origins (client/admin URLs)

### Code Review
- [ ] No console.logs in production code
- [ ] All API endpoints use HTTPS in production
- [ ] Image domains whitelisted in next.config
- [ ] Error tracking service configured (optional but recommended)

### Build & Test
- [ ] `cd client && pnpm install && pnpm build`
- [ ] `cd admin && pnpm install && pnpm build`
- [ ] `cd server && npm install`
- [ ] Test production build locally (`pnpm start`)
- [ ] Verify all pages load correctly
- [ ] Test error boundaries (throw test error)
- [ ] Test chunk error recovery (hard refresh 3-4 times)

---

## Deployment

### Server Deployment
- [ ] Deploy to hosting (VPS, Heroku, Railway, etc.)
- [ ] Set environment variables on hosting platform
- [ ] Configure MongoDB connection
- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Test `/health` endpoint
- [ ] Monitor server logs for errors

### Client/Admin Deployment
- [ ] Deploy to Vercel/Netlify/similar
- [ ] Set environment variables
- [ ] Configure custom domain (if applicable)
- [ ] Enable HTTPS
- [ ] Test all routes work
- [ ] Verify images load from CDN
- [ ] Check Network tab for caching

### Database
- [ ] Database is backed up
- [ ] Connection pooling configured
- [ ] Indexes created for frequent queries
- [ ] Monitor connection count

---

## Post-Deployment Verification

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] User can browse products
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Payment integration works
- [ ] Email notifications sent
- [ ] Admin panel accessible
- [ ] Image uploads work

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Images load quickly
- [ ] API responses < 1 second
- [ ] No memory leaks
- [ ] Lighthouse score > 80

### Error Handling Tests
- [ ] 404 page shows for invalid routes
- [ ] Error boundaries catch component errors
- [ ] Chunk errors auto-recover
- [ ] API failures retry automatically
- [ ] Network errors handled gracefully

### Security Checks
- [ ] HTTPS enabled everywhere
- [ ] API endpoints require authentication where needed
- [ ] No sensitive data in error messages
- [ ] CORS configured correctly
- [ ] Rate limiting enabled (recommended)

---

## Monitoring Setup

### Essential
- [ ] Server health check endpoint monitored
- [ ] Database connection monitored
- [ ] Error logs accessible
- [ ] Uptime monitoring (UptimeRobot, Pingdom, etc.)

### Recommended
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Performance monitoring (Web Vitals)
- [ ] User analytics (Google Analytics, Plausible)
- [ ] Server metrics (CPU, memory, disk)

### Optional
- [ ] APM (Application Performance Monitoring)
- [ ] Log aggregation (ELK stack, Papertrail)
- [ ] Alert system (PagerDuty, Slack)

---

## Performance Optimization

### CDN Setup
- [ ] Static assets served via CDN
- [ ] Images optimized (WebP/AVIF)
- [ ] Gzip/Brotli compression enabled
- [ ] Cache headers configured

### Database Optimization
- [ ] Indexes on frequently queried fields
- [ ] Connection pooling enabled
- [ ] Query performance monitored
- [ ] Database cache (Redis) if needed

### Client Optimization
- [ ] Code splitting working
- [ ] Lazy loading for images
- [ ] Bundle size < 500KB
- [ ] First Contentful Paint < 2s

---

## Rollback Plan

### If Issues Occur
1. [ ] Have backup of previous working version
2. [ ] Can quickly revert to previous deployment
3. [ ] Database migrations are reversible
4. [ ] Know how to check server logs
5. [ ] Have contact for team members

### Emergency Contacts
- [ ] DevOps/Infrastructure contact
- [ ] Database administrator contact
- [ ] Frontend developer contact
- [ ] Backend developer contact

---

## Documentation

### Updated
- [ ] API documentation current
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Troubleshooting guide available

### Created
- [ ] Runbook for common issues
- [ ] Monitoring dashboard guide
- [ ] Backup/restore procedures
- [ ] Incident response plan

---

## Team Communication

### Before Deployment
- [ ] Notify team of deployment time
- [ ] Schedule maintenance window (if needed)
- [ ] Prepare rollback plan
- [ ] Assign monitoring duties

### During Deployment
- [ ] Real-time communication channel active
- [ ] Monitor error rates
- [ ] Watch for user reports
- [ ] Check all critical flows

### After Deployment
- [ ] Confirm all systems operational
- [ ] Monitor for 24-48 hours
- [ ] Review error logs
- [ ] Gather user feedback

---

## Long-term Maintenance

### Weekly
- [ ] Review error logs
- [ ] Check server health
- [ ] Monitor performance metrics
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Backup verification

### Quarterly
- [ ] Major dependency updates
- [ ] Security penetration testing
- [ ] Performance benchmarking
- [ ] Architecture review

---

## Success Metrics

### Target Goals
- [ ] Uptime > 99.9%
- [ ] Error rate < 0.1%
- [ ] Page load time < 2s
- [ ] API response time < 500ms
- [ ] Zero chunk load errors
- [ ] User satisfaction > 90%

### Monitoring Dashboard Should Show
- [ ] Request volume
- [ ] Error rates
- [ ] Response times
- [ ] Server resources (CPU, memory)
- [ ] Database performance
- [ ] Active users

---

## 🎉 Deployment Complete!

Once all items are checked:
1. ✅ Your application is production-ready
2. ✅ Error handling is robust
3. ✅ Performance is optimized
4. ✅ Monitoring is in place
5. ✅ Team is prepared

**Congratulations on a successful deployment!** 🚀

---

## Quick Reference

### Health Check
```bash
curl https://your-api-domain.com/health
```

### View Logs
```bash
# Server logs
pm2 logs

# Client/Admin (Vercel)
vercel logs
```

### Emergency Rollback
```bash
# Revert to previous deployment
vercel rollback  # or your platform's rollback command
```

---

**Remember:** This checklist ensures a smooth, professional deployment. Take your time with each step! ✨
