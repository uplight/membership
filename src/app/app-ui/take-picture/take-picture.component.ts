import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.css']
})
export class TakePictureComponent implements OnInit, AfterViewInit {

  @Output() onFile: EventEmitter<File> = new EventEmitter();

  static dataURLtoBlob(dataURL) {
    const ar = dataURL.split(',');
    const type = ar[0].split(';')[0].split(':')[1];
    var binary = atob(ar[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], {type});
  }



  @ViewChild('myVideo', {static: true}) set myVideo(ref: ElementRef) {
    const video: HTMLVideoElement = ref.nativeElement;
    this.video = video;
    this.video.addEventListener('canplay', (ev) => {
      this.isStreaming = true;
      this.height = video.videoHeight;
      this.width = video.videoWidth;
      this.videoResolution = video.videoWidth + 'x' + video.videoHeight;
      this.videoClass = '';
      this.isStreaming = true;
    }, false);
  }

  @ViewChild('myCanvas', {static: true}) set myCanvas(ref: ElementRef) {
    this.canvas = ref.nativeElement
  }

  videoResolution: string;
  isStreaming = false;

  imageData: string;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  width = 0;
  height = 0;

  imageClass = 'hide';
  videoClass = 'hide';

  constructor() {

  }
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(function (err) {
        alert("An error occurred! " + err);
      });
  }

  onCameraClick() {
     if (this.isStreaming) {
       var context = this.canvas.getContext('2d');
       this.canvas.width = this.width;
       this.canvas.height = this.height;
       context.drawImage(this.video, 0, 0, this.width, this.height);
       var data = this.canvas.toDataURL('image/jpeg');
       this.imageData = data;

       this.videoClass = 'hide';
       this.imageClass = '';
       this.isStreaming = false;
     } else {
       this.videoClass = '';
       this.imageClass = 'hide';
       this.isStreaming = true;
     }
  }


  onSaveClick() {
    if(!this.imageData) return;
    const blob:Blob = TakePictureComponent.dataURLtoBlob(this.imageData);
    const file: File = blob as File;
    // @ts-ignore
    file.name = 'capture';
    // @ts-ignore
    file.lastModified = Date.now();
    this.onFile.emit(file);
  }
}
