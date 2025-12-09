import { useCallback } from 'react'
import { AppView, useStore } from 'renderer/store'
import { MenuView } from './MenuView'

export const MenuViewController: React.FC = () => {
  const openView = useStore((state) => state.openView)
  const closeMenu = useStore((state) => state.closeMenu)

  const onOpenView = useCallback(
    (view: AppView) => {
      openView(view)
      closeMenu()
    },
    [openView]
  )

  return <MenuView onOpenView={onOpenView} />
}
