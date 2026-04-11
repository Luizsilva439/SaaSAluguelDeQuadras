import { Image } from 'react-native'

export default function Splash() {
    return (
        <Image
            source={require('../../assets/splash-icon.png')}
            style={{width: 20, height: 20}}
        />
    )
}

