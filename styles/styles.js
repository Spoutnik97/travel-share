import { StyleSheet } from 'react-native';

import colors from './colors';

const styles = StyleSheet.create({
  HEADER_HEIGHT: 38,

  card: {
    elevation: 2,
    borderRadius: 12,
    backgroundColor: colors.white,
    margin: 12,
    height: 175,
    width: 175,
  },
  CardPeople: {
    elevation: 2,
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 12,
  },

  column: {
    flex: 1,
    flexDirection: 'column',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
  },

  content: {
    padding: 12,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    marginBottom: 12,
    minHeight: 48,
    backgroundColor: 'transparent',
  },

  profilPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  progressBarDiv: {
    width: '15%',
    height: 28,
    marginBottom: 12,
    marginTop: 12,
    marginRight: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default styles;
