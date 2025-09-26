export const regions = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "Latin America",
  "Middle East & Africa",
];

export const mockVendors = [
  { id: "ven_1", name: "Global Tech Inc.", email: "contact@globaltech.com" },
  { id: "ven_2", name: "Innovate Solutions", email: "info@innovatesolutions.io" },
  { id: "ven_3", name: "Quantum Goods", email: "support@quantumgoods.com" },
];

export const mockDistributors = [
  {
    id: "dist_1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@regionaldist.com",
    phone: "123-456-7890",
    region: "North America",
    workHistory: "5 years experience in tech distribution. Strong sales record in the US and Canada.",
    trustworthiness: 85,
  },
  {
    id: "dist_2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@eurosupplies.co.uk",
    phone: "098-765-4321",
    region: "Europe",
    workHistory: "Specializes in medical device distribution across the EU. 10+ years in the field.",
    trustworthiness: 95,
  },
  {
    id: "dist_3",
    firstName: "Kenji",
    lastName: "Tanaka",
    email: "kenji.t@asiatrade.jp",
    phone: "555-123-4567",
    region: "Asia-Pacific",
    workHistory: "Focus on consumer electronics in Japan and South Korea. Excellent logistics network.",
    trustworthiness: 90,
  },
];

export const mockContracts = [
  {
    id: "cont_1",
    vendorId: "ven_1",
    vendorName: "Global Tech Inc.",
    title: "North America Distribution Agreement for Z-Phone",
    product: "Z-Phone",
    region: "North America",
    status: "Open",
    details: `This agreement grants non-exclusive rights for the distribution of the Z-Phone in the United States and Canada. The distributor must meet a minimum purchase requirement of 10,000 units per quarter. Payment terms are NET 30. The contract has a term of 2 years with an option for renewal. All brand and IP usage must be pre-approved. Confidentiality of sales data is required.`,
    summary: {
      "Exclusive/Non-Exclusive Rights": "Non-Exclusive",
      "Territory & Sales Scope": "United States and Canada for Z-Phone",
      "Pricing & Payment Terms": "NET 30",
      "Minimum Sales or Purchase Requirements": "10,000 units per quarter",
      "Intellectual Property & Brand Use": "Limited rights, pre-approval required",
      "Term, Renewal & Termination": "2-year term with renewal option",
      "Confidentiality & Non-Compete": "Confidentiality of sales data required",
    },
  },
  {
    id: "cont_2",
    vendorId: "ven_2",
    vendorName: "Innovate Solutions",
    title: "Exclusive EU Contract for InnovateHub Software",
    product: "InnovateHub Software",
    region: "Europe",
    status: "Open",
    details: `This agreement provides exclusive rights to market and sell InnovateHub Software across the European Union. There are no minimum sales requirements for the first year, but a target of 5,000 licenses in the second year. Payment is due within 60 days of invoice. The agreement is for 3 years and will auto-renew unless terminated with 90 days' notice. A non-compete clause prevents the distribution of similar project management software.`,
     summary: {
      "Exclusive/Non-Exclusive. Rights": "Exclusive",
      "Territory & Sales Scope": "European Union for InnovateHub Software",
      "Pricing & Payment Terms": "NET 60",
      "Minimum Sales or Purchase Requirements": "5,000 licenses in Year 2",
      "Intellectual Property & Brand Use": "Full rights to use trademarks for marketing",
      "Term, Renewal & Termination": "3-year term, auto-renews",
      "Confidentiality & Non-Compete": "Non-compete clause included",
    },
  },
];

export const mockApplicants = [
    {
        id: "app_1",
        distributorId: "dist_1",
        distributorName: "John Doe",
        contractId: "cont_1",
        contractTitle: "North America Distribution Agreement for Z-Phone",
        status: "Pending",
        date: "2024-07-29",
        distributorDetails: "Region: North America, Trustworthiness: 85/100, Work History: 5 years experience in tech distribution. Strong sales record in the US and Canada.",
        productInfo: "Z-Phone is a high-end smartphone targeting professionals and tech enthusiasts. Key features include a quantum-dot display and advanced security protocols.",
        companyDatabase: "Internal sales data indicates strong demand for premium smartphones in the NA region, especially on the West Coast."
    },
    {
        id: "app_2",
        distributorId: "dist_3",
        distributorName: "Kenji Tanaka",
        contractId: "cont_1",
        contractTitle: "North America Distribution Agreement for Z-Phone",
        status: "Pending",
        date: "2024-07-28",
        distributorDetails: "Region: Asia-Pacific, Trustworthiness: 90/100, Work History: Focus on consumer electronics in Japan and South Korea. Excellent logistics network. Looking to expand into NA market.",
        productInfo: "Z-Phone is a high-end smartphone targeting professionals and tech enthusiasts. Key features include a quantum-dot display and advanced security protocols.",
        companyDatabase: "Internal sales data indicates strong demand for premium smartphones in the NA region, especially on the West Coast."
    }
]

export const mockPerformanceData = [
  { name: 'John Doe', 'courses-completed': 5, 'average-score': 88 },
  { name: 'Jane Smith', 'courses-completed': 8, 'average-score': 92 },
  { name: 'Kenji Tanaka', 'courses-completed': 6, 'average-score': 85 },
  { name: 'Maria Garcia', 'courses-completed': 7, 'average-score': 95 },
  { name: 'David Lee', 'courses-completed': 4, 'average-score': 81 },
];

export const mockTrainingCourses = [
  { id: "course_1", title: "Z-Phone Sales Training", assignedBy: "Global Tech Inc.", status: "Completed", score: 95, progress: 100 },
  { id: "course_2", title: "Advanced Negotiation", assignedBy: "Global Tech Inc.", status: "In Progress", score: null, progress: 60 },
  { id: "course_3", title: "InnovateHub Technical Intro", assignedBy: "Innovate Solutions", status: "Not Started", score: null, progress: 0 },
  { id: "course_4", title: "EU Market Compliance", assignedBy: "Innovate Solutions", status: "Not Started", score: null, progress: 0 },
  { id: "course_5", title: "Logistics Management 101", assignedBy: "SynergyChain", status: "Completed", score: 88, progress: 100 },
]

export const distributorCourses = {
  "dist_1": ["course_1", "course_2", "course_5"], // John Doe
  "dist_2": ["course_3", "course_4"], // Jane Smith
  "dist_3": [], // Kenji Tanaka
}
