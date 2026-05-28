export type Donation = {
  date: string;
  donator: string;
  amount: string;
};

export type Expense = {
  date: string;
  made_to: string;
  amount: string;
  comments: string;
  bill_link: string;
  prescription_link: string;
};

export type DailyUpdate = {
  date: string;
  images: string[];
  videos?: string[];
  note: string;
};

// Mock data from local Kapil_Details folder
// Replace with API calls in Phase 7
export const donations: Donation[] = [
  { date: '2026-05-26', donator: 'Teena Singh', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Sushoma K', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Nupur R', amount: '7000.0' },
  { date: '2026-05-26', donator: 'Bhanu Pratap Singh', amount: '1500.0' },
  { date: '2026-05-26', donator: 'Mounika Kashik', amount: '2000.0' },
  { date: '2026-05-26', donator: 'Chintu Das', amount: '1500.0' },
  { date: '2026-05-26', donator: 'Yash Kothari', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Mayank Choudhar', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Jayadeep Nair', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Neha Nagpal', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Harsha Vardhan', amount: '200.0' },
  { date: '2026-05-26', donator: 'Soubir Bose', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Garima Juneja', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Satyam Subaprakash', amount: '500.0' },
  { date: '2026-05-26', donator: 'Kriti Sahu', amount: '1200.0' },
  { date: '2026-05-26', donator: 'Mrunal Nasery', amount: '1000.0' },
  { date: '2026-05-26', donator: 'Anika Gangotra', amount: '2000.0' },
  { date: '2026-05-26', donator: 'Niharika', amount: '1000.0' },
  { date: '2026-05-27', donator: 'Dhirendra Mathur', amount: '1100.0' },
];

export const expenses: Expense[] = [
  {
    date: '2026-05-24',
    made_to: 'My Pets Choice',
    amount: '2900.0',
    comments: '3 X-ray, ECG, CBC with liver and kidney function',
    bill_link: 'https://drive.google.com/file/d/1JyayKyviChi6PhRvz0fQSYKcU1iBnkpn/view?usp=drive_link',
    prescription_link: '1. CBC\na) https://drive.google.com/file/d/1SyoHA9IwC9LJoCBTOu_KuUH_81vR7a4X/view?usp=drive_link\nb) https://drive.google.com/file/d/1ckE7tc42SJnr7BuraVdt8pWC17xRMdci/view?usp=drive_link\n2. X-ray\na) https://drive.google.com/file/d/1ye1x7faOOTLPR9obzDKpYl28dWNRDZLu/view?usp=drive_link\nb) https://drive.google.com/file/d/1SFTDkDQNH8bHGZKfHCS_iOTfUlz_ztW4/view?usp=drive_link\nc) https://drive.google.com/file/d/1t-_mA0fJnTUYLrXtpYQl_3Abg9GSb1ae/view?usp=drive_link',
  },
  {
    date: '2026-05-24',
    made_to: 'My Pets Choice - Sadha Enterprises',
    amount: '6070.0',
    comments: 'Creatinine high and WBC high. Requires renal medication + antibiotics',
    bill_link: 'https://drive.google.com/file/d/1fJBO5xq9PJ4nzsVkzOxvCPbWafyovnGY/view?usp=drive_link',
    prescription_link: '1. https://drive.google.com/file/d/1wGXyEBl5z-oGm_qig-aaIbILXSyPwdIj/view?usp=drive_link\n2. https://drive.google.com/file/d/1GBLFke0jEvDOORWUyv9rE4JyxxH_rQig/view?usp=drive_link',
  },
  {
    date: '2026-05-27',
    made_to: 'Transport by Praana Pickup',
    amount: 'To be paid',
    comments: '',
    bill_link: '',
    prescription_link: '',
  },
  {
    date: '2026-05-27',
    made_to: 'Friends for Animals Trust - Vikas Bafna',
    amount: 'To be paid',
    comments: 'https://share.google/XEbxqK34pdCf7rDky',
    bill_link: '',
    prescription_link: '',
  },
];

// Sample daily updates from local Kapil_Photos folder
export const dailyUpdates: DailyUpdate[] = [
  {
    date: '2026-05-24',
    images: [
      '/kapil-xray1.jpg',
      '/kapil-xray2.jpg',
      '/kapil-cbc1.jpg',
      '/kapil-prescription.jpg',
    ],
    note: 'Day 1: Kapil arrived at the vet for his initial checkup. The team ran X-rays, ECG, CBC, and liver/kidney function tests. Results show some concerns that need attention.',
  },
  {
    date: '2026-05-26',
    images: [
      '/kapil-fullglory-1.jpg',
      '/kapil-fullglory-2.jpg',
    ],
    note: 'Kapil looks great in the full glory shots! Recovery is going well.',
  },
];

export function formatCurrency(amount: string): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return amount;
  return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function totalDonations(): number {
  return donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
}

export function totalExpenses(): number {
  return expenses.reduce((sum, e) => {
    const num = parseFloat(e.amount);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
}
