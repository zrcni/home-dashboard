import { OverlayMenuButton } from './OverlayMenuButton'
import './OverlayView.global.css'

type Props = {
  onToggleMenu(): void
}

/**
 * All elements are positioned absolutely
 */
export const OverlayView: React.FC<Props> = ({ onToggleMenu }) => {
  return <OverlayMenuButton onClick={onToggleMenu} />
}
