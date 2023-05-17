export default interface ISupplier {
  name: string;
  address: string;
  contactNumber: string;
  contactEmail: string;
  items: IItem[];
  methodsOfPayment?: string[]
}

interface IItem {
  pricePerUnit: number;
  moq: number
}