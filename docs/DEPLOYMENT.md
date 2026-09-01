# Deployment Guide

## Deployment Options

### 1. Heroku Deployment

#### Prerequisites
- Heroku CLI installed
- Heroku account
- MongoDB Atlas account (for cloud database)

#### Steps

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Add MongoDB Atlas URI
heroku config:set DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Add other environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### 2. AWS Deployment

#### Using Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p node.js-14 social-media-backend

# Create environment
eb create production

# Deploy
eb deploy

# View logs
eb logs
```

#### Using EC2

```bash
# 1. Launch EC2 instance (Ubuntu 20.04)
# 2. Connect via SSH
# 3. Install Node.js and dependencies
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install MongoDB
# 5. Clone repository
git clone <repo-url>
cd social-media-platform/backend

# 6. Install dependencies
npm install

# 7. Create .env file
nano .env

# 8. Install PM2 for process management
npm install -g pm2

# 9. Start application
pm2 start server.js --name "social-media-api"
pm2 save
pm2 startup

# 10. Setup Nginx as reverse proxy
sudo apt-get install nginx
# Configure /etc/nginx/sites-available/default
```

### 3. Docker Deployment

#### Dockerfile

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/social-media
      - NODE_ENV=production
    depends_on:
      - mongo

  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

#### Deploy with Docker

```bash
docker-compose up -d
```

### 4. DigitalOcean Deployment

```bash
# 1. Create Droplet (Ubuntu 20.04)
# 2. SSH into droplet
ssh root@your_droplet_ip

# 3. Install dependencies
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# 4. Clone and setup
git clone <repo-url>
cd social-media-platform/backend
npm install

# 5. Configure Nginx
sudo nano /etc/nginx/sites-available/default

# 6. Start with PM2
npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

### 5. Vercel/Netlify (Frontend Only)

#### Deploy Frontend on Vercel

```bash
npm install -g vercel
vercel
```

#### Deploy Frontend on Netlify

```bash
npm run build
# Connect to Netlify from dashboard
```

## Production Checklist

### Security
- [ ] Change JWT_SECRET to strong random value
- [ ] Enable HTTPS everywhere
- [ ] Set secure CORS origins
- [ ] Enable security headers (Helmet.js)
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular security audits

### Database
- [ ] Enable MongoDB authentication
- [ ] Set up regular backups
- [ ] Create database indexes
- [ ] Monitor database performance
- [ ] Set up database encryption

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging (Winston/Morgan)
- [ ] Monitor server performance
- [ ] Set up uptime monitoring
- [ ] Configure alerts

### Performance
- [ ] Enable gzip compression
- [ ] Set up CDN for static files
- [ ] Optimize database queries
- [ ] Implement caching
- [ ] Use load balancing

### Backups
- [ ] Daily database backups
- [ ] Store backups securely
- [ ] Test restore procedures
- [ ] Document backup schedule

## Environment Variables (Production)

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=generate_long_random_string_here
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## SSL Certificate Setup

### Using Let's Encrypt with Nginx

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
sudo certbot renew --dry-run
```

## Monitoring and Logs

### PM2 Monitoring

```bash
pm2 monit
pm2 logs
pm2 restart all
```

### Nginx Logs

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if server is running
   - Verify port is correct
   - Check firewall rules

2. **Database Connection Error**
   - Verify DATABASE_URL
   - Check MongoDB is running
   - Verify credentials

3. **CORS Errors**
   - Check FRONTEND_URL matches request origin
   - Verify CORS configuration

4. **Performance Issues**
   - Check database indexes
   - Review slow queries
   - Monitor memory usage
   - Scale horizontally if needed

## Support

For deployment issues, check:
- Application logs
- Server error logs
- Database logs
- Network connectivity
- SSL certificate validity
