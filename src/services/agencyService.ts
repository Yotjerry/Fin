
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc, 
  updateDoc, 
  addDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export interface Agency {
  id: string;
  name: string;
  merchantId: string;
  status: 'OK' | 'A_SURVEILLER' | 'INACTIVE';
  balance: number;
  plafond: number;
  createdAt: number;
  latestActivityAt?: number;
}

export const agencyService = {
  getAgenciesByMerchant: async (merchantId: string): Promise<Agency[]> => {
    const path = 'agencies';
    try {
      const q = query(collection(db, path), where('merchantId', '==', merchantId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toMillis() || Date.now(),
        latestActivityAt: (doc.data().latestActivityAt as Timestamp)?.toMillis()
      })) as Agency[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  },

  getAgencyById: async (agencyId: string): Promise<Agency | null> => {
    const path = `agencies/${agencyId}`;
    try {
      const docSnap = await getDoc(doc(db, 'agencies', agencyId));
      if (!docSnap.exists()) return null;
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: (data.createdAt as Timestamp)?.toMillis() || Date.now(),
        latestActivityAt: (data.latestActivityAt as Timestamp)?.toMillis()
      } as Agency;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      throw error;
    }
  },

  updateAgencyBalance: async (agencyId: string, amount: number): Promise<void> => {
    const path = `agencies/${agencyId}`;
    try {
      const agencyRef = doc(db, 'agencies', agencyId);
      const agencySnap = await getDoc(agencyRef);
      if (agencySnap.exists()) {
        const currentBalance = agencySnap.data().balance || 0;
        await updateDoc(agencyRef, {
          balance: currentBalance + amount,
          latestActivityAt: serverTimestamp()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      throw error;
    }
  }
};
