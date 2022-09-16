import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the database');

  const contactDb = await openDB('contact_db', 1);

  const tx = contactDb.transaction('contacts', 'readwrite');

  const store = tx.objectStore('contacts');
  
  const request = store.put({ id: id, content: content });
  const result = await request;
  console.log('Data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET is working');
  // creating a connection to the db
  const jateDb = await openDB('jate_db', 1);

  // creating a tx and setting it to read only since we're just retrieving data
  const tx = jateDb.transaction('jate', 'readonly');

  // open the jate store
  const store = tx.objectStore('jate');

  // request all the data
  const request = store.getAll();

  // confirm the request
  const result = await request;
  console.log('result.value', result);
  return result;

}


initdb();
