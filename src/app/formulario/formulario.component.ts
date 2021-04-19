import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario{
  nombre: string;
  correo: string;
  clave: string;

}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formularioCreado!:FormGroup;

  //la lista de usuarios registrados 
  listaUsuarios: Array<Usuario> = new Array<Usuario>();



  //determina si se desea realizar "Agregar o "Editar"
  esNuevo: boolean = true;

  posicionEdicion: number = -1;

  //inyeccion de dependencias
  constructor( private formBuilder: FormBuilder){
      
  }

  ngOnInit(): void {//llamar al metodo para crear el formulario
    this.crearFormulario();
  }

  //metodo para crear el formulario reactivo
  crearFormulario(){
    //usar: formBuilder para crear el formulario
    this.formularioCreado = this.formBuilder.group({
       nombre: ['John', Validators.required],
       correo: ['', Validators.compose([Validators.required, Validators.email])],
       clave: ['', Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  agregar(){
    //obtener los valores ingresados en los controles <input>
    //console.log(this.formularioCreado.value);
  
    //agregar al array el registro ingresado en el formulario 
    this.listaUsuarios.push(this.formularioCreado.value as Usuario);
    
    //limpiar o resetear los controles del formulario
    this.formularioCreado.reset();
    

  }

  //Editar un registro
  editar():void{

    //asignar los datos ingresados en los controles al Array<Usuario>
    this.listaUsuarios[this.posicionEdicion].nombre = this.formularioCreado.value.nombre;
    this.listaUsuarios[this.posicionEdicion].correo = this.formularioCreado.value.correo;
    this.listaUsuarios[this.posicionEdicion].clave = this.formularioCreado.value.clave;
  
    //resetear el formulario
    this.formularioCreado.reset();

    //mostrar el boton de agregar
    this.esNuevo = true;

    //cambiar la posicion del registro actual a editar
    this.posicionEdicion =-1;
  }

  editarUsuarioActual(posicion: number){
    // editar el usuario en la posicion indicada
     //this.listaUsuarios[posicion].nombre = 'Editar';
     //this.listaUsuarios[posicion].correo = 'coooo@gmail.com';
    // this.listaUsuarios[posicion].clave = '123456';

    console.log(
      this.listaUsuarios[posicion].nombre,
      this.listaUsuarios[posicion].correo,
      this.listaUsuarios[posicion].clave,
      
    );

    // utilizar el objeto "FormularioCreado", que tiene la referencia al formulario reactivo
    // y con el metodo (setValue asignar un nuevo registro
    this.formularioCreado.setValue({
      nombre: this.listaUsuarios[posicion].nombre, 
      correo: this.listaUsuarios[posicion].correo, 
      clave: this.listaUsuarios[posicion].clave
    });
   
    // asingar la posicion para editar
    this.posicionEdicion = posicion;
    
    // Ocultar el boton "Agregar" y mostrar el boton "Editar"
    this.esNuevo = false;
  }

  //eliminar usuario
  eliminarUsuarioActual(posicion: number){
    //eliminar el registro del Array
    this.listaUsuarios.splice(posicion, 1);
  }
}