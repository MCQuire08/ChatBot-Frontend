import React from 'react';
import Header from '../components/Common/Header';
import ChatBot from '../components/ChatBot/chatBot';

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex items-start justify-center p-6">
        
        <ChatBot userId={1} />
      </main>
    </div>
  )
}
