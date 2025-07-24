import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  DocumentData,
  Query,
  CollectionReference,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// User data interface
export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  height?: number; // in cm
  weight?: number; // in kg
  bust?: number; // in cm
  waist?: number; // in cm
  hip?: number; // in cm
  skinTone?: string;
  hairLength?: string;
  hairColor?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Generic function to add a document to any collection
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Generic function to update a document in any collection
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

// Generic function to delete a document from any collection
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Generic function to get a single document
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

// Generic function to get all documents from a collection
export const getCollection = async (collectionName: string, orderByField?: string) => {
  try {
    const collectionRef = collection(db, collectionName);
    let q: Query = collectionRef;
    
    if (orderByField) {
      q = query(collectionRef, orderBy(orderByField, 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const documents: any[] = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return documents;
  } catch (error) {
    console.error('Error getting collection:', error);
    throw error;
  }
};

// Function to delete multiple documents based on a condition
export const deleteDocumentsWhere = async (collectionName: string, field: string, operator: any, value: any) => {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log(`Successfully deleted ${querySnapshot.docs.length} documents`);
    return querySnapshot.docs.length;
  } catch (error) {
    console.error('Error deleting documents:', error);
    throw error;
  }
};

// Specific functions for users collection
export const addUser = async (userData: Omit<UserData, 'createdAt' | 'updatedAt'>) => {
  return addDocument('users', userData);
};

export const updateUser = async (userId: string, userData: Partial<UserData>) => {
  return updateDocument('users', userId, userData);
};

export const deleteUser = async (userId: string) => {
  return deleteDocument('users', userId);
};

export const getUser = async (userId: string) => {
  return getDocument('users', userId);
};

export const getUserByEmail = async (email: string) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  return getCollection('users', 'createdAt');
};

// Real-time listener for a collection
export const listenToCollection = (collectionName: string, callback: (data: any[]) => void, orderByField?: string) => {
  try {
    const collectionRef = collection(db, collectionName);
    let q: Query = collectionRef;
    
    if (orderByField) {
      q = query(collectionRef, orderBy(orderByField, 'desc'));
    }
    
    return onSnapshot(q, (querySnapshot) => {
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      callback(documents);
    });
  } catch (error) {
    console.error('Error setting up listener:', error);
    throw error;
  }
}; 