
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatBox from '../components/PageComponent/ChatBox';
import Layout from '../components/Layout';
import AuthPage from '../components/PageComponent/AuthPage';
import {auth} from '../config/firebase.config'
export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <Layout>
      {user ?   <ChatBox/> :   <AuthPage/>}
    </Layout>
  )
}
