'use client';

import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { formatNational, toDigits } from '@/utils/phone';

interface PhoneInputProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  ddi: number; // ex.: 55
  isoHint?: string; // opcional, se seu JSON tiver "iso"
  valueDigits: string; // SOMENTE dígitos do número (sem DDI)
  onChangeDigits: (digits: string) => void;
}

/**
 * TextField controlado que formata "as-you-type" usando libphonenumber-js
 * e armazena apenas dígitos no estado do pai. Nada de findDOMNode.
 */
export default function PhoneInput({
  ddi,
  isoHint,
  valueDigits,
  onChangeDigits,
  placeholder,
  ...rest
}: PhoneInputProps) {
  const display = React.useMemo(
    () => formatNational(valueDigits, ddi, isoHint),
    [valueDigits, ddi, isoHint],
  );

  return (
    <TextField
      {...rest}
      value={display}
      onChange={(e) => {
        const nextDigits = toDigits(e.target.value);
        onChangeDigits(nextDigits);
      }}
      placeholder={placeholder || 'Digite o telefone'}
      inputMode="tel"
      fullWidth
    />
  );
}
