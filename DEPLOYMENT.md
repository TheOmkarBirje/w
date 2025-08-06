# Deploying to Cloudflare Pages

This guide will help you deploy the AI Writer to Cloudflare Pages.

## Prerequisites

- GitHub/GitLab account
- Cloudflare account
- OpenAI API key

## Deployment Steps

### 1. Push to Git Repository

First, push your code to a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create Cloudflare Pages Project

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Connect your Git provider and select your repository
4. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (leave empty)

### 3. Set Environment Variables

In your Cloudflare Pages project settings, add:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Deploy

Click "Save and Deploy". Cloudflare will build and deploy your app.

## How It Works

The app uses:
- **Frontend**: Static Next.js pages served by Cloudflare Pages
- **API**: Cloudflare Workers function at `/functions/api/ai/generate.js`
- **AI Integration**: Direct calls to OpenAI API from the Workers function

## Custom Domain (Optional)

1. In your Cloudflare Pages project, go to "Custom domains"
2. Add your domain
3. Update your domain's nameservers to Cloudflare's

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **API not working**: Ensure `OPENAI_API_KEY` environment variable is set
- **CORS errors**: The Workers function includes proper CORS headers

## Local Development

```bash
npm run dev
```

The app will run on http://localhost:3000 (or 3001 if 3000 is occupied).

## Features

- ✅ AI content generation with custom prompts
- ✅ Pre-defined topic buttons
- ✅ Rich text editing with Lexical
- ✅ Responsive design
- ✅ Serverless deployment