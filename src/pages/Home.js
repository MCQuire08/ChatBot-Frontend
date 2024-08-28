import React from 'react';
import Header from '../components/Common/Header';
import ChatBot from '../components/ChatBot/chatBot';
import ResponseTable from '../components/Responses/ResponseTable';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <ResponseTable />
      <main className="flex-1 mx-auto px-2 py-8 bg-gray-100" style={{ width: '60%' }}>
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            
          </div>
        </div>
      </main>
      <ChatBot userId={1} />
    </div>
  );
}
