import { createFileRoute } from '@tanstack/react-router';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { format, isValid, parse } from 'date-fns';
import type { GridColDef } from '@mui/x-data-grid';
import {
  ArrowUpRight,
  BookOpenText,
  CalendarClock,
  GraduationCap,
  Sparkles,
  Users,
} from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { AppDataGrid } from '@/components/AppDataGrid';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

const dashboardPayload = {
  TotalStudents: 133,
  TotalPrograms: 500,
  data: [
    {
      id: 1,
      std_id: '1006dcaa-da8a-27b1-2aaf-6883495d762e',
      std_name: 'Ghala S F S  ALMOQAHWI',
      std_nationality: 'kuwaiti',
      std_crm_number: 'KSA-HQ-C-020283',
      std_phone_mobile: '+96598899586',
      std_gender: 'female',
      std_passport: 'P06924287',
      std_dob: '31-12-2007',
      std_stage: 'Commenced & Pipelined) (PKG',
      std_counselor: 'Anas Tarman Counselor Virtual Office',
      std_counselor_uname: 'a.tarman_cn_vf',
      std_adm_officer: 'Angela Saguid',
      std_adm_officer_uname: 'angela',
      std_office: 'HQ',
      std_subagent: 'Massar Tullabi',
      std_date_entered: 'Jul 25 2025',
      std_date_entered_year: '2025',
      std_date_entered_month: '7',
      std_email: 'g.almogahwi@gmail.com',
      opp_id: 'cc2f4210-efac-e337-386d-68834a2a8596',
      opp_name: 'AUT University Certificate in Foundation Studies - Standard',
      opp_institute_name: 'UP Education',
      opp_course_level: 'Foundation',
      opp_counselor: 'Anas Tarman Counselor Virtual Office',
      opp_counselor_uname: 'a.tarman_cn_vf',
      opp_adm_officer: 'Angela Saguid',
      opp_adm_officer_uname: 'angela',
      opp_office: 'HQ',
      opp_subagent: 'Massar Tullabi',
      opp_salaes_stage: 'Commenced',
      opp_commence_date: '02-Feb-2026',
      opp_commence_date_year: '2026',
      opp_commence_date_month: '2',
      opp_last_stage_change_date: '09-Dec-2025',
      opp_date_entered: '25-Jul-2025',
      opp_date_entered_year: '2025',
      opp_date_entered_month: '7',
      std_created_by: null,
      std_lead_source: null,
      std_date_entered_iso: null,
      opp_commence_date_iso: null,
      opp_last_stage_change_date_iso: null,
      opp_date_entered_iso: null,
    },
    {
      id: 2,
      std_id: '1006dcaa-da8a-27b1-2aaf-6883495d762e',
      std_name: 'Ghala S F S  ALMOQAHWI',
      std_nationality: 'kuwaiti',
      std_crm_number: 'KSA-HQ-C-020283',
      std_phone_mobile: '+96598899586',
      std_gender: 'female',
      std_passport: 'P06924287',
      std_dob: '31-12-2007',
      std_stage: 'Commenced & Pipelined) (PKG',
      std_counselor: 'Anas Tarman Counselor Virtual Office',
      std_counselor_uname: 'a.tarman_cn_vf',
      std_adm_officer: 'Angela Saguid',
      std_adm_officer_uname: 'angela',
      std_office: 'HQ',
      std_subagent: 'Massar Tullabi',
      std_date_entered: 'Jul 25 2025',
      std_date_entered_year: '2025',
      std_date_entered_month: '7',
      std_email: 'g.almogahwi@gmail.com',
      opp_id: 'a55126d1-ebfa-8f2b-0e09-68834aa18e2f',
      opp_name: 'Bachelor of Health Science  Podiatry ',
      opp_institute_name: 'Auckland University of Technology',
      opp_course_level: 'Undergraduate',
      opp_counselor: 'Anas Tarman Counselor Virtual Office',
      opp_counselor_uname: 'a.tarman_cn_vf',
      opp_adm_officer: 'Angela Saguid',
      opp_adm_officer_uname: 'angela',
      opp_office: 'HQ',
      opp_subagent: 'Massar Tullabi',
      opp_salaes_stage: 'Pipeline First Commencement',
      opp_commence_date: '22-Feb-2027',
      opp_commence_date_year: '2027',
      opp_commence_date_month: '2',
      opp_last_stage_change_date: '09-Dec-2025',
      opp_date_entered: '25-Jul-2025',
      opp_date_entered_year: '2025',
      opp_date_entered_month: '7',
      std_created_by: null,
      std_lead_source: null,
      std_date_entered_iso: null,
      opp_commence_date_iso: null,
      opp_last_stage_change_date_iso: null,
      opp_date_entered_iso: null,
    },
  ],
};

type SourceRow = (typeof dashboardPayload.data)[number];

type DashboardRow = {
  id: number;
  studentName: string;
  nationality: string;
  programName: string;
  stage: string;
  commenceDate: string;
  commenceDateSort: number;
  institute: string;
  level: string;
  counselor: string;
  crmNumber: string;
  email: string;
  phone: string;
};

function toTitleCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function cleanText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function formatReadableDate(value: string) {
  const parsed = parse(value, 'dd-MMM-yyyy', new Date());
  return isValid(parsed) ? format(parsed, 'dd MMM yyyy') : value;
}

function formatStudentDate(value: string) {
  const parsed = parse(value, 'MMM dd yyyy', new Date());
  return isValid(parsed) ? format(parsed, 'dd MMM yyyy') : value;
}

function getDateSortValue(value: string) {
  const parsed = parse(value, 'dd-MMM-yyyy', new Date());
  return isValid(parsed) ? parsed.getTime() : Number.MAX_SAFE_INTEGER;
}

