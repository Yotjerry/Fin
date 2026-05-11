import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use databaseId from config if present
const dbId = (firebaseConfig as any).firestoreDatabaseId || '(default)';

export const db = getFirestore(app, dbId);
export const auth = getAuth(app);

// Critical Constraint: Test connection on boot
import { doc, getDocFromServer } from 'firebase/firestore';

async function testConnection() {
  try {
    // Attempting to read a non-existent doc to test connectivity
    await getDocFromServer(doc(db, '_internal_', 'connection_test'));
    console.log("Firebase connection established.");
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}
testConnection();
