import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhvtGoN4olnPhFM0yaSz0OXAw0LWrsUWg",
  authDomain: "rescuekit-ed48a.firebaseapp.com",
  projectId: "rescuekit-ed48a",
  storageBucket: "rescuekit-ed48a.firebasestorage.app",
  messagingSenderId: "864446788576",
  appId: "1:864446788576:web:ca2681d27692373128f185"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Deal {
  id?: string;
  title: string;
  storeName?: string;
  description?: string;
  originalPrice?: number;
  salePrice?: number;
  imageUrl?: string;
  affiliateLink: string;
  createdAt: number;
}

export const getDeals = async (): Promise<Deal[]> => {
  const q = query(collection(db, "deals"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Deal));
};

export const addDeal = async (deal: Omit<Deal, 'id'>) => {
  return await addDoc(collection(db, "deals"), deal);
};

export const updateDeal = async (id: string, deal: Partial<Deal>) => {
  const dealRef = doc(db, "deals", id);
  return await updateDoc(dealRef, deal);
};

export const deleteDeal = async (id: string) => {
  const dealRef = doc(db, "deals", id);
  return await deleteDoc(dealRef);
};

// Pre-populate 4 sample deals if empty
export const seedDealsIfEmpty = async () => {
  const deals = await getDeals();
  if (deals.length === 0) {
    const sampleDeals: Omit<Deal, 'id'>[] = [
      {
        title: "Jitterbug Smart3 Smartphone",
        storeName: "Lively",
        description: "A simple smartphone designed specifically for seniors with a large screen and easy-to-navigate menu.",
        originalPrice: 149.99,
        salePrice: 112.49,
        imageUrl: "https://picsum.photos/seed/phone/400/300",
        affiliateLink: "https://example.com/deal1",
        createdAt: Date.now()
      },
      {
        title: "GrandPad Tablet",
        storeName: "Consumer Cellular",
        description: "The perfect tablet for seniors to stay connected with family, play games, and browse safely.",
        originalPrice: 299.00,
        salePrice: 249.00,
        imageUrl: "https://picsum.photos/seed/tablet/400/300",
        affiliateLink: "https://example.com/deal2",
        createdAt: Date.now() - 1000
      },
      {
        title: "Medical Alert System",
        storeName: "Life Alert",
        description: "24/7 emergency response system with fall detection and GPS tracking for peace of mind.",
        originalPrice: 49.95,
        salePrice: 39.95,
        imageUrl: "https://picsum.photos/seed/medical/400/300",
        affiliateLink: "https://example.com/deal3",
        createdAt: Date.now() - 2000
      },
      {
        title: "Ergonomic Reading Glasses",
        storeName: "Readers.com",
        description: "Comfortable, lightweight reading glasses with anti-glare coating and blue light blocking.",
        originalPrice: 24.99,
        salePrice: 14.99,
        imageUrl: "https://picsum.photos/seed/glasses/400/300",
        affiliateLink: "https://example.com/deal4",
        createdAt: Date.now() - 3000
      }
    ];
    
    for (const deal of sampleDeals) {
      await addDeal(deal);
    }
  }
};
