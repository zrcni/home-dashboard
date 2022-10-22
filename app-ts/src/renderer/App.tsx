import ms from 'ms'
import { MenuViewController } from './views/menu'
import { DashboardViewController } from './views/dashboard'
import { OverlayViewController } from './views/overlay'
import { AppView, useStore } from './store'
import { useInterval } from './hooks'
import './App.global.css'

export default function App() {
  const isMenuOpen = useStore((state) => state.isMenuOpen)
  const view = useStore((state) => state.currentView)
  const setDate = useStore((state) => state.setDate)
  useInterval(() => setDate(new Date()), ms('1s'))

  return (
    <div id="main-view">
      {isMenuOpen && <MenuViewController />}
      {!isMenuOpen && (
        <>{view === AppView.Dashboard && <DashboardViewController />}</>
      )}

      <OverlayViewController />
    </div>
  )
}
