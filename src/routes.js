import { createAppContainer,createSwitchNavigator} from 'react-navigation'

import Home from './pages/Home'
import TempoByCity from './pages/TempoByCity'

export default createAppContainer(
  createSwitchNavigator({
      Home,
      TempoByCity,
  })
);
