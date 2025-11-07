import { StyleSheet } from 'react-native';
import {colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  name_project:{
    alignItems:'center',
    marginBottom: 10
  },
  content:{
    flex:1,
    margin: 15,
    marginTop: 50,
  },
  input:{
    backgroundColor: colors.secondary,
    height: 60,
    fontSize: 16,
    padding: 20,
    borderRadius: 8,
    color: colors.text
  },
  link:{
    alignItems: 'center',
  },
  esqueceuSenha:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,

  }
});