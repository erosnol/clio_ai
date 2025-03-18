import TweetScheduler from './services/TweetScheduler.js';

async function startScheduler() {
    try {
        console.log('🤖 Starting Clio AI Twitter Bot...');
        
        const scheduler = new TweetScheduler();
        await scheduler.initialize();
        
        // Schedule daily tweets
        await scheduler.scheduleDailyTweets();
        
        console.log('✨ Clio AI Twitter Bot is now running!');
        console.log('📚 Posting educational crypto history tweets daily at 9:00 AM');
        
        // Keep the process running
        process.on('SIGINT', () => {
            console.log('\n👋 Shutting down Clio AI Twitter Bot...');
            process.exit(0);
        });
    } catch (error) {
        console.error('❌ Error starting scheduler:', error);
        process.exit(1);
    }
}

startScheduler();
