
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
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export interface Product {
  id: string;
  name: string;
  merchantId: string;
  agencyId?: string;
  stock: number;
  minStock: number;
  price: number;
  category: string;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  updatedAt?: number;
}

export const productService = {
  subscribeToAgencyStock: (agencyId: string, callback: (products: Product[]) => void) => {
    const q = query(collection(db, 'products'), where('agencyId', '==', agencyId));
    return onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toMillis()
      })) as Product[];
      callback(products);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });
  },

  subscribeToMerchantStock: (merchantId: string, callback: (products: Product[]) => void) => {
    const q = query(collection(db, 'products'), where('merchantId', '==', merchantId));
    return onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toMillis()
      })) as Product[];
      callback(products);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });
  },

  addProduct: async (product: Omit<Product, 'id' | 'status'>): Promise<string> => {
    const path = 'products';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...product,
        status: product.stock === 0 ? 'OUT_OF_STOCK' : (product.stock <= product.minStock ? 'LOW_STOCK' : 'IN_STOCK'),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  },

  updateStock: async (productId: string, quantityChange: number): Promise<void> => {
    const productRef = doc(db, 'products', productId);
    try {
      const snap = await getDoc(productRef);
      if (snap.exists()) {
        const currentStock = snap.data().stock || 0;
        const newStock = Math.max(0, currentStock + quantityChange);
        let status: Product['status'] = 'IN_STOCK';
        if (newStock === 0) status = 'OUT_OF_STOCK';
        else if (newStock <= (snap.data().minStock || 5)) status = 'LOW_STOCK';

        await updateDoc(productRef, {
          stock: newStock,
          status,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${productId}`);
      throw error;
    }
  }
};
