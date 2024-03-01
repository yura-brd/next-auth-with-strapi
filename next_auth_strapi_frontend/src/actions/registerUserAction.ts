'use server'

import { IOptionsRegisterUser } from '@/types/auth.types';
import { RegisterSchema } from '@/schemas';
import { loginAction } from '@/actions/loginAction';
export const registerUserAction = async (values: IOptionsRegisterUser) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return await loginAction('credentials', {
    ...validatedFields.data,
  })
}