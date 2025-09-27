
import { app } from "@/lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import type { Contract } from '@/lib/types';

const db = getFirestore(app);

export async function getContracts(): Promise<Contract[]> {
    const contractsCol = collection(db, 'contracts');
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
