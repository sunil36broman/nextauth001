// schemas.ts
import { z } from 'zod';

export const step1Schema = z.object({
    userId: z.number().min(1, { message: "userId is required and must be a positive number" }),
    id: z.number().min(1, { message: "id is required and must be a positive number" }),
    title: z.string().min(1, { message: "title is required" }),  // Updated to use min(1)
    completed: z.boolean().refine(val => val === true || val === false, { message: "completed is required and must be a boolean" }),
  });

export const step2Schema = z.object({
    userId: z.number().min(1, { message: "userId is required and must be a positive number" }),
    id: z.number().min(1, { message: "id is required and must be a positive number" }),
    title: z.string().min(1, { message: "title is required" }),  // Updated to use min(1)
    completed: z.boolean().refine(val => val === true || val === false, { message: "completed is required and must be a boolean" }),
  });

export const step3Schema = z.object({
    userId: z.number().min(1, { message: "userId is required and must be a positive number" }),
    id: z.number().min(1, { message: "id is required and must be a positive number" }),
    title: z.string().min(1, { message: "title is required" }),  // Updated to use min(1)
    completed: z.boolean().refine(val => val === true || val === false, { message: "completed is required and must be a boolean" }),
  });
