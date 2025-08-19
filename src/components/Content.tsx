import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { LogoHorizontalDespacheJa } from '@/assets/LogoHorizontalDespacheJa';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Acompanhamento de processos',
    description:
      'Visualize o andamento de cada serviço solicitado, com status atualizado e histórico completo para cada cliente.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Gestão financeira',
    description:
      'Controle de ganhos e gastos por serviço prestado, relatórios consolidados e visão clara da saúde do negócio.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Avisos e lembretes',
    description:
      'Receba alertas próximos ao vencimento de documentos e prazos importantes para não perder nenhuma obrigação.',
  },
  {
    icon: <NotificationsActiveIcon sx={{ color: 'text.secondary' }} />,
    title: 'Notificações automáticas',
    description:
      'Envio de mensagens para clientes via WhatsApp e e-mail, mantendo-os informados em cada etapa do processo.',
  },
];

export default function Content() {
  return (
    <Stack sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}>
      <Box sx={{ maxHeight: 50 }}>
        <LogoHorizontalDespacheJa width={'50%'} height={'100%'} />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