function createDashboardRows(data: SourceRow[]): DashboardRow[] {
  return data.map((item) => ({
    id: item.id,
    studentName: cleanText(item.std_name),
    nationality: toTitleCase(item.std_nationality),
    programName: cleanText(item.opp_name),
    stage: cleanText(item.opp_salaes_stage || item.std_stage),
    commenceDate: formatReadableDate(item.opp_commence_date),
    commenceDateSort: getDateSortValue(item.opp_commence_date),
    institute: cleanText(item.opp_institute_name),
    level: cleanText(item.opp_course_level),
    counselor: cleanText(item.opp_counselor),
    crmNumber: item.std_crm_number,
    email: item.std_email,
    phone: item.std_phone_mobile,
  }));
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accentClassName,
  delay,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  accentClassName: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-[28px] border border-white/65 bg-white/95 p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.55)] backdrop-blur dark:border-white/10 dark:bg-card/85"
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-80',
          accentClassName
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-foreground">{value}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{subtitle}</p>
        </div>
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-gradient-to-br shadow-sm dark:border-white/10',
            accentClassName
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
        <ArrowUpRight className="h-4 w-4" />
        Live overview
      </div>
    </motion.div>
  );
}

function DashboardPage() {
  const rows = createDashboardRows(dashboardPayload.data);
  const columns: GridColDef<DashboardRow>[] = [
    {
      field: 'studentName',
      headerName: 'Student Name',
      flex: 1.2,
      minWidth: 220,
      renderCell: ({ row, value }) => (
        <div className="flex min-w-0 flex-col py-2">
          <span className="truncate font-semibold text-foreground">{value}</span>
          <span className="truncate text-xs text-muted-foreground">{row.crmNumber}</span>
        </div>
      ),
    },
    {
      field: 'nationality',
      headerName: 'Nationality',
      minWidth: 140,
      flex: 0.75,
      renderCell: ({ value }) => (
        <span className="rounded-full bg-chart-2/12 px-3 py-1 text-xs font-semibold text-foreground">
          {String(value)}
        </span>
      ),
    },
    {
      field: 'programName',
      headerName: 'Program Name',
      flex: 1.6,
      minWidth: 260,
      renderCell: ({ row, value }) => (
        <div className="flex min-w-0 flex-col py-2">
          <span className="line-clamp-1 font-medium text-foreground">{value}</span>
          <span className="line-clamp-1 text-xs text-muted-foreground">{row.institute}</span>
        </div>
      ),
    },
    {
      field: 'stage',
      headerName: 'Stage',
      minWidth: 210,
      flex: 0.9,
      renderCell: ({ value }) => (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {String(value)}
        </span>
      ),
    },
    {
      field: 'commenceDate',
      headerName: 'Commence Date',
      minWidth: 160,
      flex: 0.8,
      sortComparator: (_a, _b, paramA, paramB) =>
        (paramA.api.getRow(paramA.id)?.commenceDateSort ?? 0) -
        (paramB.api.getRow(paramB.id)?.commenceDateSort ?? 0),
      renderCell: ({ value }) => (
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CalendarClock className="h-4 w-4 text-primary" />
          <span>{String(value)}</span>
        </div>
      ),
    },
    {
      field: 'level',
      headerName: 'Level',
      minWidth: 140,
      flex: 0.7,
    },
    {
      field: 'counselor',
      headerName: 'Counselor',
      minWidth: 220,
      flex: 1,
      renderCell: ({ value }) => (
        <span className="line-clamp-1 text-sm text-muted-foreground">{String(value)}</span>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="relative isolate mx-auto max-w-7xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 rounded-[40px] bg-[radial-gradient(circle_at_top_left,_rgba(58,123,213,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(58,123,213,0.22),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.2),rgba(15,23,42,0))]" />

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-[32px] border border-white/70 bg-white/75 p-8 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-white/10 dark:bg-card/75"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Admissions Intelligence
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                A premium, at-a-glance view of your student pipeline.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Review every active record without pagination friction, surface key milestones
                quickly, and keep the team aligned on intake momentum.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
              <div className="rounded-[24px] border border-border/70 bg-background/80 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Last Intake
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {formatStudentDate(dashboardPayload.data[0]?.std_date_entered ?? '')}
                </p>
              </div>
              <div className="rounded-[24px] border border-border/70 bg-background/80 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Next Commence
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">{rows[0]?.commenceDate}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <MetricCard
            title="Total Students"
            value={dashboardPayload.TotalStudents.toLocaleString()}
            subtitle="Unique students currently tracked across the admissions pipeline."
            icon={Users}
            accentClassName="from-chart-1 to-primary text-chart-1"
            delay={0.05}
          />
          <MetricCard
            title="Total Programs"
            value={dashboardPayload.TotalPrograms.toLocaleString()}
            subtitle="Programs available for matching and placement conversations."
            icon={BookOpenText}
            accentClassName="from-chart-3 to-chart-2 text-chart-3"
            delay={0.12}
          />
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              label: 'Highlighted student',
              value: rows[0]?.studentName ?? 'No student',
              icon: GraduationCap,
            },
            {
              label: 'Primary nationality',
              value: rows[0]?.nationality ?? 'No data',
              icon: Users,
            },
            {
              label: 'Upcoming start',
              value: rows[0]?.commenceDate ?? 'No date',
              icon: CalendarClock,
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.18 + index * 0.05 }}
              className="rounded-[24px] border border-border/70 bg-background/70 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-base font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <div className="mt-8">
          <AppDataGrid
            rows={rows}
            columns={columns}
            loading={false}
            emptyTitle="No pipeline records yet"
            emptyDescription="Once student opportunities arrive, they'll appear here with sorting and filters ready to go."
            gridProps={{
              getRowHeight: () => 74,
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
}
