import React, { useEffect, useRef } from 'react';


function Messages({ chatMessages, selectedChat }) {

  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);


  return (
    <div className='h-[555px] overflow-auto px-5 py-2'>
      {chatMessages.map((data) => {
        if (data.sender == localStorage.getItem('id')) {
          return (
            <div key={data._id} className="chat chat-end">
              <div className="chat-bubble">
                {data.image && <img loading="lazy" className='h-80 pt-3 pb-2 object-cover aspect-auto' src={data.image} alt={data.image} />}
                <span>{data.message}</span>
              </div>
            </div>
          )
        }
        else {
          if (selectedChat.isGroupChat) {
            // selectedChat.receiverId.map((item) => {
              // if (item._id == localStorage.getItem('id')) {
                return (
                  <div key={data._id} className="chat chat-start">
                    <div className="chat-bubble">
                      {data.image && <img loading="lazy" className='h-80 pt-3 pb-2 object-cover aspect-auto' src={data.image} alt={data.image} />}
                      <span>{data.message}</span>
                    </div>
                  </div>
                )
              // }
            // })
          }
          else if (data.sender == selectedChat._id && data.receiver == localStorage.getItem('id')) {
            return (
              <div key={data._id} className="chat chat-start">
                <div className="chat-bubble">
                  {data.image && <img loading="lazy" className='h-80 pt-3 pb-2 object-cover aspect-auto' src={data.image} alt={data.image} />}
                  <span>{data.message}</span>
                </div>
              </div>
            )
          }
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages