import { motion } from 'framer-motion';
import { DataGrid, type DataGridProps, type GridValidRowModel, Tooltip } from '@mui/x-data-grid';
import { Database, SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppDataGridProps<R extends GridValidRowModel> = {
  rows: R[];
  columns: DataGridProps<R>['columns'];
  loading?: boolean;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  gridProps?: Omit<
    DataGridProps<R>,
    'rows' | 'columns' | 'loading'
  >;
};

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-full min-h-72 flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-border bg-background/80 text-primary shadow-sm">
        <SearchX className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function AppDataGrid<R extends GridValidRowModel>({
  rows,
  columns,
  loading = false,
  className,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting the filters or search to surface matching records.',
  gridProps,
}: AppDataGridProps<R>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'premium-card gradient-border-hover overflow-hidden rounded-2xl shadow-premium backdrop-blur-sm transition-colors-smooth',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Student Pipeline</p>
            <p className="text-xs text-muted-foreground">
              Sort, filter, and scan the complete dataset.
            </p>
          </div>
        </div>
        <div className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {rows.length} rows
        </div>
      </div>

      <div className="p-2.5">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          pagination
          disableRowSelectionOnClick
          showToolbar
          hideFooterSelectedRowCount
          hideFooter={rows.length === 0}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
            sorting: {
              sortModel: [{ field: 'commenceDate', sort: 'asc' }],
            },
            ...gridProps?.initialState,
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          slots={{
            noRowsOverlay: () => (
              <EmptyState title={emptyTitle} description={emptyDescription} />
            ),
            noResultsOverlay: () => (
              <EmptyState
                title="No filtered results"
                description="We couldn't find any rows that match the current filters."
              />
            ),
            ...gridProps?.slots,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },
            ...gridProps?.slotProps,
          }}
          sx={{
            width: '100%',
            border: 0,
            '--DataGrid-overlayHeight': '16rem',
            '&.MuiDataGrid-root': {
              backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-toolbarContainer': {
              padding: '0.375rem 0.375rem 0.5rem',
              gap: '0.375rem',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButtonBase-root': {
              borderRadius: '999px',
              border: '1px solid color-mix(in oklab, var(--color-border) 90%, transparent)',
              color: 'var(--color-foreground)',
              textTransform: 'none',
              paddingInline: '0.75rem',
              fontSize: '0.8125rem',
              height: '32px',
            },
            '& .MuiDataGrid-toolbarContainer .MuiInputBase-root': {
              borderRadius: '999px',
              backgroundColor: 'color-mix(in oklab, white 82%, transparent)',
              fontSize: '0.8125rem',
              height: '32px',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: '1px solid color-mix(in oklab, var(--color-border) 90%, transparent)',
              backgroundColor: 'color-mix(in oklab, var(--color-background) 84%, white)',
              minHeight: '36px !important',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            },
            '& .MuiDataGrid-cell': {
              borderColor: 'color-mix(in oklab, var(--color-border) 70%, transparent)',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              fontSize: '0.8125rem',
            },
            '& .MuiDataGrid-row': {
              transition: 'transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
              minHeight: '36px !important',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'color-mix(in oklab, var(--color-primary) 6%, white)',
              transform: 'translateY(-1px)',
              boxShadow: 'inset 0 0 0 1px color-mix(in oklab, var(--color-primary) 18%, transparent)',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid color-mix(in oklab, var(--color-border) 90%, transparent)',
              minHeight: '40px !important',
              backgroundColor: 'color-mix(in oklab, var(--color-background) 95%, white)',
            },
            '& .MuiTablePagination-root': {
              color: 'var(--color-foreground)',
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: 'var(--color-muted-foreground)',
              fontSize: '0.8125rem',
            },
            '& .MuiTablePagination-select': {
              color: 'var(--color-foreground)',
              fontSize: '0.8125rem',
            },
            '& .MuiTablePagination-actions .MuiButtonBase-root': {
              color: 'var(--color-foreground)',
              borderRadius: '6px',
              padding: '6px',
              margin: '0 2px',
              transition: 'all 200ms ease',
            },
            '& .MuiTablePagination-actions .MuiButtonBase-root:hover': {
              backgroundColor: 'color-mix(in oklab, var(--color-primary) 10%, transparent)',
              color: 'var(--color-primary)',
            },
            '& .MuiTablePagination-actions .Mui-disabled': {
              color: 'var(--color-muted-foreground)',
            },
            '& .MuiCircularProgress-root': {
              color: 'var(--color-primary)',
            },
            ...gridProps?.sx,
          }}
          {...gridProps}
        />
      </div>
    </motion.section>
  );
}
