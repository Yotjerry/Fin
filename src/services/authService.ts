
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'ADMIN' | 'MERCHANT' | 'AGENT';
  agency?: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  bio?: string;
  pin?: string; 
  password?: string; // Secure password for initial login
  createdAt: any;
}

const googleProvider = new GoogleAuthProvider();

export const authService = {
  loginWithGoogle: async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      
      // Check if user exists in Firestore
      const userRef = doc(db, 'users', fbUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as User;
      } else {
        // Create new user (default to MERCHANT if not existing)
        const newUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Utilisateur',
          email: fbUser.email || '',
          role: 'MERCHANT',
          status: 'ACTIVE',
          createdAt: Date.now() as any
        };
        await setDoc(userRef, {
          ...newUser,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return newUser;
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'users');
      throw error;
    }
  },

  loginAgent: async (phone: string, password: string): Promise<{ user: User, isFirstLogin: boolean }> => {
    const normalizedPhone = phone.replace(/\s/g, "");
    const q = query(collection(db, 'users'), where('phone', '==', normalizedPhone), where('role', '==', 'AGENT'));
    
    try {
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error("Agent non trouvé avec ce numéro");
      
      const agentDoc = snapshot.docs[0];
      const agentData = agentDoc.data() as User;
      
      // Verification password (in production this would be bcrypt compared server-side)
      if (agentData.password !== password) throw new Error("Mot de passe incorrect");
      
      return { 
        user: agentData, 
        isFirstLogin: agentData.status === 'PENDING' 
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'users');
      throw error;
    }
  },

  updateAgentPin: async (userId: string, newPin: string): Promise<void> => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        pin: newPin,
        status: 'ACTIVE',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
      throw error;
    }
  },

  validatePin: async (userId: string, pin: string): Promise<boolean> => {
    try {
      const userSnap = await getDoc(doc(db, 'users', userId));
      if (!userSnap.exists()) return false;
      return userSnap.data().pin === pin;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'users');
      throw error;
    }
  },

  logout: async () => {
    await signOut(auth);
  }
};
