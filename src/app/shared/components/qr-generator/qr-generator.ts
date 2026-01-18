import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
@Component({
  standalone: true,
  selector: 'app-qr-generator',
  imports: [QRCodeComponent],
  templateUrl: './qr-generator.html',
})
export class QrGenerator {
  @Input() code: string = '';
  @Output() clearQrcode = new EventEmitter<void>();

  @ViewChild('wrapper', { static: false }) wrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('qrcode', { static: false }) qrcodeComp!: QRCodeComponent;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['code'] && this.code) {
      setTimeout(() => this.download(), 100);
    }
  }

  private download() {
    const canvas = this.wrapper.nativeElement.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();

    this.clearQrcode.emit();
  }
}
