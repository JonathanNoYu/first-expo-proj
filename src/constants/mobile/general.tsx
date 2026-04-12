import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const general_style = StyleSheet.create(
    {
    container: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
        marginTop: hp(3)
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    }
    }
) 