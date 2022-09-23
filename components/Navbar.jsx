import React from 'react'
import { auth } from '../config/firebase.config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceGrinWide, faImage, faGif, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
const Navbar = () => {
  const [user, loading, error] = useAuthState(auth)
  return (
    <div>
      <div className='w-full h-24 flex border-b border-white bg-gradient-to-r from-gray-700 to-gray-900'>
        <div className='w-4/12 border-r flex'>
          <div className='w-3/4 flex justify-center items-center px-3'>
            <div className='w-2/12 mr-3'>
              <img className=' rounded-full' src={user.photoURL} alt={user.displayName}/>
            </div>
            <div className='w-10/12'>
              <span className='text-white'>{user.displayName}</span>
            </div>
          </div>
          <div className='w-1/4 flex justify-center items-center'>
            <button onClick={() => signOut(auth)}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className='w-6 h-6 p-0 text-white hover:text-gray-300' />
            </button>
          </div>
        </div>
        <div className='w-10/12  border-white'>

        </div>
      </div>
    </div>
  )
}

export default Navbar