export default interface ISupplier {
  name: string;
  address: string;
  contactNumber: string;
  contactEmail: string;
  items: IItem[];
  methodsOfPayment?: string[]
}

interface IItem {
  itemName: string
  pricePerUnit: number;
  moq: number
}