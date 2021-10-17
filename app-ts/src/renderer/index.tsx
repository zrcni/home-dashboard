import { render } from 'react-dom'
import App from './App'
import { cfg } from './config'
import { setCSSVariable } from './utils/setCSSVariable'

if (cfg.hideCursor) setCSSVariable('cursor', 'none')

render(<App />, document.getElementById('root'))
