# Database Setup Guide

This guide will help you set up the MySQL database for the Community Platform.

## Prerequisites

1. **Install MySQL Server** (if not already installed)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP which includes MySQL

## Database Configuration

Your current database configuration (from `.env` file):
```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=community_platform
```

## Setup Options

### Option 1: Using MySQL Command Line (Recommended)

1. **Start MySQL Service**
   ```bash
   # Windows (if MySQL is installed as service)
   net start mysql
   
   # Or start XAMPP/WAMP MySQL service
   ```

2. **Connect to MySQL as root**
   ```bash
   mysql -u root -p
   ```

3. **Run the setup script**
   ```sql
   source E:\PRO\setup-mysql.sql
   ```

### Option 2: Using phpMyAdmin (if using XAMPP/WAMP)

1. Open phpMyAdmin in browser: `http://localhost/phpmyadmin`
2. Click "Import" tab
3. Choose file: `E:\PRO\setup-mysql.sql`
4. Click "Go"

### Option 3: Manual Setup

1. **Connect to MySQL**
   ```bash
   mysql -u root -p
   ```

2. **Create database and user**
   ```sql
   CREATE DATABASE IF NOT EXISTS community_platform;
   CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'yourpassword';
   GRANT ALL PRIVILEGES ON community_platform.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

## Initialize Database Tables

After setting up the database, run the Node.js setup script:

```bash
cd E:\PRO\backend
node setup-database.js
```

This will:
- Test the database connection
- Create all required tables (users, problems, solutions, comments)
- Add sample data for testing

## Troubleshooting

### Common Issues:

1. **"Access denied for user 'root'@'localhost'"**
   - Make sure MySQL service is running
   - Verify the password in `.env` matches your MySQL root password
   - Try resetting MySQL root password

2. **"Can't connect to MySQL server"**
   - Ensure MySQL service is running
   - Check if port 3306 is available
   - Verify `DB_HOST=localhost` in `.env`

3. **Database doesn't exist**
   - Run the SQL setup script first
   - Make sure `community_platform` database is created

### Reset MySQL Root Password (if needed):

1. Stop MySQL service
2. Start MySQL with skip-grant-tables:
   ```bash
   mysqld --skip-grant-tables
   ```
3. Connect without password:
   ```bash
   mysql -u root
   ```
4. Reset password:
   ```sql
   USE mysql;
   UPDATE user SET authentication_string=PASSWORD('yourpassword') WHERE User='root';
   FLUSH PRIVILEGES;
   ```

## Verify Setup

After successful setup, you should see:
```
✅ Database connection established successfully.
✅ Database tables created/updated successfully.
✅ Sample data created successfully.
🎉 Database setup completed!
```

## Next Steps

1. Update `.env` file if you used different credentials
2. Test the backend server: `npm start`
3. The application should now connect to the database successfully

## Production Database

For production deployment on Vercel, you'll need a cloud MySQL database:
- **PlanetScale** (recommended, free tier available)
- **Railway** (easy setup)
- **AWS RDS** or **Google Cloud SQL**

Update the `.env` file with your production database credentials before deploying.