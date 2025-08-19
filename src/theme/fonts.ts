import { Noto_Sans } from 'next/font/google';

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], // ajuste os pesos que for usar
  display: 'swap',
});
