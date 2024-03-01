'use client'
import React, { useTransition } from 'react';

import { IOptionsCredentials } from '@/types/auth.types';
import { useForm } from "react-hook-form"
import { LoginSchema } from '@/schemas';
import  zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { InputRef } from '@/components/ui/Input/InputRef';

interface IProps {
  submitLogin: (options: IOptionsCredentials) => void;
}
export const LoginForm: React.FC<IProps> = (props) => {
  const {submitLogin} = props;
  const [isPending, startTransition] = useTransition();

  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
    startTransition(() => {
      submitLogin(values)
    });
  };


  if (isPending) {
    return <div>Loading...</div>
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">

      <div>
        <InputRef
          placeholder={'Enter email'}
          isRequired={false}
          currentValue={form.watch('identifier')}
          classWrap={'flex-1'}
          {...form.register("identifier")}
          errors={form.formState.errors.identifier}
        />
      </div>
      <div>
        <InputRef
          placeholder={'Enter password'}
          isRequired={false}
          currentValue={form.watch('password')}
          classWrap={'flex-1'}
          {...form.register("password")}
          errors={form.formState.errors.password}
        />
      </div>


      <button type='submit'>Enter</button>
    </form>

  );
};
