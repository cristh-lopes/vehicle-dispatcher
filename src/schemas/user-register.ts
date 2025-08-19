import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.email('Email inválido').min(1, 'Email é obrigatório'),
  phone: z
    .string()
    .regex(
      /^(\+55\s?)?(\(?\d{2}\)?)\s?\d{4,5}-?\d{4}$/,
      'Telefone deve ser um número brasileiro válido',
    ),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(20, 'Senha deve ter no máximo 20 caracteres')
    .regex(/(?=.*[a-z])/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/(?=.*[A-Z])/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/(?=.*\d)/, 'Senha deve conter pelo menos um número')
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, 'Senha deve conter pelo menos um caractere especial'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
