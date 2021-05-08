import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase(
  {
    name: 'dictionaries.sqlite',
    location: 'default',
    createFromLocation: 1,
  },
  () => {
    console.log('db connect');
  },
  err => {
    console.error(err);
  },
);

export default db;
