const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (your HTML, CSS, JS)
app.use(express.static('.'));

// API Routes
app.post('/api/generate-recipe', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Please provide a prompt' });
        }

        const systemPrompt = "You are an expert nutritionist and chef specializing in healthy, fat-loss focused Indian cuisine. Provide a simple, healthy recipe idea based on the user's request. Focus on common North and West Indian ingredients. The response should be in markdown format with a title, ingredients list, and instructions. Do not include any additional commentary or warnings.";
        const userQuery = `Generate a healthy recipe for a fat-loss diet based on this request: "${prompt}".`;
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        const response = await axios.post(apiUrl, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (text) {
            res.json({ success: true, recipe: text });
        } else {
            res.status(500).json({ error: 'Failed to generate a recipe. Please try again.' });
        }

    } catch (error) {
        console.error('Recipe generation error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: error.response?.status === 429 
                ? 'Too many requests. Please try again later.' 
                : 'Error generating recipe. Please try again.' 
        });
    }
});

app.post('/api/generate-meal-plan', async (req, res) => {
    try {
        const { age, height, weight } = req.body;
        
        if (!age || !height || !weight) {
            return res.status(400).json({ error: 'Please provide age, height, and weight' });
        }

        const systemPrompt = "You are an expert nutritionist and diet planner. Based on the provided age, height (in cm), and weight (in kg) for a female, generate a complete daily and weekly food planner. The response should be structured clearly with markdown headings for 'Daily Plan' and 'Weekly Plan'. Provide specific, healthy meal ideas for each day, focusing on Indian cuisine. Do not include any extra commentary, just the plans.";
        const userQuery = `Generate a daily and weekly food plan for a female who is ${age} years old, ${height} cm tall, and weighs ${weight} kg.`;
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        const response = await axios.post(apiUrl, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (text) {
            res.json({ success: true, mealPlan: text });
        } else {
            res.status(500).json({ error: 'Failed to generate a meal plan. Please try again.' });
        }

    } catch (error) {
        console.error('Meal plan generation error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: error.response?.status === 429 
                ? 'Too many requests. Please try again later.' 
                : 'Error generating meal plan. Please try again.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'DietForMe API is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 DietForMe Backend Server running on http://localhost:${PORT}`);
    console.log(`📋 API Endpoints:`);
    console.log(`   POST /api/generate-recipe`);
    console.log(`   POST /api/generate-meal-plan`);
    console.log(`   GET  /api/health`);
});
