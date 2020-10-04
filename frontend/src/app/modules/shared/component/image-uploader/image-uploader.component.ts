import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Input() acceptableImg = '.jpg,.jpeg,.png';
  @Input() multiple = false;

  @Output() upload = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelect(e) {
    const images = [];
    const files = e.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (loadedFile) => {
        const image = new Image();
        image.onload = () => {
          this.upload.emit(image);
        };
        image.src = loadedFile.target.result as string;
        console.log(loadedFile.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
