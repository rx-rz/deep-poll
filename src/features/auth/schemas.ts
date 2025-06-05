import { z } from "zod";

const passwordSchema = z
  .string({ message: "Please enter your password" })
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must be at most 100 characters long");
// .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
// .regex(/[a-z]/, "Password must contain at least one lowercase letter")
// .regex(/\d{1,}/, "Password must contain at least one digit")
// .regex(/^\S*$/, "Password must not contain spaces");

const emailSchema = z
  .string({ message: "Please enter your email" })
  .email({ message: "Enter a valid email" })
  .max(255)
  .nonempty();

export type EmailDto = z.infer<typeof emailSchema>;

export const registerUserSchema = z.object({
  password: passwordSchema,
  email: z.string().email().max(255).nonempty(),
  name: z.string().min(2).max(255).nonempty(),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
