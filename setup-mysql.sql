-- MySQL setup script for Community Platform
-- Run this script as MySQL root user

-- Create the database
CREATE DATABASE IF NOT EXISTS community_platform;

-- Create user with the credentials from .env file
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'yourpassword';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON community_platform.* TO 'root'@'localhost';

-- Refresh privileges
FLUSH PRIVILEGES;

-- Use the database
USE community_platform;

-- Show that database is ready
SELECT 'Database setup completed successfully!' as status;