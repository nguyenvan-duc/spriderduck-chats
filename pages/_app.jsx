import '../styles/globals.css'
import 'draft-js/dist/Draft.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../config/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);
  if (loading) return (
    <div className='md:py-20 bg-gray-800 h-screen flex justify-center items-center'>
      <div className="inline-block w-24 h-24 
            border-8 
            border-t-gray-400 
            border-r-gray-600 
            border-b-gray-400 
            border-l-gray-600 
            rounded-full 
            animate-spin"></div>
    </div>
  )
  return (
    <>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
