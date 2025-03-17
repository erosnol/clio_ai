# Clio AI - Crypto History Educational Agent

A Brain framework-based AI agent designed to collect, analyze, and present cryptocurrency history in an educational format suitable for K-12 students.

## Project Overview

Clio AI, named after the Greek muse of history, is built on the IQ AI Brain framework and:
- Collects cryptocurrency-related events from social media and blockchain sources
- Creates a comprehensive timeline of crypto history since 2010
- Processes and presents information in an educational, age-appropriate format

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

3. Run the agent:
```bash
npm start
```

## Project Structure

```
clio-ai/
├── src/
│   ├── index.js           # Main agent entry point
│   └── utils/             # Utility functions and helpers
│       └── gradeVocabulary.js  # Grade-level content adaptation
├── package.json           # Project configuration and dependencies
└── .env                   # Environment configuration
```

## Brain Framework Integration

This agent is built using the Brain framework and utilizes several plugins:
- `@iqai/brain-twitter`: For social media data collection
- `@iqai/brain-web3`: For blockchain data integration

### Agent Capabilities

1. Historical Event Collection
   - Twitter data scraping
   - Blockchain event monitoring
   - News aggregation

2. Educational Processing
   - Grade-level content adaptation
   - Learning objective generation
   - Interactive activity creation

## Features

- Automated crypto event collection
- Grade-appropriate content processing (Elementary, Middle, High School)
- Educational timeline generation
- Interactive learning activities
- ATP (Agent Tokenization Platform) compatible

## License

MIT License
