import { motion } from 'framer-motion';
import { DataGrid, type DataGridProps, type GridValidRowModel } from '@mui/x-data-grid';
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
    'rows' | 'columns' | 'loading' | 'pagination' | 'hideFooterPagination'
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
        'overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-white/10 dark:bg-card/85',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Student Pipeline</p>
            <p className="text-xs text-muted-foreground">
              Sort, filter, and scan the complete dataset in one place.
            </p>
          </div>
        </div>
        <div className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
          {rows.length} visible rows
        </div>
      </div>

      <div className="p-3">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          pagination={false}
          disableRowSelectionOnClick
          showToolbar
          hideFooterPagination
          hideFooterSelectedRowCount
          hideFooter={rows.length === 0}
          initialState={{
            sorting: {
              sortModel: [{ field: 'commenceDate', sort: 'asc' }],
            },
            ...gridProps?.initialState,
          }}
          pageSizeOptions={[rows.length || 1]}
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
            border: 0,
            '--DataGrid-overlayHeight': '18rem',
            '&.MuiDataGrid-root': {
              backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-toolbarContainer': {
              padding: '0.5rem 0.5rem 0.75rem',
              gap: '0.5rem',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButtonBase-root': {
              borderRadius: '999px',
              border: '1px solid color-mix(in oklab, var(--color-border) 90%, transparent)',
              color: 'var(--color-foreground)',
              textTransform: 'none',
              paddingInline: '0.875rem',
            },
            '& .MuiDataGrid-toolbarContainer .MuiInputBase-root': {
              borderRadius: '999px',
              backgroundColor: 'color-mix(in oklab, white 82%, transparent)',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: '1px solid color-mix(in oklab, var(--color-border) 90%, transparent)',
              backgroundColor: 'color-mix(in oklab, var(--color-background) 84%, white)',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            },
            '& .MuiDataGrid-cell': {
              borderColor: 'color-mix(in oklab, var(--color-border) 70%, transparent)',
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-row': {
              transition: 'transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'color-mix(in oklab, var(--color-primary) 6%, white)',
              transform: 'translateY(-1px)',
              boxShadow: 'inset 0 0 0 1px color-mix(in oklab, var(--color-primary) 18%, transparent)',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid color-mix(in oklab, var(--color-border) 90%, transparent)',
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
