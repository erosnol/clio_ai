import { EventProcessor } from '../utils/EventProcessor.js';
import { ContentAdapter } from '../utils/ContentAdapter.js';

class ClioAgent {
    constructor() {
        this.name = 'Clio';
        this.description = 'K-12 Crypto History Educational Agent';
        this.plugins = new Map();
        this.eventProcessor = new EventProcessor();
        this.contentAdapter = new ContentAdapter();
    }

    // Plugin management
    registerPlugin(plugin) {
        this.plugins.set(plugin.name, plugin);
        console.log(`Registered plugin: ${plugin.name}`);
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
