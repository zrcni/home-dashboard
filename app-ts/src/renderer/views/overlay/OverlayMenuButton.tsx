import './OverlayView.global.css'

type Props = {
  onClick(): void
  disabled?: boolean
}

export const OverlayMenuButton: React.FC<Props> = ({ disabled, onClick }) => {
  return (
    <button className="overlay-menu-btn" onClick={onClick} disabled={disabled}>
      Menu
    </button>
  )
}
