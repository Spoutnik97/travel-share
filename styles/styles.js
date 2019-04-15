import { StyleSheet } from 'react-native';

import colors from './colors';

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.white,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },

  content: {
    padding: 12,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default styles;
