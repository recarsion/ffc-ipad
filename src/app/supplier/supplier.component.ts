import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit, OnDestroy {
  @Input() supplierModalTitle = '';

  constructor(public modal: ModalService) {}

  ngOnInit(): void {
    this.modal.register('supplier');
  }

  ngOnDestroy(): void {
    this.modal.unregister('supplier');
  }
}
