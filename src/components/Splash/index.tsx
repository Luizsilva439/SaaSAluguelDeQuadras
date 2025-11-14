import { Image } from 'react-native'

export default function Splash() {
    return (
        <Image
            source={require('../.assets/splas-icon.png')}
            style={{width: 20, height: 20}}
        />
    )
}

