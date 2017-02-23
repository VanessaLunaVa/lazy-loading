import {Component} from '@angular/core';
import {LazyService} from "../service/lazy.service";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public filePath = {
    name: 'textfile',
    textfile: ''
  };

  public cedula: string = '';

  constructor(private lazyService: LazyService) {}


  public onFileChangeEvent(fileInput: any) {
    this.filePath.textfile = fileInput.target.files;
    if (this.filePath.textfile.length !== 0) {
      const texto = this.filePath.textfile[0];
      const re = /(\.txt)$/i;
      if (!re.exec(texto['name'])) {
         console.log('Formato de imagen erroneo');
      } else {
        if (texto['size'] > 50500) {
          console.log('Tamano de imagen supera el maximo permitodo (50Mb)',);
        } else {
          this.enviarArchivo(fileInput);
        }
      }
    }
  }

  public enviarArchivo(input) {
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const contenido = reader.result;

      this.lazyService.enviarArchivo(this.cedula, reader.result).subscribe(
          data  => {
              var blob = new Blob([data], { type: 'text/plain' });
              var url= window.URL.createObjectURL(blob);
              window.open(url);
          },
          error => {
            console.log(error);
          });

    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

}
