import { TwitterPlugin } from '../agent/plugins/TwitterPlugin.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testTwitterBot() {
    try {
        console.log('Initializing Twitter Plugin...');
        const twitterPlugin = new TwitterPlugin();
        
        // Test educational tweet
        const testTweet = {
            text: "🎓 Did you know? The first Bitcoin transaction was made in 2010 when Laszlo Hanyecz bought two pizzas for 10,000 BTC!\n\n#CryptoHistory #K12Education #Bitcoin"
        };

        console.log('Attempting to tweet...');
        await twitterPlugin.tweet(testTweet);
        console.log('Tweet successful! Check your Twitter account.');
    } catch (error) {
        console.error('Error testing Twitter bot:', error);
    }
}

testTwitterBot();
