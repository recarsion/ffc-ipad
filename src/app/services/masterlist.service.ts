import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import ISupplier from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class MasterlistService {
  supplierList: DocumentData[] = [];
  supplierDocumentList: DocumentData[] = [];

  constructor(public db: Firestore) {}

  async createSupplier(supplierData: ISupplier) {
    try {
      const addSupplierData = await addDoc(collection(this.db, 'suppliers'), {
        name: supplierData.name,
        address: supplierData.address,
        contactNumber: supplierData.contactNumber,
        contactEmail: supplierData.contactEmail,
        supplierRating: supplierData.supplierRating,
        items: supplierData.items,
        methodsOfPayment: supplierData.methodsOfPayment,
      });
      console.log('Supplier data added.'), addSupplierData;
    } catch (e) {
      console.error('Error adding data.', e);
    }
  }

  async fetchData() {
    try {
      const supplierData = await getDocs(collection(this.db, 'suppliers'));
      supplierData.forEach((doc) => {
        this.supplierList.push({ ...doc.data(), id: doc.id });
        this.supplierDocumentList.push(doc);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
