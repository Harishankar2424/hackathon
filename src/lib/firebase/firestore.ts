
import { app } from "@/lib/firebase";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import type { Contract } from '@/lib/types';
import { z } from "zod";

const db = getFirestore(app);

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
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding distributor to Firestore: ", error);
        throw new Error("Failed to save distributor information.");
    }
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

