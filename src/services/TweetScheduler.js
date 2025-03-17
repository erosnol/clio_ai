import { TwitterPlugin } from '../agent/plugins/TwitterPlugin.js';
import { cryptoEvents } from '../data/cryptoEvents.js';
import cron from 'node-cron';

class TweetScheduler {
    constructor() {
        this.twitterPlugin = new TwitterPlugin();
    }

    async initialize() {
        await this.twitterPlugin.initializeClient();
    }

    // Get a random event from our crypto history
    getRandomEvent() {
        const randomIndex = Math.floor(Math.random() * cryptoEvents.length);
        return cryptoEvents[randomIndex];
    }

    // Format event with historical context and insights
    formatEventTweet(event) {
        // Rotate between different tweet styles for variety
        const styles = [
            // Style 1: Focus on historical significance
            () => `📅 ${event.date}\n\n${event.description}\n\n🔍 Historical Impact: ${event.significance}\n\n#CryptoHistory #Blockchain #Innovation`,
            
            // Style 2: Focus on technical details
            () => `⚡️ On This Day in Crypto:\n\n${event.description}\n\n💻 Technical Insight: ${event.technicalDetails}\n\n#Cryptocurrency #Tech #Blockchain`,
            
            // Style 3: Focus on long-term impact
            () => `🌟 Crypto History Spotlight:\n\n${event.description}\n\n🔮 Legacy: ${event.impact}\n\n#Crypto #FinTech #Future`
        ];

        // Select a random style
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        return randomStyle();
    }

    // Schedule daily tweets
    async scheduleDailyTweets() {
        // Schedule tweet for 9:00 AM every day (prime time for crypto thought leadership)
        cron.schedule('0 9 * * *', async () => {
            try {
                const event = this.getRandomEvent();
                const tweet = this.formatEventTweet(event);
                await this.twitterPlugin.tweet(tweet);
                console.log('✅ Daily educational tweet posted successfully!');
            } catch (error) {
                console.error('❌ Error posting daily tweet:', error);
            }
        });

        console.log('🎯 Daily tweets scheduled for 9:00 AM');
    }
}

export default TweetScheduler;
