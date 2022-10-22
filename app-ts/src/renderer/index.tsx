import { render } from 'react-dom'
import App from './App'
import { cfg } from './config'
import { AppView, initializeStore } from './store'
import { setCSSVariable } from './utils/setCSSVariable'

if (cfg.hideCursor) setCSSVariable('cursor', 'none')

initializeStore(new Date(), AppView.Dashboard)

render(<App />, document.getElementById('root'))
