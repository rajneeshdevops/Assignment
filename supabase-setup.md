# Supabase PostgreSQL Setup Guide (FREE)

## Why Supabase?
- ✅ **Completely FREE** (no trial, no credit card required)
- ✅ 500MB database storage
- ✅ PostgreSQL with full SQL access
- ✅ Built-in authentication (bonus feature)
- ✅ Real-time subscriptions
- ✅ No time limits

## Step 1: Create Supabase Account & Project

1. **Go to Supabase**: https://supabase.com
2. **Sign up**: Use GitHub, Google, or email
3. **Create New Project**:
   - Project name: `community-platform`
   - Database password: Create a strong password (save it!)
   - Region: Choose closest to your users
   - Click "Create new project"

## Step 2: Get Database Credentials

After project creation (takes ~2 minutes):

1. **Go to Settings**: Click gear icon → "Database"
2. **Copy Connection Info**:
   - Host: `db.xxx.supabase.co`
   - Database name: `postgres`
   - Port: `5432`
   - User: `postgres`
   - Password: (the one you created)

## Step 3: Get Connection String

In Settings → Database, you'll find:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

## Step 4: Configure Vercel Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables:

```
DB_HOST = db.xxx.supabase.co
DB_USER = postgres
DB_PASS = [your-password]
DB_NAME = postgres
NODE_ENV = production
```

## Step 5: Create Database Schema

1. **Go to Supabase Dashboard**: Your project → "SQL Editor"
2. **Run Schema**: Copy content from `setup-postgres.sql` and execute
3. **Verify Tables**: Check "Table Editor" to see your tables

## Step 6: Deploy & Test

1. Redeploy your Vercel app
2. Test API endpoints
3. Check database connections

## Bonus Features Available:
- **Authentication**: Built-in user management
- **Real-time**: Live data updates
- **Storage**: File uploads
- **Edge Functions**: Serverless functions

## Connection Security:
- SSL enabled by default
- Row Level Security (RLS) available
- API keys for additional security