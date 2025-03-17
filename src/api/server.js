import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Educational crypto history events for K-12 students
const events = [
    {
        id: 1,
        date: 'October 31, 2008',
        title: 'The Birth of Bitcoin',
        description: 'Satoshi Nakamoto introduces Bitcoin to the world! This special document called a "whitepaper" explained how we could create digital money that works without banks.',
        category: 'technical',
        keyTerms: [
            { term: 'Whitepaper', definition: 'A document that explains a new idea or technology' },
            { term: 'Digital Money', definition: 'Money that exists only on computers' },
            { term: 'Decentralized', definition: 'Not controlled by one person or group' }
        ],
        thinkingPoints: [
            'How is Bitcoin different from regular money?',
            'Why might people want to use digital money?',
            'What problems could Bitcoin solve?'
        ],
        funFacts: [
            'The first Bitcoin was created on January 3, 2009',
            'No one knows who Satoshi Nakamoto really is!',
            'Bitcoin\'s code is like a recipe that anyone can see'
        ]
    },
    {
        id: 2,
        date: 'May 22, 2010',
        title: 'The Famous Bitcoin Pizza',
        description: 'A programmer named Laszlo bought two pizzas using 10,000 Bitcoin! This was the first time someone used Bitcoin to buy something in the real world.',
        category: 'adoption',
        keyTerms: [
            { term: 'Transaction', definition: 'When you buy or sell something' },
            { term: 'Real-world Usage', definition: 'Using digital money to buy actual things' },
            { term: 'Value', definition: 'How much something is worth' }
        ],
        thinkingPoints: [
            'Why was buying a pizza with Bitcoin special?',
            'How has the value of Bitcoin changed since then?',
            'What else can you buy with Bitcoin today?'
        ],
        funFacts: [
            'Those pizzas cost about $41 at the time',
            'Today, 10,000 Bitcoin would be worth millions of dollars!',
            'May 22nd is now celebrated as "Bitcoin Pizza Day"'
        ]
    },
    {
        id: 3,
        date: 'June 1, 2011',
        title: 'Crypto Goes to School',
        description: 'People start learning about cryptocurrency in schools and universities! Teachers begin creating special lessons to help students understand this new kind of money.',
        category: 'cultural',
        keyTerms: [
            { term: 'Cryptocurrency', definition: 'Digital money that uses special codes to keep it safe' },
            { term: 'Blockchain', definition: 'A special list that keeps track of all cryptocurrency transactions' },
            { term: 'Innovation', definition: 'A new idea or way of doing things' }
        ],
        thinkingPoints: [
            'Why is it important to learn about cryptocurrency?',
            'How might cryptocurrency change the future?',
            'What new jobs might exist because of cryptocurrency?'
        ],
        funFacts: [
            'Many schools now offer classes about cryptocurrency',
            'Kids as young as elementary school are learning about digital money',
            'Some students have even created their own cryptocurrencies!'
        ]
    }
];

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API Routes for K-12 Educational Content

// Get all events with kid-friendly formatting
app.get('/api/events', (req, res) => {
    const { category } = req.query;
    
    let filteredEvents = events;
    if (category && category !== 'all') {
        filteredEvents = events.filter(event => event.category === category);
    }

    res.json({ 
        events: filteredEvents,
        message: 'Welcome young crypto historians! 🎓'
    });
});

// Get event categories with kid-friendly descriptions
app.get('/api/categories', (req, res) => {
    const categories = [
        { 
            id: 'technical', 
            name: 'Tech Adventures', 
            description: 'Discover the amazing technology behind cryptocurrency!',
            icon: 'microchip',
            level: 'Explorer'
        },
        { 
            id: 'adoption', 
            name: 'Real World Stories', 
            description: 'See how people started using digital money in their daily lives',
            icon: 'users',
            level: 'Beginner'
        },
        { 
            id: 'cultural', 
            name: 'Crypto Culture', 
            description: 'Learn how cryptocurrency is changing our world',
            icon: 'landmark',
            level: 'All Ages'
        }
    ];
    
    res.json({ 
        categories,
        message: 'Choose your learning path! 🌟'
    });
});

// Get learning materials for a specific event
app.get('/api/learn/:eventId', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.eventId));
    if (!event) {
        return res.status(404).json({ 
            error: 'Oops! We couldn\'t find that story. Try another one! 🔍'
        });
    }

    res.json({
        title: event.title,
        description: event.description,
        keyTerms: event.keyTerms,
        thinkingPoints: event.thinkingPoints,
        funFacts: event.funFacts,
        message: 'Time to learn something amazing! ✨'
    });
});

// Get fun facts about crypto history
app.get('/api/fun-facts', (req, res) => {
    const allFunFacts = events.reduce((facts, event) => {
        return facts.concat(event.funFacts.map(fact => ({
            fact,
            eventTitle: event.title,
            date: event.date
        })));
    }, []);

    res.json({
        funFacts: allFunFacts,
        message: 'Did you know? 🤔'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Clio - The Muse of Crypto History running at http://localhost:${port}`);
});

export default app;
