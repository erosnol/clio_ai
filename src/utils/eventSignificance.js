// Criteria for determining historical significance of crypto events
const SIGNIFICANCE_CRITERIA = {
  // Market Impact
  MARKET_THRESHOLDS: {
    PRICE_CHANGE_PERCENT: 20,      // Significant price movements
    MARKET_CAP_CHANGE: 10000000000 // $10B market cap changes
  },

  // Social Impact
  SOCIAL_THRESHOLDS: {
    MIN_RETWEETS: 5000,
    MIN_LIKES: 10000,
    MIN_REPLIES: 1000
  },

  // Key Event Types
  SIGNIFICANT_EVENTS: [
    'hack',
    'security breach',
    'regulation',
    'government ban',
    'major adoption',
    'protocol upgrade',
    'fork',
    'merger',
    'acquisition',
    'bankruptcy',
    'launch',
    'partnership'
  ],

  // Key Industry Players
  SIGNIFICANT_ENTITIES: [
    'Bitcoin',
    'Ethereum',
    'Binance',
    'Coinbase',
    'FTX',      // Historical context
    'SEC',
    'CFTC',
    'Federal Reserve',
    'EU Commission'
  ]
};

function calculateEventSignificance(event) {
  let significanceScore = 0;
  
  // Market impact scoring
  if (event.marketMetrics) {
    if (Math.abs(event.marketMetrics.priceChangePercent) >= SIGNIFICANCE_CRITERIA.MARKET_THRESHOLDS.PRICE_CHANGE_PERCENT) {
      significanceScore += 30;
    }
    if (Math.abs(event.marketMetrics.marketCapChange) >= SIGNIFICANCE_CRITERIA.MARKET_THRESHOLDS.MARKET_CAP_CHANGE) {
      significanceScore += 30;
    }
  }

  // Social impact scoring
  if (event.socialMetrics) {
    if (event.socialMetrics.retweets >= SIGNIFICANCE_CRITERIA.SOCIAL_THRESHOLDS.MIN_RETWEETS) {
      significanceScore += 10;
    }
    if (event.socialMetrics.likes >= SIGNIFICANCE_CRITERIA.SOCIAL_THRESHOLDS.MIN_LIKES) {
      significanceScore += 10;
    }
    if (event.socialMetrics.replies >= SIGNIFICANCE_CRITERIA.SOCIAL_THRESHOLDS.MIN_REPLIES) {
      significanceScore += 10;
    }
  }

  // Event type scoring
  if (event.content) {
    const contentLower = event.content.toLowerCase();
    SIGNIFICANCE_CRITERIA.SIGNIFICANT_EVENTS.forEach(eventType => {
      if (contentLower.includes(eventType.toLowerCase())) {
        significanceScore += 20;
      }
    });
  }

  // Key entity scoring
  if (event.content) {
    const contentLower = event.content.toLowerCase();
    SIGNIFICANCE_CRITERIA.SIGNIFICANT_ENTITIES.forEach(entity => {
      if (contentLower.includes(entity.toLowerCase())) {
        significanceScore += 15;
      }
    });
  }

  // Source credibility bonus
  if (event.sourceCredibility === 'high') {
    significanceScore += 20;
  }

  // Cross-reference bonus
  if (event.crossReferences && event.crossReferences.length > 0) {
    significanceScore += 15 * event.crossReferences.length;
  }

  return {
    score: significanceScore,
    isHistoryWorthy: significanceScore >= 70 // Threshold for historical significance
  };
}

module.exports = {
  SIGNIFICANCE_CRITERIA,
  calculateEventSignificance
};
