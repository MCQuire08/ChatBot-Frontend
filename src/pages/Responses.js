import React from 'react'
import ResponseTable from '../components/Responses/ResponseTable'
import Header from '../components/Common/Header';
import ChatBot from '../components/ChatBot/chatBot';

export default function Responses() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex items-start justify-center p-6">
        <ResponseTable/>
        <ChatBot userId={1} />
      </main>
    </div>
  )
}
