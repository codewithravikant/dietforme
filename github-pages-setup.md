# 🌐 GitHub Pages + Backend Setup

## Option 1: GitHub Pages + Vercel Backend (Recommended)

### **Frontend (GitHub Pages)**
1. Create a separate repository for frontend
2. Enable GitHub Pages
3. Frontend will be available at: `https://username.github.io/dietforme`

### **Backend (Vercel - Free)**
1. Deploy backend to Vercel
2. Get backend URL: `https://your-backend.vercel.app`
3. Update frontend to call Vercel backend

### **Steps:**

#### **1. Prepare Frontend for GitHub Pages**
```bash
# Create a copy of your frontend files
mkdir dietforme-frontend
cp index.html dietforme-frontend/
cp README.md dietforme-frontend/
cp LICENSE dietforme-frontend/
```

#### **2. Update Frontend API Calls**
Change API endpoints from `/api/*` to your Vercel backend URL:
```javascript
// Instead of:
fetch('/api/generate-recipe', ...)

// Use:
fetch('https://your-backend.vercel.app/api/generate-recipe', ...)
```

#### **3. Deploy Backend to Vercel**
```bash
# In your backend directory
npm install -g vercel
vercel
```

#### **4. Create GitHub Repository for Frontend**
- Create new repo: `dietforme-frontend`
- Push frontend files
- Enable GitHub Pages in repo settings

## Option 2: GitHub Codespaces (Full Stack)

### **✅ Pros:**
- Full Node.js environment
- Backend and frontend both work
- Free for public repositories

### **❌ Cons:**
- Requires Codespaces activation
- Not a permanent public URL
- More complex setup

## Option 3: GitHub Actions + Netlify/Vercel

### **Automated Deployment:**
1. Push to GitHub
2. GitHub Actions builds and deploys
3. Backend to Vercel, frontend to Netlify
4. Automatic updates on git push

## 🎯 **Recommended Approach:**

### **Step 1: Deploy Backend to Vercel**
```bash
cd dietforme
npm install -g vercel
vercel
```

### **Step 2: Create Frontend-Only Repository**
```bash
mkdir dietforme-frontend
cp index.html dietforme-frontend/
# Update API URLs to point to Vercel backend
```

### **Step 3: Enable GitHub Pages**
- Go to repository settings
- Enable GitHub Pages
- Select source branch

### **Final Result:**
- **Frontend**: `https://username.github.io/dietforme`
- **Backend**: `https://your-backend.vercel.app`
- **Secure**: API key hidden in Vercel environment variables
