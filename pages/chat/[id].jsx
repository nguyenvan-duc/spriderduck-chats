import React from 'react';
import { useRouter } from 'next/router';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase.config'
import ChatBox from '../../components/PageComponent/ChatBox';
import Layout from '../../components/Layout';
const Chat = () => {
    const router = useRouter();
    const { id } = router.query;
    const q = query(collection(db, `/chats/${id}/messages`), orderBy('timestamp'))
    const [messages,loading] = useCollectionData(q);
    return <Layout><ChatBox messages={messages} id={id} loading={loading}  /></Layout>
}

export default Chat