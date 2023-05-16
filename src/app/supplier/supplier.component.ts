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

  name = new FormControl('')
  address = new FormControl('')
  contactNumber = new FormControl('')
  contactEmail = new FormControl('')

  pricePerUnit = new FormControl('')
  moq = new FormControl('')
  item = new FormGroup({
    pricePerUnit: this.pricePerUnit,
    moq: this.moq
  })

  itemName: FormControl = new FormControl('')

  items: FormGroup = new FormGroup({
    item: this.item
  })

  methodOfPayment = new FormArray([])

  supplierForm = new FormGroup({
    name: this.name,
    address: this.address,
    contactNumber: this.contactNumber,
    contactEmail: this.contactEmail,
    // items: this.items,
    // methodOfPayment: this.methodOfPayment

  })

  constructor(public modal: ModalService, private masterlistService: MasterlistService) {
  }

  ngOnInit(): void {
    this.modal.register('supplier');
  }

  ngOnDestroy(): void {
    this.modal.unregister('supplier');
  }

  // addItem() {
  //   const newItemGroup = new FormGroup({
  //     pricePerUnit: new FormControl(''),
  //     moq: new FormControl('')
  //   })
  //
  //   this.items.setControl(this.itemName.value, newItemGroup)
  //   this.itemName.reset()
  // }

  async submitAddSupplier() {
    try {
      await this.masterlistService.createSupplier(this.supplierForm.value as ISupplier)
      location.reload()
    } catch (e) {
      console.error(e)
      return
    }
  }
}
