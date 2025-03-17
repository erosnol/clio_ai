import { EventProcessor } from '../utils/EventProcessor.js';
import { ContentAdapter } from '../utils/ContentAdapter.js';
import { AgentBuilder, ModelProviderName } from '@iqai/agent';
import { SqliteAdapter } from '@elizaos/adapter-sqlite';
import TwitterPlugin from '../plugins/TwitterPlugin.js';

class ClioAgent {
    constructor() {
        this.name = 'Clio';
        this.description = 'K-12 Crypto History Educational Agent';
        this.plugins = new Map();
        this.eventProcessor = new EventProcessor();
        this.contentAdapter = new ContentAdapter();
        
        // Initialize IQAI Brain Framework agent
        this.brainAgent = new AgentBuilder()
            .withDatabase(new SqliteAdapter('./data/clio.db'))
            .withModelProvider(ModelProviderName.OPENAI, process.env.OPENAI_API_KEY)
            .withCharacter({
                name: 'Clio',
                bio: 'The Muse of History, now chronicling the evolution of cryptocurrency for K-12 students.',
                username: 'clio_crypto_muse',
                messageExamples: [
                    'Did you know Bitcoin was created in 2008? Let me tell you the story...',
                    'Today we are exploring how smart contracts changed the crypto world!'
                ],
                lore: [
                    'Embodies the spirit of Clio, the Greek Muse of History',
                    'Specializes in making complex crypto concepts accessible to young minds',
                    'Brings ancient wisdom to modern technology'
                ],
                style: {
                    all: ['Educational', 'Engaging'],
                    chat: ['Patient', 'Encouraging'],
                    post: ['Clear', 'Inspiring']
                }
            })
            .build();

        // Initialize Twitter plugin
        this.initializeTwitterPlugin();
    }

    // Plugin management
    registerPlugin(plugin) {
        this.plugins.set(plugin.name, plugin);
        console.log(`Registered plugin: ${plugin.name}`);
    }

    async initializeTwitterPlugin() {
        const twitterPlugin = new TwitterPlugin();
        this.registerPlugin(twitterPlugin);
    }

    async start() {
        try {
            await this.brainAgent.start();
            console.log('Clio AI Agent started successfully');
            
            // Schedule daily educational tweets
            this.scheduleDailyTweets();
        } catch (error) {
            console.error('Error starting Clio AI Agent:', error);
            throw error;
        }
    }

    async scheduleDailyTweets() {
        // Post an educational tweet every 24 hours
        setInterval(async () => {
            try {
                const events = await this.collectHistoricalEvents();
                if (events.length > 0) {
                    const randomEvent = events[Math.floor(Math.random() * events.length)];
                    const processedEvent = await this.processHistoricalEvent(randomEvent);
                    const twitterPlugin = this.plugins.get('TwitterPlugin');
                    await twitterPlugin.tweetDailyEvent(processedEvent);
                }
            } catch (error) {
                console.error('Error posting daily tweet:', error);
            }
        }, 24 * 60 * 60 * 1000); // 24 hours
    }

    // Core educational functions
    async adaptContentForGradeLevel(content, gradeLevel) {
        return this.contentAdapter.adapt(content, gradeLevel);
    }

    async generateLearningResources(content, gradeLevel) {
        return this.contentAdapter.generateResources(content, gradeLevel);
    }

    // Event processing
    async processHistoricalEvent(event) {
        const processedEvent = await this.eventProcessor.process(event);
        const educationalContent = await this.adaptContentForGradeLevel(
            processedEvent.content,
            processedEvent.targetGradeLevel
        );
        
        return {
            ...processedEvent,
            educationalContent,
            learningObjectives: this.contentAdapter.generateObjectives(processedEvent),
            keyTerms: this.contentAdapter.extractKeyTerms(processedEvent),
            thinkingPoints: this.contentAdapter.generateThinkingPoints(processedEvent),
            funFacts: this.contentAdapter.generateFunFacts(processedEvent)
        };
    }

    // Data collection
    async collectHistoricalEvents(options) {
        const events = [];
        for (const plugin of this.plugins.values()) {
            if (plugin.collectEvents) {
                const pluginEvents = await plugin.collectEvents(options);
                events.push(...pluginEvents);
            }
        }
        return events;
    }
}

export default ClioAgent;
