import React from 'react';
import Header from '../components/Common/Header';
import ChatBot from '../components/ChatBot/chatBot';
import ProductsTable from '../components/Products/ProductsTable';

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex items-start justify-center p-6">
        <ProductsTable/>
        <ChatBot userId={1} />
      </main>
    </div>
  )
}
