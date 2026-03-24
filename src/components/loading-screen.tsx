import LottieView from 'lottie-react-native';
import { DimensionValue, View } from 'react-native';

export default function LoadingScreen({size} : {size:DimensionValue | undefined}) {
    return (
        <View style={{height: size, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView 
                source={require('../assets/images/loading.json')} 
                loop
                autoPlay
                style={{ width: 200, height: 200 }}/>
        </View>
    )
}