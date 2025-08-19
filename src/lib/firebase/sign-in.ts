import { User as FirebaseUser, signInWithEmailAndPassword } from 'firebase/auth';

import { Either, Failure, Success } from '@/utils/either';

import { auth } from '.';

export async function firebaseSignIn(
  email: string,
  password: string,
): Promise<Either<Error, FirebaseUser>> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return Success.create(userCredential.user);
  } catch (error) {
    return Failure.create(new Error('Credenciais inválidas'));
  }
}
