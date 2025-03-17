import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
import cron from 'node-cron';
import { cryptoEvents } from '../data/cryptoEvents.js';
import { tweetTemplates } from '../templates/tweetTemplates.js';

dotenv.config();

class ClioBot {
    constructor() {
        this.twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        });
    }

    async initialize() {
        try {
            // Verify Twitter credentials
            const user = await this.twitterClient.v2.me();
            console.log('Successfully connected to Twitter as:', user.data.name);
            
            // Schedule daily tweets at 9:00 AM
            cron.schedule('0 9 * * *', () => {
                this.postDailyTweet();
                console.log('Scheduled next educational tweet for 9:00 AM tomorrow!');
            });
            
            // Post a test tweet to verify everything works
            await this.postDailyTweet();
        } catch (error) {
            console.error('Error initializing ClioBot:', error);
            throw error;
        }
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    formatTweet(event) {
        const template = this.getRandomItem(tweetTemplates.educational);
        const funFact = this.getRandomItem(tweetTemplates.funFacts);
        const reflection = this.getRandomItem(tweetTemplates.reflections);

        return template
            .replace('{event}', event.event)
            .replace('{funFact}', event.funFact || funFact)
            .replace('{significance}', event.significance)
            .replace('{reflection}', reflection);
    }

    async postDailyTweet() {
        try {
            // Get a random event appropriate for K-12 students
            const event = this.getRandomItem(cryptoEvents);

            // Format the tweet in a kid-friendly way
            const tweet = this.formatTweet(event);

            // Post the educational tweet
            await this.twitterClient.v2.tweet(tweet);
            console.log('Successfully posted educational tweet:', tweet);
        } catch (error) {
            console.error('Error posting daily tweet:', error);
        }
    }
}

// Start the bot
const bot = new ClioBot();
bot.initialize().catch(console.error);
