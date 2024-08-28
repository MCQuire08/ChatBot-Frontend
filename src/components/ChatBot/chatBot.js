import React, { useState, useEffect, useRef } from 'react';
import { getConversations, sendMessage,cleanConversation } from '../../services/chatBotService';

export default function ChatBot({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeConversationId, setActiveConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      getConversations(userId)
        .then((data) => {
          if (data && data.messages) {
            setMessages(data.messages);
            setActiveConversationId(data.id);
          }
        })
        .catch((error) => console.error('Error fetching conversations:', error));
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await sendMessage(activeConversationId, newMessage, 'user');

        if (response && response.userMessage && response.botResponse) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: response.userMessage.id,
              content: response.userMessage.content,
              sender: 'user',
              timestamp: response.userMessage.timestamp
            },
            {
              id: `bot-${response.userMessage.id}`,
              content: response.botResponse,
              sender: 'bot',
              timestamp: new Date().toISOString()
            }
          ]);
        }

        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleClearChat = async () => {
    if (activeConversationId) {
      try {
        await cleanConversation(activeConversationId);
        setMessages([]);
        setActiveConversationId(null);
      } catch (error) {
        console.error('Error cleaning conversation:', error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed bottom-0 right-0 mr-4 bg-white border border-[#e5e7eb] w-[440px] h-[634px] flex flex-col z-50 mb-24">
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center space-x-2 flex-1">
              <h2 className="font-semibold text-lg tracking-tight flex-1 text-center">ChatBot</h2>
              <button onClick={handleClearChat} className="text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                  <path d="M17,22H7c-1.657,0-3-1.343-3-3V6h16v13C20,20.657,18.657,22,17,22z" opacity=".35"></path>
                  <path d="M16,4H8V3c0-0.552,0.448-1,1-1h6c0.552,0,1,0.448,1,1V4z"></path>
                  <path d="M19,3C18.399,3,5.601,3,5,3C3.895,3,3,3.895,3,5c0,1.105,0.895,2,2,2c0.601,0,13.399,0,14,0c1.105,0,2-0.895,2-2 C21,3.895,20.105,3,19,3z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100% - 60px)' }}>
            {Array.isArray(messages) && messages.map((message) => (
              <div key={message.id} className={`flex gap-3 my-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    {message.sender === 'user' ? (
                      <svg stroke="none" fill="black" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                      </svg>
                    ) : (
                      <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Zm8.415-6.765L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                      </svg>
                    )}
                  </div>
                </span>
                <div className={`bg-gray-100 p-2 rounded-lg ${message.sender === 'user' ? 'text-right text-white' : 'text-left'}`} style={{ maxWidth: '75%', wordBreak: 'break-word', backgroundColor: message.sender === 'user' ? '#202938' : '#f3f3f3' }}>
                  <span className={`block font-bold ${message.sender === 'user' ? 'text-white' : 'text-gray-700'}`}>
                    {message.sender === 'user' ? 'You' : 'ChatBot'}
                  </span>
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center p-4 border-t bg-gray-100">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-lg p-2"
              rows="1"
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} className="ml-2 bg-gray-800 text-white rounded-lg p-2">
              Send
            </button>
          </div>
        </div>
      )}
      <button onClick={toggleChat} className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-full">
        {isOpen ? 'Close' : 'Chat'}
      </button>
    </div>
  );
}
