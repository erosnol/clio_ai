import TwitterPlugin from '../agent/plugins/TwitterPlugin.js';
import dotenv from 'dotenv';

dotenv.config();

async function testClioBot() {
    try {
        console.log('🤖 Initializing Clio Bot...');
        const twitterPlugin = new TwitterPlugin();

        // Sample historical event
        const historicalEvent = {
            date: 'January 3, 2009',
            title: 'Bitcoin Genesis Block',
            description: 'Satoshi Nakamoto mined the first Bitcoin block (Genesis Block), marking the birth of Bitcoin.',
            funFacts: ['The Genesis Block contained a hidden message referring to a Times newspaper headline!'],
            keyTerms: [{
                term: 'Genesis Block',
                definition: 'The first block of a blockchain, also known as Block 0 or Block 1'
            }]
        };

        console.log('📝 Generating educational tweet...');
        const tweet = await twitterPlugin.generateEducationalTweet(historicalEvent);
        console.log('Generated tweet:', tweet);

        console.log('🐦 Posting to Twitter...');
        await twitterPlugin.tweetDailyEvent(historicalEvent);
        console.log('✅ Test completed successfully!');
    } catch (error) {
        console.error('❌ Error testing Clio bot:', error);
    }
}

testClioBot();
