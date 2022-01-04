import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SplashToMenu from '../Components/SplashToMenu'
import Connexion from '../Components/Connexion'
import Home from '../Components/Home'

const RedditechStackNavigator = createStackNavigator({
    Connexion: {
        screen: Connexion,
        navigationOptions: {
            headerShown: false,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        }
    },
    initialRouteName: 'SplashToMenu',
})

export default createAppContainer(RedditechStackNavigator)