import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {
  modalData: WritableSignal<any> = signal({})
  constructor() { }
}
