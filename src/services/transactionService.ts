
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc, 
  serverTimestamp,
  Timestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export type TransactionNature = 'DEPOT' | 'RETRAIT' | 'VENTE' | 'RECHARGE' | 'RAMASSAGE';
export type TransactionStatus = 'CONFIRME' | 'ECHEC' | 'EN_ATTENTE';

export interface Transaction {
  id: string;
  nature: TransactionNature;
  reference: string;
  amount: number;
  status: TransactionStatus;
  agentId: string;
  agencyId: string;
  merchantId: string;
  date: number;
  proofUrl?: string;
  externalRef?: string;
  service?: string;
}

export const transactionService = {
  createTransaction: async (txn: Omit<Transaction, 'id' | 'date'>): Promise<string> => {
    const path = 'transactions';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...txn,
        date: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  },

  getRecentTransactions: async (id: string, role: 'AGENT' | 'MERCHANT' | 'ADMIN', count: number = 20): Promise<Transaction[]> => {
    const path = 'transactions';
    try {
      let q;
      if (role === 'AGENT') {
        q = query(collection(db, path), where('agentId', '==', id), orderBy('date', 'desc'), limit(count));
      } else if (role === 'MERCHANT') {
        q = query(collection(db, path), where('merchantId', '==', id), orderBy('date', 'desc'), limit(count));
      } else {
        q = query(collection(db, path), orderBy('date', 'desc'), limit(count));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: (doc.data().date as Timestamp)?.toMillis() || Date.now()
      })) as Transaction[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  }
};
