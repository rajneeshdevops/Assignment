const sequelize = require('./config/db');
const { User, Problem, Solution, Comment, syncDB } = require('./models');

async function setupDatabase() {
    try {
        console.log('🔄 Testing database connection...');
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        console.log('🔄 Creating/updating database tables...');
        await syncDB();
        console.log('✅ Database tables created/updated successfully.');

        console.log('🔄 Creating sample data...');
        
        // Create a sample user
        const sampleUser = await User.findOrCreate({
            where: { email: 'admin@example.com' },
            defaults: {
                username: 'admin',
                email: 'admin@example.com',
                password: '$2b$10$example.hash.for.password123' // This should be hashed in real app
            }
        });

        // Create a sample problem
        const sampleProblem = await Problem.findOrCreate({
            where: { title: 'Sample Community Problem' },
            defaults: {
                title: 'Sample Community Problem',
                description: 'This is a sample problem to test the platform functionality.',
                location: 'Sample Location',
                imageUrl: 'https://via.placeholder.com/400x300',
                userId: sampleUser[0].id
            }
        });

        console.log('✅ Sample data created successfully.');
        console.log('🎉 Database setup completed!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Database setup failed:', error);
        process.exit(1);
    }
}

// Run the setup
setupDatabase();