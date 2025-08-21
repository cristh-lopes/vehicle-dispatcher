'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './gridData';

export default function CustomizedDataGrid() {
  const [mounted, setMounted] = React.useState(false);

  // Garante que só renderizamos o DataGrid após a montagem
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita problemas de hidratação e atualizações prematuras
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-500 text-sm">Carregando tabela...</span>
      </div>
    );
  }

  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
