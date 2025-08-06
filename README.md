# AI Writer

An AI-powered text editor built with Next.js, Lexical, and the Vercel AI SDK.

## Features

- **AI Content Generation**: Generate content using OpenAI's GPT models with custom prompts
- **Rich Text Editing**: Built with Facebook's Lexical editor framework
- **Quick Prompts**: Pre-defined prompt buttons for common topics
- **Custom Prompts**: Enter your own prompts for AI generation
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Keyboard Shortcuts**: Press Enter in the prompt field to generate content

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
- `OPENAI_API_KEY`: Your OpenAI API key

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Writing**: Start typing in the editor
2. **Custom AI Generation**: Enter a custom prompt and click "Generate" or press Enter
3. **Quick Generation**: Use the pre-defined topic buttons for instant content
4. **History**: Use Ctrl/Cmd+Z to undo changes

## Available Quick Prompts

- **Technology**: Generate content about technology topics
- **Creativity**: Generate inspiring content about creativity
- **Future of Work**: Generate content about workplace trends

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Editor**: Lexical
- **AI**: Vercel AI SDK with OpenAI
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Make sure to set the `OPENAI_API_KEY` environment variable in your Vercel project settings.
