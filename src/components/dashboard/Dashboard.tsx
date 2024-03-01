'use client'

import React, { memo } from 'react';
import { useUserData } from '@/hooks/useUserData';

interface IProps {}
export const Dashboard: React.FC<IProps> = memo((props) => {
  const user = useUserData();

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>id - {user.id}</li>
      <li>username - {user.username}</li>
      <li>email - {user.email}</li>
      <li>blocked - {user.blocked ? "Yes" : "No"}</li>
      <li>confirmed - {user.confirmed ? "Yes" : "No"}</li>
      <li>createdAt - {user.createdAt.toString()}</li>
      <li>updatedAt - {user.updatedAt.toString()}</li>
    </ul>
  );
});
Dashboard.displayName = 'Dashboard';
