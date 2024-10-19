
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from '../features/friends/friendsSlice';

function Friends() {
  const dispatch = useDispatch();
  const { friends, status } = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div>
      <h3>Friends</h3>
      {status === 'loading' ? <p>Loading friends...</p> : null}
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
                