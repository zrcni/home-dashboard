import create, { StateCreator } from 'zustand'
import { ConditionData, ConditionMetricRow } from '@shared/types'

export enum AppView {
  Dashboard = 'dashboard',
  Metrics = 'metrics',
}

type AppStateSlice = {
  date: Date
  setDate(date: Date): void
  isMenuOpen: boolean
  toggleMenuOpen(): void
  closeMenu(): void
  currentView: AppView
  openView(view: AppView): void
}

const createAppStateSlice: StateCreator<AppStateSlice, [], [], AppStateSlice> =
  (set) => ({
    date: null as any,
    setDate: (date: Date) => set({ date }),
    isMenuOpen: false,
    toggleMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    closeMenu: () => set({ isMenuOpen: false }),
    currentView: null as any,
    openView: (view: AppView) => set({ currentView: view }),
  })

type ConditionsSlice = {
  outsideConditions: ConditionData | null
  setOutsideConditions(conditions: ConditionData): void
  insideConditions: ConditionData | null
  setInsideConditions(conditions: ConditionData): void
}

const createConditionsSlice: StateCreator<
  ConditionsSlice,
  [],
  [],
  ConditionsSlice
> = (set) => ({
  outsideConditions: null,
  setOutsideConditions(conditions: ConditionData) {
    set({ outsideConditions: conditions })
  },
  insideConditions: null,
  setInsideConditions(conditions: ConditionData) {
    set({ insideConditions: conditions })
  },
})

type MetricsSlice = {
  insideConditionsMetrics: ConditionMetricRow[]
  setInsideConditionsMetrics(rows: ConditionMetricRow[]): void
}

const createMetricsSlice: StateCreator<MetricsSlice, [], [], MetricsSlice> = (
  set
) => ({
  insideConditionsMetrics: [],
  setInsideConditionsMetrics(rows: ConditionMetricRow[]) {
    set({ insideConditionsMetrics: rows })
  },
})

export type Store = AppStateSlice & ConditionsSlice & MetricsSlice

export const useStore = create<Store>()((...args) => ({
  ...createAppStateSlice(...args),
  ...createConditionsSlice(...args),
  ...createMetricsSlice(...args),
}))

export function initializeStore(date: Date, initialView: AppView) {
  useStore.setState({
    date,
    currentView: initialView,
  })
}
