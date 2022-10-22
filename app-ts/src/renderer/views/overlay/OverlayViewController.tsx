import { useStore } from 'renderer/store'
import { OverlayView } from './OverlayView'

export const OverlayViewController: React.FC = () => {
  const onToggleMenu = useStore((state) => state.toggleMenuOpen)
  return <OverlayView onToggleMenu={onToggleMenu} />
}
