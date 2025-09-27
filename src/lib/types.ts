
export interface Contract {
    id: string;
    vendorId: string;
    vendorName: string;
    title: string;
    product: string;
    region: string;
    status: string;
    details: string;
    summary: {
      "Exclusive/Non-Exclusive Rights": string;
      "Territory & Sales Scope": string;
      "Pricing & Payment Terms": string;
      "Minimum Sales or Purchase Requirements": string;
      "Intellectual Property & Brand Use": string;
      "Term, Renewal & Termination": string;
      "Confidentiality & Non-Compete": string;
    };
  }
  