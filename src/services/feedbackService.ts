
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  doc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export type FeedbackType = 'Correction' | 'Bug Technique' | 'Suggestion' | 'Autre';
export type FeedbackStatus = 'Reçu' | 'En cours' | 'Résolu' | 'Classé';

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  type: FeedbackType;
  message: string;
  status: FeedbackStatus;
  adminNote?: string;
  createdAt: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  isPublic: boolean;
  createdAt: number;
}

export const feedbackService = {
  // Feedback methods
  submitFeedback: async (feedback: Omit<Feedback, 'id' | 'status' | 'createdAt'>): Promise<Feedback> => {
    const path = 'feedbacks';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...feedback,
        status: 'Reçu',
        createdAt: serverTimestamp()
      });
      return { 
        ...feedback, 
        id: docRef.id, 
        status: 'Reçu', 
        createdAt: Date.now() 
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  },

  getFeedbacksByUser: async (userId: string): Promise<Feedback[]> => {
    const path = 'feedbacks';
    try {
      const q = query(
        collection(db, path), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toMillis() || Date.now()
      })) as Feedback[];
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      throw error;
    }
  },

  getAllFeedbacks: async (): Promise<Feedback[]> => {
    const path = 'feedbacks';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toMillis() || Date.now()
      })) as Feedback[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  },

  updateFeedbackStatus: async (id: string, status: FeedbackStatus, adminNote?: string): Promise<void> => {
    const path = `feedbacks/${id}`;
    try {
      await updateDoc(doc(db, 'feedbacks', id), { 
        status, 
        adminNote,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      throw error;
    }
  },

  // Review methods
  submitReview: async (review: Omit<Review, 'id' | 'createdAt' | 'isPublic'>): Promise<Review> => {
    const path = 'reviews';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...review,
        isPublic: true,
        createdAt: serverTimestamp()
      });
      return { 
        ...review, 
        id: docRef.id, 
        isPublic: true, 
        createdAt: Date.now() 
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  },

  getPublicReviews: async (): Promise<Review[]> => {
    const path = 'reviews';
    try {
      const q = query(
        collection(db, path), 
        where('isPublic', '==', true),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toMillis() || Date.now()
      })) as Review[];
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      throw error;
    }
  }
};
