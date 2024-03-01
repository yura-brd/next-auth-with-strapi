import React, { memo } from 'react';
import { auth } from '@/auth';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/consts/main.consts';
import { HeaderUser } from '@/components/auth/headerUser';

interface IProps {}
export const Header: React.FC<IProps> = async (props) => {
  const {} = props;
  const session = await auth();


  return (
    <header className='flex justify-between items-center px-4 py-2 bg-amber-700 text-black'>
      <div>
        <Link href={ROUTE_LINKS.main}>Main</Link>
      </div>
      <div>
        {
          session ?
            <HeaderUser /> :
            <Link href={ROUTE_LINKS.auth.login}>Login</Link>
        }
      </div>
    </header>
  );
};
