import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceGrinWide, faImage, faGif } from '@fortawesome/free-solid-svg-icons';
import {db,auth} from '../../config/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc,collection, serverTimestamp } from 'firebase/firestore';
import {crypt} from '../../config/hybrid.config';
import { async } from '@firebase/util';
const ChatInput = ({id,publicKey}) => {
  const [message, setMessage] = React.useState('');
  const [user] = useAuthState(auth);
  const encryptMessage = (message) => {
    return crypt.encrypt(publicKey, message);
  }
  
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setMessage('');
      await addDoc(collection(db, `/chats/${id}/messages`),{
        encryptedMessage: encryptMessage(message),
        timestamp: serverTimestamp(),
        sender: user.email,
        name:user.displayName,
        avatar:user.photoURL
      })
    }
  }
  
  const sendMeassage = async(e) =>{
    e.preventDefault();
    setMessage('');
    await addDoc(collection(db, `/chats/${id}/messages`),{
      encryptedMessage: encryptMessage(message),
      timestamp: serverTimestamp(),
      sender: user.email,
    });

  }
    return (
    <>
      <div className='flex absolute bottom-0 w-full bg-gray-500 bg-opacity-25'>
        <div className='w-11/12'>
          <div className='min-h-25 flex  w-full border-t border-r border-white '>
            <div className='w-2/12 border-r border-white flex items-center px-8'>
              <div className='mr-3'>
                <FontAwesomeIcon icon={faImage} className='w-6 h-6 p-0 text-white hover:text-gray-300' />
              </div>
              <div className='px-2 hover:bg-gray-600 rounded-md flex justify-center items-center  '>
                <svg className='w-6 h-6 text-white' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="none" height="256" width="256" />
                  <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="136" x2="136" y1="72" y2="184" />
                  <polyline fill="none" points="228 72 180 72 180 184" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="216" x2="180" y1="128" y2="128" />
                  <path d="M72,128H96v24a32,32,0,0,1-64,0V104a32,32,0,0,1,63-8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                </svg>
              </div>
            </div>
            <div className='w-9/12'>
              <Editor
                apiKey='lkobsadmr12vmxem1c4ps7kaynqr9lkqs3mlur0i2x5mljb0'
                value={message}
                onKeyDown={handleKeyDown}
                onEditorChange={value => setMessage(value)}
                init={{
                  menubar: false,
                  toolbar_location: 'bottom',
                  plugins: 'autoresize link lists emoticons imag',
                  autoresize_bottom_margin: 0,
                  min_height: 55,
                  max_height: 200,
                  placeholder: 'Enter message . . .',
                  branding: false,
                  statusbar: false,
                  menubar: false,
                  statusbar: false,
                  toolbar: false,
                  indent: false,
                  skin: 'borderless',
                  icons: 'small',
                  content_style: `
                  body { color: #fff; }
                  .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
                    color:#c6c2c2 !important;
                }
                  `,
                }}
              />
            </div>
            <div className='w-1/12 flex justify-center items-center'>
              <FontAwesomeIcon icon={faFaceGrinWide} className='w-6 h-6 text-white hover:text-gray-300' />
            </div>
          </div>
        </div>
        <div className='w-1/12 flex justify-center items-center border-t border-white'>
          <button onClick={sendMeassage} className='p-2 bg-gray-600 rounded-full hover:bg-gray-500'>
            <FontAwesomeIcon icon={faPaperPlane} className='w-6 h6 text-white' />
          </button>
        </div>
      </div>

    </>

  )
}

export default ChatInput