export default interface ISupplier {
  name: string;
  address: string;
  contactNumber: number;
  contactEmail: string;
  supplierRating: number;
  items: IItem[];
  methodsOfPayment?: string[];
}

interface IItem {
  itemName: string;
  pricePerUnit: number;
  moq: number;
}
