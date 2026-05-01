import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  name_project: {
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 20,
    marginBottom: -20,
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.secondary,
    height: 60,
    fontSize: 16,
    padding: 20,
    borderRadius: 8,
    color: colors.text
  },
  link: {
    alignItems: 'center',
    marginTop: -8,
  },
  esqueceuSenha: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-end",
    marginTop: 30,
    marginBottom: 20,
  },
  text_welcome: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});