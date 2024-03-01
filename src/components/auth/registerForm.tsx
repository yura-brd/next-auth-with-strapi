'use client'
import React, { useTransition } from 'react';

import { registerUserAction } from '@/actions/registerUserAction';
import { useForm } from "react-hook-form"
import { RegisterSchema } from '@/schemas';
import  zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { InputRef } from '@/components/ui/Input/InputRef';
import { showErrorFromError, showErrorFromLogin } from '@/lib/errors';

interface IProps {
}
export const RegisterForm: React.FC<IProps> = (props) => {
  const {} = props;
  const [isPending, startTransition] = useTransition();

  const form = useForm<zod.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: zod.infer<typeof RegisterSchema>) => {

    startTransition(() => {
      registerUserAction(values)
        .then(e => {
          showErrorFromLogin(e);
        })
        .catch(showErrorFromError);
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
          currentValue={form.watch('email')}
          classWrap={'flex-1'}
          {...form.register("email")}
          errors={form.formState.errors.email}
        />
      </div>
      <div>
        <InputRef
          placeholder={'Enter login'}
          isRequired={false}
          currentValue={form.watch('username')}
          classWrap={'flex-1'}
          {...form.register("username")}
          errors={form.formState.errors.username}
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
      <div>
        <InputRef
          placeholder={'Enter password confirm'}
          isRequired={false}
          currentValue={form.watch('confirm')}
          classWrap={'flex-1'}
          {...form.register("confirm")}
          errors={form.formState.errors.confirm}
        />
      </div>


      <button type='submit'>submit</button>
    </form>

  );
};
