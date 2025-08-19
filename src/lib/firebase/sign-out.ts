import { signOut } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { Either, Failure, Success } from '@/utils/either';

export async function firebaseSignOut(): Promise<Either<Error, { message: string }>> {
  try {
    await signOut(auth);
    return Success.create({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    return Failure.create(new Error('Erro desconhecido durante o logout', error as ErrorOptions));
  }
}
