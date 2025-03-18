import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

export class TwitterPlugin {
    constructor() {
        this.name = 'TwitterPlugin';
        this.client = null;
        this.description = 'K-12 Crypto History Educational Bot';
        this.tweetFormats = [
            '📚 Today in crypto history ({date}): {event}',
            '🎓 Did you know? {event} This happened on {date}!',
            '💡 Fun fact: On {date}, {event}'
        ];
        this.initializeClient();
    }

    async initializeClient() {
        try {
            if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET || 
                !process.env.TWITTER_ACCESS_TOKEN || !process.env.TWITTER_ACCESS_TOKEN_SECRET) {
                throw new Error('Twitter credentials not found in environment variables');
            }

            // Initialize with OAuth 1.0a credentials
            this.client = new TwitterApi({
                appKey: process.env.TWITTER_API_KEY,
                appSecret: process.env.TWITTER_API_SECRET,
                accessToken: process.env.TWITTER_ACCESS_TOKEN,
                accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
            });
            
            console.log('Twitter client initialized successfully with OAuth 1.0a');
        } catch (error) {
            console.error('Error initializing Twitter client:', error);
            throw error;
        }
    }

    async tweet(content) {
        try {
            if (!this.client) {
                await this.initializeClient();
            }

            // Format tweet for K-12 audience
            const formattedText = this.formatTweetForKids(content.text);

            // Post tweet
            const tweet = await this.client.v2.tweet(formattedText);
            console.log('Tweet posted successfully:', tweet.data.id);
            return tweet;
        } catch (error) {
            console.error('Error posting tweet:', error);
            throw error;
        }
    }

    formatTweetForKids(text) {
        // Ensure tweet is kid-friendly and educational
        // Add graduation cap emoji if not present
        if (!text.includes('🎓')) {
            text = '🎓 ' + text;
        }
        
        // Add educational hashtags if not present
        const hashtags = ['#K12Education', '#CryptoHistory', '#LearnCrypto'];
        const missingHashtags = hashtags.filter(tag => !text.includes(tag));
        
        if (missingHashtags.length > 0) {
            text = text.trim() + '\n\n' + missingHashtags.join(' ');
        }

        return text;
    }

    async generateEducationalTweet(event) {
        try {
            const format = this.tweetFormats[Math.floor(Math.random() * this.tweetFormats.length)];
            const tweet = format
                .replace('{date}', event.date)
                .replace('{event}', event.description);

            return this.formatTweetForKids(tweet);
        } catch (error) {
            console.error('Error generating educational tweet:', error);
            throw error;
        }
    }

    async tweetDailyEvent(event) {
        const tweetContent = await this.generateEducationalTweet(event);
        return this.tweet({ text: tweetContent });
    }
}

export default TwitterPlugin;
