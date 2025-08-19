'use server';

import { makeRequest } from '@/lib/axios';
import { RegisterFormData, registerSchema } from '@/schemas/user-register';

export async function createUser(params: RegisterFormData) {
  const validatedParams = registerSchema.parse(params);

  return makeRequest({
    url: `${process.env.VEHICLE_DISPATCHER_BACKEND_API_URL}/users`,
    method: 'POST',
    data: validatedParams,
  });
}
