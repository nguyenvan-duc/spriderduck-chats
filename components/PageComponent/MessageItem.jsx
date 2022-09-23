import React from 'react'

const MessageItem = ({message,image,time}) => {
    return (
        <>
            <li className='flex justify-start'>
                <div className='relative  flex '>
                    <div className='mr-2'>
                        <svg className='h-6 w-6' viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><title>Annie Jump</title><mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#mask__beam)"><rect width="36" height="36" fill="#edd75a"></rect><rect x="0" y="0" width="36" height="36" transform="translate(1 7) rotate(63 18 18) scale(1)" fill="#0c8f8f" rx="36"></rect><g transform="translate(-7 3.5) rotate(3 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path><rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect><rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect></g></g></svg>
                    </div>
                    <div className='px-4  py-2 block relative max-w-sm text-gray-700 bg-gray-200 rounded shadow'>
                        <p>
                            {message}
                        </p>
                    </div>
                </div>
            </li>
        </>
    )
}

export default MessageItem