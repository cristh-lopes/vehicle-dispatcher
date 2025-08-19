'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import { GoogleIcon } from './CustomIcons';
import { LogoHorizontalDespacheJa } from '@/assets/LogoHorizontalDespacheJa';
import PhoneInput from '@/components/PhoneInput';
import { getDDIs, isValidPhone, toE164, DDIEntry } from '@/utils/phone';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function RegisterCard() {
  const ddiList = React.useMemo<DDIEntry[]>(() => getDDIs(), []);
  const defaultDDI = React.useMemo<DDIEntry>(() => {
    const found = ddiList.find((d) => d.ddi === 55) || ddiList[0];
    return found;
  }, [ddiList]);

  // Form state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [ddi, setDdi] = React.useState<DDIEntry>(defaultDDI);
  const [phoneDigits, setPhoneDigits] = React.useState(''); // apenas dígitos

  // Errors
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmError, setConfirmError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

  const validate = (): boolean => {
    let ok = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Insira um email válido.');
      ok = false;
    } else setEmailError('');

    if (!password || password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres.');
      ok = false;
    } else setPasswordError('');

    if (password !== confirmPassword) {
      setConfirmError('As senhas não coincidem.');
      ok = false;
    } else setConfirmError('');

    if (!isValidPhone(phoneDigits, ddi.ddi)) {
      setPhoneError('Insira um número de telefone válido.');
      ok = false;
    } else setPhoneError('');

    return ok;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const phoneE164 = toE164(phoneDigits, ddi.ddi);

    console.log({
      email,
      password,
      phone: phoneE164,
      ddi: `+${ddi.ddi}`,
    });
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
        <LogoHorizontalDespacheJa width={'50%'} height={'100%'} />
      </Box>

      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
      >
        Cadastre-se
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        {/* Email */}
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
        </FormControl>

        {/* Telefone */}
        <FormControl>
          <FormLabel htmlFor="phone">Telefone</FormLabel>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              select
              value={ddi.ddi}
              onChange={(e) => {
                const next = ddiList.find((d) => d.ddi === Number(e.target.value)) || ddiList[0];
                setDdi(next);
              }}
              sx={{ width: '160px' }}
            >
              {ddiList.map((item) => (
                <MenuItem key={item.ddi} value={item.ddi}>
                  <div className="relative w-full h-[14px] overflow-hidden flex items-center gap-1">
                    <Image
                      className="object-cover w-[22px] h-[14px]"
                      src={item.img}
                      alt={item.pais}
                      width={22}
                      height={14}
                    />
                    +{item.ddi}
                  </div>
                </MenuItem>
              ))}
            </TextField>

            <PhoneInput
              id="phone"
              ddi={ddi.ddi}
              isoHint={ddi.iso}
              valueDigits={phoneDigits}
              onChangeDigits={setPhoneDigits}
              error={!!phoneError}
              helperText={phoneError}
              placeholder="Digite o telefone"
            />
          </Box>
        </FormControl>

        {/* Senha */}
        <FormControl>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="confirm-password">Confirme a senha</FormLabel>
          <TextField
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••"
            required
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmError}
            helperText={confirmError}
          />
        </FormControl>

        <Button type="submit" fullWidth variant="contained">
          Cadastrar
        </Button>

        <Typography sx={{ textAlign: 'center' }}>
          Já tem conta?{' '}
          <Link href="/sign-in" variant="body2">
            Acesse sua Conta
          </Link>
        </Typography>
      </Box>

      <Divider>ou</Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Cadastre-se com o Google
        </Button>
      </Box>
    </Card>
  );
}
