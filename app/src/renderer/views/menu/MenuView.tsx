import { AppView } from 'renderer/store'
import './MenuView.global.css'

type Props = {
  onOpenView(view: AppView): void
}

export const MenuView: React.FC<Props> = ({ onOpenView }) => {
  return (
    <div id="menu">
      <button
        onClick={() => onOpenView(AppView.Dashboard)}
        className="menu-button"
      >
        Dashboard
      </button>

      <button
        onClick={() => onOpenView(AppView.Metrics)}
        className="menu-button"
      >
        Metrics
      </button>
    </div>
  )
}
