import * as zod from "zod";

export const RegisterSchema = zod.object({
  email: zod.string().email({
    message: "Email is required",
  }),
  username: zod.string().min(2, {
    message: "Name is required",
  }),
  password: zod.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirm: zod.string().min(6, {
    message: "Minimum 6 characters required",
  }),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"], // path of error
});
export const LoginSchema = zod.object({
  identifier: zod.string().min(2, {
    message: "Name is required",
  }),
  password: zod.string().min(6, {
    message: "Minimum 6 characters required",
  }),

});
