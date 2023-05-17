import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MasterlistService} from "../services/masterlist.service";
import ISupplier from "../models/supplier.model";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit, OnDestroy {
  @Input() supplierModalTitle = '';
  @Input() supplierAction = '';

  @Input() supplierName = ''
  @Input() supplierAddress = ''
  @Input() supplierNumber = ''
  @Input() supplierEmail = ''
  @Input() supplierMOP = ''

  supplierForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    contactNumber: new FormControl(''),
    contactEmail: new FormControl(''),
    items: new FormGroup({
      item: new FormGroup({
        pricePerUnit: new FormControl(''),
        moq: new FormControl('')
      })
    }),
    methodsOfPayment: new FormArray([])

  })


  constructor(
    public modal: ModalService,
    public masterlistService: MasterlistService
  ) {
  }

  ngOnInit(): void {
    this.modal.register('supplier');

  }

  ngOnDestroy(): void {
    this.modal.unregister('supplier');
  }

  getMethodsOfPaymentControls() {
    return (this.supplierForm.get('methodsOfPayment') as FormArray).controls;
  }

  addItem() {
    const items = this.supplierForm.get('items') as FormGroup;
    const newItemGroup = new FormGroup({
      pricePerUnit: new FormControl(''),
      moq: new FormControl('')
    })
    items.addControl('item' + Object.keys(items.controls).length, newItemGroup)
  }

  addMethodOfPayment() {
    const methodsOfPayment = this.supplierForm.get('methodsOfPayment') as FormArray;
    methodsOfPayment.push(new FormControl(''))
  }

  removeItem(key: string) {
    const items = this.supplierForm.get('items') as FormGroup;
    items.removeControl(key)
  }

  async submitAddSupplier() {
    try {
      await this.masterlistService.createSupplier(this.supplierForm.value as ISupplier)
      console.log(this.supplierForm.value)
      location.reload()
    } catch (e) {
      console.error(e)
      return
    }
  }

  async deleteSupplier($event: Event) {
    $event.preventDefault();
    console.log('deleteSupplier called')
  }

}
