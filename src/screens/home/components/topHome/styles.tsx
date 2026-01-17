import { StyleSheet } from 'react-native'; 
import { colors } from '../../../../constants/colors';

export const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header_content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    top: {
        flex: 1,
        padding: 16
    },
    defaultTitle:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    search:{
        flex: 1,
    },
    searchBar:{
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        padding: 8,
        paddingLeft: 12,
        borderRadius: 8,
    }
})