import React from 'react';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../config/firebase.config';
import getOrtherEmail from '../utils/getOrtherEmail';
import { async } from '@firebase/util';

const Siderbar = () => {
    const [user] = useAuthState(auth)
    const route = useRouter();
    const [snapshot, loading, error] = useCollection(collection(db, 'chats'));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const rederect = (chatId) => {
        route.push(`/chat/${chatId}`)
    }
    const chatExists = email => chats?.find(chat => (chat.users.includes(email) && chat.users.includes(user.email)))
    const newChat = async () => {

        const input = prompt('Enter email');
        if (chatExists(input) || input !== user.email) {
            await addDoc(collection(db, 'chats'), { users: 
                [user.email, input] 
            })
            return
        }
        alert('You can not create chat with yourself')

    }

    const chatList = () => {
        if(loading){
            return <div>Loading...</div>
        }
        return chats?.filter(chat => chat.users.includes(user.email))
            .map(chat => (
                <div key={Math.random()} onClick={() => rederect(chat.id)} className='w-full cursor-pointer h-16 border border-white mb-3 flex justify-center items-center'>
                    <span className='text-white'>{getOrtherEmail(chat.users, user)}</span>
                </div>
            ))
    }
 
    return (
        <>
            <div className='h-[450px] w-4/12 px-2 py-3'>
                <button onClick={() => newChat()} className=' w-full py-3 m-auto mb-3 text-center bg-gray-100   '>
                    New Chat
                </button>
                {chatList()}
            </div>
        </>
    )
}

export default Siderbar