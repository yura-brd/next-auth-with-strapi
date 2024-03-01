'use client'
import React, { useState } from 'react';

import { useSession } from 'next-auth/react';
import { loginAction } from '@/actions/loginAction';
import { logOutAction } from '@/actions/logOutAction';
import { IOptionsCredentials, providerType } from '@/types/auth.types';
import { RegisterForm } from '@/components/auth/registerForm';
import cn from 'classnames';
import { LoginForm } from '@/components/auth/loginForm';
import { useSearchParams } from 'next/navigation';
import { CALLBACK_URL_KEY } from '@/consts/routes.consts';
import { showErrorFromError, showErrorFromLogin } from '@/lib/errors';

interface IProps {}
export const Login: React.FC<IProps> = (props) => {
  const session = useSession();
  const [isRegister, setIsRegister] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get(CALLBACK_URL_KEY);

  const signInHandler = async (provider: providerType, options?:IOptionsCredentials) => {
    loginAction(provider, options, callbackUrl)
      .then(e => {
        showErrorFromLogin(e);
      })
      .catch(showErrorFromError);
  }

  if (session.data) {
    return <div>
      <button onClick={() => logOutAction()}>signOut</button>
    </div>
  }
  
  return (
    <div className='flex items-center justify-center min-h-dvh'>
      <div>
        <ul className='flex gap-3 mb-3 border-b-2'>
          <li>
            <button
              className={cn({
                'font-bold': !isRegister
              })}
              onClick={() => setIsRegister(false)}>Login
            </button>
          </li>
          <li>
            <button
              className={cn({
                'font-bold': isRegister
              })}
              onClick={() => setIsRegister(true)}>Register
            </button>
          </li>
        </ul>
        {isRegister ?
          <RegisterForm /> :
          <LoginForm submitLogin={(options) => signInHandler('credentials', options)} />
        }

        <div className='mt-5  border p-2'>
          <p className='font-bold text-2xl mb-1'>Social</p>

          <div>
            <button onClick={() => signInHandler('google')}>signIn Google</button>
          </div>
          {/*<div>*/}
          {/*  <button onClick={() => signInHandler('github')}>signIn GitHub</button>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <a href="http://localhost:1337/api/connect/github">github</a>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
