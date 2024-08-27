import React from 'react';
import Header from '../components/Common/Header';
import ChatBot from '../components/ChatBot/chatBot';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 mx-auto px-2 py-8 bg-gray-100" style={{ width: '60%' }}>
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <p className="text-lg">Welcome to the home page!</p>
        <ChatBot/>
      </main>
    </div>
  );
}
