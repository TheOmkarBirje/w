'use client'

import { useState } from 'react'
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'

const theme = {
  paragraph: 'mb-4 text-gray-900',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  }
}

const initialConfig = {
  namespace: 'AIEditor',
  theme,
  onError: (error: Error) => {
    console.error(error)
  },
}

function AIToolbar() {
  const [editor] = useLexicalComposerContext()
  const [isGenerating, setIsGenerating] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')

  const handleAIGenerate = async (prompt?: string) => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt || customPrompt || 'Write a creative paragraph about technology',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        editor.update(() => {
          const root = $getRoot()
          const paragraph = $createParagraphNode()
          paragraph.append($createTextNode(data.text))
          root.append(paragraph)
        })
        setCustomPrompt('')
      }
    } catch (error) {
      console.error('AI generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="mb-4 p-4 border-b border-gray-200 space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Enter your prompt for AI generation..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isGenerating) {
              handleAIGenerate()
            }
          }}
        />
        <button
          onClick={() => handleAIGenerate()}
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleAIGenerate('Write a creative paragraph about technology')}
          disabled={isGenerating}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          Technology
        </button>
        <button
          onClick={() => handleAIGenerate('Write an inspiring paragraph about creativity')}
          disabled={isGenerating}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          Creativity
        </button>
        <button
          onClick={() => handleAIGenerate('Write a paragraph about the future of work')}
          disabled={isGenerating}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          Future of Work
        </button>
      </div>
    </div>
  )
}

export default function Editor() {

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Writer</h1>
      <div className="border border-gray-300 rounded-lg shadow-sm">
        <LexicalComposer initialConfig={initialConfig}>
          <AIToolbar />
          <div className="relative min-h-96 p-4">
            <PlainTextPlugin
              contentEditable={
                <ContentEditable className="outline-none resize-none text-base leading-relaxed min-h-80" />
              }
              placeholder={
                <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                  Start writing or use AI generation to begin...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={() => {}} />
            <HistoryPlugin />
          </div>
        </LexicalComposer>
      </div>
    </div>
  )
}