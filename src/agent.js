import { Agent } from 'brain';
import { calculateEventSignificance } from './utils/eventSignificance.js';

class ClioAgent extends Agent {
    constructor() {
        super({
            name: 'Clio',
            description: 'A crypto history aggregator that documents significant events for historical record',
            category: 'Research'
        });

        this.capabilities = [
            'collectHistoricalEvents',
            'enrichEventData',
            'categorizeEvent'
        ];
    }

    // Agent capabilities
    async collectHistoricalEvents({ startDate, endDate, minSignificanceScore = 70 }) {
        try {
            const query = 'crypto OR bitcoin OR ethereum hack OR breach OR regulation OR ban OR adoption';
            const tweets = await this.twitter.searchTweets(query, {
                startTime: startDate,
                endTime: endDate,
                filters: 'is:verified -is:retweet min_faves:1000'
            });

            const events = tweets.map(tweet => ({
                id: tweet.id,
                timestamp: tweet.created_at,
                content: tweet.text,
                source: 'twitter',
                sourceUrl: `https://twitter.com/i/web/status/${tweet.id}`,
                author: tweet.author,
                socialMetrics: {
                    retweets: tweet.public_metrics.retweet_count,
                    likes: tweet.public_metrics.like_count,
                    replies: tweet.public_metrics.reply_count
                },
                sourceCredibility: tweet.author.verified ? 'high' : 'medium'
            }));

            return events
                .map(event => ({
                    ...event,
                    significance: calculateEventSignificance(event)
                }))
                .filter(event => event.significance.score >= minSignificanceScore);
        } catch (error) {
            console.error('Error collecting historical events:', error);
            throw error;
        }
    }

    async enrichEventData(event) {
        try {
            // Get related tweets
            const relatedTweets = await this.twitter.getRelatedTweets(event.id);
            
            // Add cross-references
            const enrichedEvent = {
                ...event,
                crossReferences: relatedTweets.map(tweet => ({
                    id: tweet.id,
                    url: `https://twitter.com/i/web/status/${tweet.id}`,
                    author: tweet.author.username,
                    content: tweet.text
                }))
            };

            // Add market data if available
            try {
                const marketData = await this.web3.getMarketData(event.timestamp);
                enrichedEvent.marketMetrics = {
                    btcPrice: marketData.bitcoin.price,
                    btcMarketCap: marketData.bitcoin.marketCap,
                    ethPrice: marketData.ethereum.price,
                    ethMarketCap: marketData.ethereum.marketCap,
                    totalMarketCap: marketData.total.marketCap
                };
            } catch (err) {
                console.warn('Could not fetch market data:', err.message);
            }

            return enrichedEvent;
        } catch (error) {
            console.error('Error enriching event data:', error);
            throw error;
        }
    }

    async categorizeEvent(event) {
        const categories = [];
        const contentLower = event.content.toLowerCase();

        // Categorize based on content
        if (contentLower.includes('fork') || contentLower.includes('upgrade') || 
            contentLower.includes('protocol')) {
            categories.push('technical');
        }
        if (contentLower.includes('hack') || contentLower.includes('breach') || 
            contentLower.includes('exploit')) {
            categories.push('security');
        }
        if (contentLower.includes('regulation') || contentLower.includes('sec') || 
            contentLower.includes('ban')) {
            categories.push('regulatory');
        }
        if (contentLower.includes('adoption') || contentLower.includes('partnership') || 
            contentLower.includes('integration')) {
            categories.push('adoption');
        }

        // Market events based on metrics
        if (event.marketMetrics && (
            Math.abs(event.marketMetrics.btcPrice) > 20 || 
            Math.abs(event.marketMetrics.ethPrice) > 20
        )) {
            categories.push('market');
        }

        return {
            ...event,
            categories,
            primaryCategory: categories[0] || 'general'
        };
    }

    // Plugin management
    use(plugin) {
        this[plugin.name] = plugin;
        plugin.onLoad?.();
    }
}

export default ClioAgent;
