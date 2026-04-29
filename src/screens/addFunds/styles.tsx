import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  backButton: {
    marginRight: 15,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  currencyPrefix: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  presetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  presetButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  presetButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockQrCode: {
    width: 250,
    height: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    padding: 20,
  },
  qrText: {
    color: colors.dark,
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },
  simulateButton: {
    width: '100%',
    marginBottom: 15,
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '600',
  },
});
