import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to the databse and choose version 1
  const jateDB = await openDB("jate", 1);
  // creates a new transaction specifying the database and data priveledges
  const tx = jateDB.transaction(["jate"], "readwrite");
  // open up the desired object store
  const store = tx.objectStore("jate");
  // use the put method to edit the content
  const request = store.put({ id: 1, value: content });
  // get confirmation of the request
  const result = await request;
  console.log("Data saved to the database successfully", result);
};

// a method that gets all the content from the database
export const getDb = async () => {
  // connect to the databse and choose version 1
  const jateDB = await openDB("jate", 1);
  // creates a new transaction specifying the database and data priveledges
  const tx = jateDB.transaction(["jate"], "readonly");
  // open up the desired object store
  const store = tx.objectStore("jate");
  // use the get method to get the content
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log(result);
};

initdb();
