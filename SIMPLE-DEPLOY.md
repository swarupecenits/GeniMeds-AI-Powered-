# 🚀 Simple Deployment Guide

## Local Development (Default)

Just run the app normally - it uses `serviceAccountKey.json` for Firebase:

```bash
# Backend
cd Backend
npm start

# Frontend  
cd Frontend
npm run dev
```

## Deployment Setup

### 1. Prepare Backend for Deployment

```bash
cd Backend
npm run setup-deploy
```

This will:
- Update your `.env` file with Firebase credentials from `serviceAccountKey.json`
- Set `NODE_ENV=production`

### 2. Update URLs for Production

**Backend `.env`**: Change `MONGO_URI` to your production database:
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/genimeds
```

**Frontend `.env`**: Change `VITE_API_BASE_URL` to your deployed backend:
```
VITE_API_BASE_URL=https://your-backend-url.com
```

### 3. Deploy

- **Backend**: Deploy with your updated `.env` file
- **Frontend**: Deploy with your updated `.env` file

### 4. Reset for Local Development

When you want to go back to local development:

```bash
cd Backend
npm run setup-local
```

This resets everything back to use the service account file locally.

## That's It! 

- **Local**: Uses `serviceAccountKey.json` (no setup needed)
- **Deploy**: Run `npm run setup-deploy`, update URLs, deploy
- **Back to Local**: Run `npm run setup-local`

Single `.env` file, works everywhere! 🎉
