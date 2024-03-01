'use client'
import React, { memo } from 'react';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/consts/main.consts';
import { logOutAction } from '@/actions/logOutAction';

interface IProps {}
export const HeaderUser: React.FC<IProps> = memo((props) => {
  const {} = props;

  return (
    <div className='flex gap-3'>
      <Link href={ROUTE_LINKS.dashboard.main}>Dashboard</Link>
      <button onClick={() => logOutAction()}>LogOut</button>
    </div>
  );
});
HeaderUser.displayName = 'HeaderUser';
