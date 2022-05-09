import React, { useState, useEffect } from 'react'
import { Friend } from '../parts';
function Friends({ friends }) {
  return (
    <div className='flex flex-col items-center pt-[100px] pb-20 justify-center w-1/3 h-screen overflow-y-scroll'>
      {friends.map((friend) => <Friend friend={friend} key={friend._id} />
      )}
    </div>
  )
}

export default Friends