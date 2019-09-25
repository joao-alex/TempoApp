import { createAppContainer,createSwitchNavigator} from 'react-navigation'

import Home from './pages/Home'
import TempoByCity from './pages/TempoByCity'
import TempoByLocation from './pages/TempoByLocation'

export default createAppContainer(
  createSwitchNavigator({
      Home,
      TempoByCity,
      TempoByLocation,
  })
);
