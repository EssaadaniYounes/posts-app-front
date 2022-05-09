import React, { useState, useEffect } from 'react'
import { get } from '../../requests/get';
import { useUserContext } from '../../context/user';
import { CreatePost, Loader, Post } from '../parts';
import { sortDate } from '../../helpers/sort-date';

function Posts(props) {
  return (
    <div className='-z-0 bg-gray-100 h-screen pb-20 max-h-screen scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 overflow-y-scroll shadow-sm p-12'>
      {props.children}
      {props.canCreate && <CreatePost />}
      {props.posts.map(post => {
        return <Post post={post} key={post._id} />
      })}
      <div className="mx-auto mb-8">
        <Loader />
      </div>
    </div>
  )
}

export default Posts