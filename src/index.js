const { Brain } = require('@iqai/brain');
const { TwitterPlugin } = require('@iqai/brain-twitter');
const { Web3Plugin } = require('@iqai/brain-web3');
const { calculateEventSignificance } = require('./utils/eventSignificance');
require('dotenv').config();

// Initialize Brain agent
const agent = new Brain({
  name: 'Clio',
  description: 'A crypto history aggregator that documents significant events for historical record',
  category: 'Research',
  plugins: [
    new TwitterPlugin({
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_SECRET,
      bearerToken: process.env.TWITTER_BEARER_TOKEN
    }),
    new Web3Plugin()
  ]
});

// Define agent capabilities
agent.defineCapability('collectHistoricalEvents', async (context) => {
  const { startDate, endDate, minSignificanceScore = 70 } = context;
  
  // Collect events from Twitter
  const twitterEvents = await agent.plugins.twitter.searchTweets({
    query: 'crypto OR bitcoin OR ethereum hack OR breach OR regulation OR ban OR adoption OR upgrade OR fork OR merge OR acquire OR bankruptcy',
    startTime: startDate,
    endTime: endDate,
    filters: 'is:verified -is:retweet min_faves:1000'
  });

  // Process and filter significant events
  const significantEvents = twitterEvents
    .map(tweet => ({
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
      entities: tweet.entities,
      sourceCredibility: tweet.author.verified ? 'high' : 'medium'
    }))
    .map(event => ({
      ...event,
      significance: calculateEventSignificance(event)
    }))
    .filter(event => event.significance.score >= minSignificanceScore);

  return significantEvents;
});

agent.defineCapability('enrichEventData', async (event) => {
  // Enrich event with additional context and cross-references
  const enrichedEvent = { ...event };

  // Get related tweets for cross-referencing
  const relatedTweets = await agent.plugins.twitter.searchTweets({
    query: `url:"${event.sourceUrl}" OR (${event.content.substring(0, 100)})`,
    startTime: new Date(event.timestamp).toISOString(),
    endTime: new Date(new Date(event.timestamp).getTime() + 24 * 60 * 60 * 1000).toISOString() // 24 hours after
  });

  enrichedEvent.crossReferences = relatedTweets
    .filter(tweet => tweet.id !== event.id)
    .map(tweet => ({
      id: tweet.id,
      url: `https://twitter.com/i/web/status/${tweet.id}`,
      author: tweet.author.username,
      content: tweet.text
    }));

  // Add market data if available
  try {
    const marketData = await agent.plugins.web3.getMarketData(event.timestamp);
    enrichedEvent.marketMetrics = {
      btcPrice: marketData.bitcoin.price,
      btcMarketCap: marketData.bitcoin.marketCap,
      ethPrice: marketData.ethereum.price,
      ethMarketCap: marketData.ethereum.marketCap,
      totalMarketCap: marketData.total.marketCap
    };
  } catch (error) {
    console.warn('Could not fetch market data:', error.message);
  }

  return enrichedEvent;
});

agent.defineCapability('categorizeEvent', async (event) => {
  // Categorize the event based on content and impact
  const categories = [];
  const contentLower = event.content.toLowerCase();

  // Technical events
  if (contentLower.includes('fork') || contentLower.includes('upgrade') || contentLower.includes('protocol')) {
    categories.push('technical');
  }

  // Security events
  if (contentLower.includes('hack') || contentLower.includes('breach') || contentLower.includes('exploit')) {
    categories.push('security');
  }

  // Regulatory events
  if (contentLower.includes('regulation') || contentLower.includes('sec') || contentLower.includes('ban')) {
    categories.push('regulatory');
  }

  // Market events
  if (event.marketMetrics && (
    Math.abs(event.marketMetrics.btcPrice) > 20 || 
    Math.abs(event.marketMetrics.ethPrice) > 20
  )) {
    categories.push('market');
  }

  // Adoption events
  if (contentLower.includes('adoption') || contentLower.includes('partnership') || contentLower.includes('integration')) {
    categories.push('adoption');
  }

  return {
    ...event,
    categories,
    primaryCategory: categories[0] || 'general'
  };
});

// Start the agent
agent.start().catch(console.error);
