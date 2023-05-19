import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { deleteDoc, doc } from '@angular/fire/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import ISupplier from '../models/supplier.model';
import { MasterlistService } from '../services/masterlist.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit, OnDestroy {
  @Input() supplierModalTitle = '';
  @Input() supplierAction = '';

  @Input() supplierName = '';
  @Input() supplierAddress = '';
  @Input() supplierNumber: number = 0;
  @Input() supplierEmail = '';
  @Input() supplierRating: number = 0;
  @Input() supplierMOP = '';
  @Input() supplierItems: any[] = [];
  @Input() supplierID = '';

  supplierForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    contactNumber: new FormControl<number | null>(null, [Validators.required]),
    contactEmail: new FormControl('', [Validators.required, Validators.email]),
    supplierRating: new FormControl<number | null>(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(5),
    ]),
    items: new FormArray([]),
    methodsOfPayment: new FormArray([]),
  });

  constructor(
    public modal: ModalService,
    public masterlistService: MasterlistService
  ) {}

  ngOnInit(): void {
    this.modal.register('supplier');
    this.getItemsControls();
  }

  ngOnDestroy(): void {
    this.modal.unregister('supplier');
  }

  getItemsControls() {
    return (this.supplierForm.get('items') as FormArray).controls;
  }

  getMethodsOfPaymentControls() {
    return (this.supplierForm.get('methodsOfPayment') as FormArray).controls;
  }

  addItem() {
    const items = this.supplierForm.get('items') as FormArray;
    const newItemGroup = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      pricePerUnit: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      moq: new FormControl('', [Validators.required, Validators.min(0)]),
    });
    items.push(newItemGroup);
  }

  addMethodOfPayment() {
    const methodsOfPayment = this.supplierForm.get(
      'methodsOfPayment'
    ) as FormArray;
    methodsOfPayment.push(new FormControl(''));
  }

  removeItem(index: number) {
    const items = this.supplierForm.get('items') as FormArray;
    items.removeAt(index);
  }

  removeMethodOfPayment(index: number) {
    const methodsOfPayment = this.supplierForm.get(
      'methodsOfPayment'
    ) as FormArray;
    methodsOfPayment.removeAt(index);
  }

  async submitAddSupplier() {
    try {
      await this.masterlistService.createSupplier(
        this.supplierForm.value as ISupplier
      );
      console.log(this.supplierForm.value);
      location.reload();
    } catch (e) {
      console.error(e);
      return;
    }
  }

  async deleteSupplier($event: Event) {
    $event.preventDefault();
    await deleteDoc(
      doc(this.masterlistService.db, 'suppliers', this.supplierID)
    );
    location.reload();
  }
}
