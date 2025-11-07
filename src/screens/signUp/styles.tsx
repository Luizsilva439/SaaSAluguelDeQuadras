import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    back: {
        position: 'absolute',
        left: 16,
    },
    content:{
        gap: 24,
        marginHorizontal: 16,
    },
  input:{
    backgroundColor: colors.secondary,
    height: 60,
    fontSize: 16,
    padding: 20,
    borderRadius: 8,
    color: colors.text
  },
  checkboxContainer:{
    flexDirection: 'row',
  },
  checkbox:{
    marginRight: 10,
  }
});