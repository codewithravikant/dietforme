# 🔒 DietForMe Secure Backend Setup

## ✅ **API Key Security Implemented!**

Your API key is now secure and hidden from the frontend. Here's how to run the application:

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
cd dietforme
npm install
```

### **2. Start the Backend Server**
```bash
npm start
```

### **3. Open Your Application**
- Go to: `http://localhost:3000`
- Your DietForMe app will load with secure API calls

## 🔧 **Development Mode**

For development with auto-restart:
```bash
npm run dev
```

## 📁 **Project Structure**

```
dietforme/
├── index.html          # Frontend (no API key visible)
├── server.js           # Backend API server
├── package.json        # Dependencies
├── .env               # API key (secure, not in git)
├── .gitignore         # Protects .env file
└── SETUP.md           # This file
```

## 🔒 **Security Features**

### **✅ What's Secure Now:**
- API key is hidden in backend environment variables
- Frontend makes calls to your backend, not directly to Google
- `.env` file is ignored by git (won't be committed)
- API key never appears in browser developer tools

### **🛡️ Additional Security (Recommended):**
1. **Set up Google Cloud Console restrictions:**
   - Go to Google Cloud Console → APIs & Services → Credentials
   - Click your API key
   - Set HTTP referrer restrictions to your domain
   - Limit API access to Gemini only

2. **For production deployment:**
   - Use environment variables on your hosting platform
   - Set up HTTPS
   - Consider rate limiting

## 🌐 **API Endpoints**

Your backend now provides these secure endpoints:

- `POST /api/generate-recipe` - Generate healthy recipes
- `POST /api/generate-meal-plan` - Create personalized meal plans
- `GET /api/health` - Check if server is running

## 🚀 **Deployment Options**

### **Option 1: Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

### **Option 2: Netlify**
```bash
npm install -g netlify-cli
netlify deploy
```

### **Option 3: Heroku**
```bash
git add .
git commit -m "Add secure backend"
git push heroku main
```

## 🔍 **Testing**

Test your secure setup:
1. Start the server: `npm start`
2. Open browser: `http://localhost:3000`
3. Try the AI recipe generator
4. Try the meal planner
5. Check browser dev tools - no API key visible! ✅

## 📞 **Troubleshooting**

### **Server won't start:**
- Make sure Node.js is installed
- Run `npm install` first
- Check if port 3000 is available

### **API calls failing:**
- Verify `.env` file exists with correct API key
- Check server console for error messages
- Test with: `curl http://localhost:3000/api/health`

### **Still seeing API key in browser:**
- Make sure you're running the backend server
- Clear browser cache
- Check that frontend is calling `/api/*` endpoints

## 🎉 **Success!**

Your API key is now secure! The frontend can't see it, and it's protected from being committed to version control.

---

**Need help?** Check the server console for detailed error messages.
