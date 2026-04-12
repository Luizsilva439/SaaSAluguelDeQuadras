import { StyleSheet } from 'react-native'; 
import { colors } from '../../../../constants/colors';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    top: {
        padding: 16
    },
    defaultTitle:{
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar:{
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        padding: 8,
        paddingLeft: 12,
        borderRadius: 8,
    }
})