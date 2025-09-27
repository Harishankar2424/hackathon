
import { app } from "@/lib/firebase";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, getDoc } from "firebase/firestore";
import type { Contract } from '@/lib/types';
import { z } from "zod";

const db = getFirestore(app);

// Distributor Schemas and Functions
export const distributorFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    region: z.string(),
});
export type DistributorData = z.infer<typeof distributorFormSchema>;

export async function addDistributor(userId: string, data: DistributorData) {
    try {
        await setDoc(doc(db, "distributors", userId), {
            ...data,
            role: 'distributor',
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding distributor to Firestore: ", error);
        throw new Error("Failed to save distributor information.");
    }
}

export async function getDistributorData(userId: string): Promise<DistributorData | null> {
    const docRef = doc(db, "distributors", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as DistributorData;
    }
    return null;
}

// Vendor Schemas and Functions
export const vendorFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
});
export type VendorData = z.infer<typeof vendorFormSchema>;

export async function addVendor(userId: string, data: VendorData) {
    try {
        await setDoc(doc(db, "vendors", userId), {
            ...data,
            role: 'vendor',
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding vendor to Firestore: ", error);
        throw new Error("Failed to save vendor information.");
    }
}

export async function getVendorData(userId: string): Promise<VendorData | null> {
    const docRef = doc(db, "vendors", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as VendorData;
    }
    return null;
}


// User Role check
export async function getUserRole(userId: string): Promise<string | null> {
    const distributorDocRef = doc(db, 'distributors', userId);
    const distributorDoc = await getDoc(distributorDocRef);
    if (distributorDoc.exists()) {
        return 'distributor';
    }

    const vendorDocRef = doc(db, 'vendors', userId);
    const vendorDoc = await getDoc(vendorDocRef);
    if (vendorDoc.exists()) {
        return 'vendor';
    }

    return null;
}


export async function getContracts(): Promise<Contract[]> {
    const contractsCol = collection(db, 'active_offers');
    const contractSnapshot = await getDocs(contractsCol);
    const contractList = contractSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            vendorId: data.vendorId,
            vendorName: data.vendorName,
            title: data.title,
            product: data.product,
            region: data.region,
            status: data.status,
            details: data.details,
            summary: data.summary,
        } as Contract;
    });
    return contractList;
}

export const contractFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  product: z.string().min(1, 'Product is required'),
  region: z.string().min(1, 'Region is required'),
  rights: z.string().min(1, 'Rights are required'),
  territory: z.string().min(1, 'Territory is required'),
  pricing: z.string().min(1, 'Pricing is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  ip: z.string().min(1, 'IP and Brand use is required'),
  term: z.string().min(1, 'Term is required'),
  confidentiality: z.string().min(1, 'Confidentiality is required'),
  fullDetails: z.string().optional(),
});
export type ContractFormData = z.infer<typeof contractFormSchema>;

export async function addContract(data: ContractFormData) {
  try {
    // This is a simplified version. In a real app, you'd get the vendor name and ID from the logged-in user.
    const vendorName = "Global Tech Inc."; 
    const vendorId = "ven_1";

    const contractDetails = `
      Exclusive/Non-Exclusive Rights: ${data.rights}
      Territory & Sales Scope: ${data.territory}
      Pricing & Payment Terms: ${data.pricing}
      Minimum Sales or Purchase Requirements: ${data.requirements}
      Intellectual Property & Brand Use: ${data.ip}
      Term, Renewal & Termination: ${data.term}
      Confidentiality & Non-Compete: ${data.confidentiality}

      ${data.fullDetails || ''}
    `.trim();

    await addDoc(collection(db, "active_offers"), {
      vendorId,
      vendorName,
      title: data.title,
      product: data.product,
      region: data.region,
      status: 'Open',
      details: contractDetails,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding contract to Firestore: ", error);
    throw new Error("Failed to publish contract.");
  }
}
