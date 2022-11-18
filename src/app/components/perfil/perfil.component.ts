import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { Product } from 'src/app/models/product';
import { backURI } from 'src/environments/backURI';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  providers: [MdbModalService],
  queries: {
    "tabsContentRef": new ViewChild("tabsContentRef")
  },
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {

  public selectedTab: boolean = false;
  public tabsContentRef!: ElementRef; // Using "definite assignment" assertion (query).
  contPageDisenos = 0
  contPageFav = 0
  noHayDisenos: boolean = true;
  hayErrorFoto: boolean = false;
  cargarMas: boolean = false;
  cargarMasFav: boolean = false;
  noHayFav: boolean = true;
  newProducts: any[] = []
  newFavs: any[] = []
  products: any
  idUser: any
  modalRef: MdbModalRef<ModalEditComponent> | null = null;

  nombre: string = "";
  nombreObtenido: string = "";
  descripcion: string = "";
  descripcionObtenida: string = "";
  userName: any

  url: any = ''
  foto:any = ''

  product: Product[] = [
    { productName: "Sudadera", designName: "buah", price: 10, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 20, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 30, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 70, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 50, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 60, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 70, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 80, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" }
  ];

  masProducts: Product[] = [
    { productName: "Sudadera", designName: "buah", price: 10, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYHAv/EADQQAAEDAgMFBgUDBQAAAAAAAAEAAgMEEQUhMQYSQVGREyIycaHBFGFigdFjseEVIyRCUv/EABoBAQACAwEAAAAAAAAAAAAAAAADBAECBQb/xAApEQEAAgEDAgQGAwAAAAAAAAAAAQIDBBExEiEFQVFhEzJxsdHwFCI0/9oADAMBAAIRAxEAPwD3FAQEBB87wva+fJB9IME2FygA3QZQEBAQEBBgmyDkcT2olfK+GgDWMBI7U5l3kOCsVwxzZx8/iMzaa4+PVTtmqHTio7eXtQfHvG62tEbbK9L3m3Vv3XMeMVrGgGUknm0H1VeYiHWxZLWr3knqqmps2WZxZxbosJJmZbqauqKYgRvu3/l2YRmLL3D61tZG4gbr2Gzm3WEkTuloyICAgIKPa/EvgMHk3HWlm/ts+V9T09lLhp1Xc/xPU/A087cz2hwVI6+9c5Xy6K5Z57BKwiKhl0MawgHd1UFnTw8NwWicug3YNV9jXEk2Y47rkZrPd1qwmEBAQEHmW2eJ/G4vJFGbw0w7Nvzd/seuX2XQ09Omm/q8f4tqvi6iaxxXt+f32VmHkmFp+ZW1+UWmmemFkx5a3es51uDdVBZ08XdKjrmtAvHICTYAtN+gCgs6uLhNhlEoNmSNsbd9hb0utEz71Qa2DdldfS6MQ6zCqn4mkaSbvb3XeYWE1Z3hMRsICCr2kxL+lYRPUg2ktuRDm86dNfspMVOu0Qqa7Ufx8Fr+fl9XkZJNySSeJXUeE33WNCLRN69VBbl0sEf1hYxFR2X8aQyFzpGbvg1c4vsR5C3uFXs6mCe2yxjFmgclGtMHVGHyPGSgtMFqewqwwmzJe79+H4+6w3rO0ukRKICDznb/ABF1TiDKOMnsqcd7kXnXoP3Kvaam1er1eU8b1M3yxijiv3cofCrThrSmyjYOTQoJdXF2iE6LVRyuY1hTqCzpYEwaKJcYc3JBrb4z5INouLEZEHIoy6uhqPiaZkvE5O81hNE7wkIyIKDFdlaKvL5GF0EzjvFzc2uPzH4spqZ7VczU+FYc28x2n98nHYtspiNEHOZF20VvHCCbeY1HqrdM9bOBqfCc+LvEbx7fhDgbYAJLGOJTYgo5XKLCm4KC7p6dNCiXGXDJGWIaaSaS0LHOJ5cEIjdb0uCuIBqXgfSz8rDeKeq2p6eOmZuQt3R56o3iIhtRkQEGqpO7BI7kwn0WY5a3nasy8uYr8vJVSYhktJWaLCl4KC7pYEwBRLsCC12fylmH0hYb0XiJBAQEBBFxN25h1U7lC8+hW1eYRZ52xWn2l5o0K88rVJiWkrONPptQoLOjglNCiXoYOqErPATaqePo9wjenK+WEggICAgg42bYTVn9Fw9FtT5oQaqdsNvpLzoWursvMwkRELSU9JhNpTchQ2dDDO8pwUS/AdVhmVhgZ/zbc2H2RmnLoESiAgICCt2jNsEq7cWW6kLfH80Kut/z2ee7pv8Ayrm8PNxWd29gN8h6rWZhPSJTae4cLiyhsv4Z2mFiAoHRhgoPrZXEqXEqrtaKRz2Mc6JxMbm94C/EC+ozRvWNpdciQQEBAQEBAQEBAQLICAgIP//Z" },
    { productName: "Sudadera", designName: "buah", price: 60, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYHAv/EADQQAAEDAgMFBgUDBQAAAAAAAAEAAgMEEQUhMQYSQVGREyIycaHBFGFigdFjseEVIyRCUv/EABoBAQACAwEAAAAAAAAAAAAAAAADBAECBQb/xAApEQEAAgEDAgQGAwAAAAAAAAAAAQIDBBExEiEFQVFhEzJxsdHwFCI0/9oADAMBAAIRAxEAPwD3FAQEBB87wva+fJB9IME2FygA3QZQEBAQEBBgmyDkcT2olfK+GgDWMBI7U5l3kOCsVwxzZx8/iMzaa4+PVTtmqHTio7eXtQfHvG62tEbbK9L3m3Vv3XMeMVrGgGUknm0H1VeYiHWxZLWr3knqqmps2WZxZxbosJJmZbqauqKYgRvu3/l2YRmLL3D61tZG4gbr2Gzm3WEkTuloyICAgIKPa/EvgMHk3HWlm/ts+V9T09lLhp1Xc/xPU/A087cz2hwVI6+9c5Xy6K5Z57BKwiKhl0MawgHd1UFnTw8NwWicug3YNV9jXEk2Y47rkZrPd1qwmEBAQEHmW2eJ/G4vJFGbw0w7Nvzd/seuX2XQ09Omm/q8f4tqvi6iaxxXt+f32VmHkmFp+ZW1+UWmmemFkx5a3es51uDdVBZ08XdKjrmtAvHICTYAtN+gCgs6uLhNhlEoNmSNsbd9hb0utEz71Qa2DdldfS6MQ6zCqn4mkaSbvb3XeYWE1Z3hMRsICCr2kxL+lYRPUg2ktuRDm86dNfspMVOu0Qqa7Ufx8Fr+fl9XkZJNySSeJXUeE33WNCLRN69VBbl0sEf1hYxFR2X8aQyFzpGbvg1c4vsR5C3uFXs6mCe2yxjFmgclGtMHVGHyPGSgtMFqewqwwmzJe79+H4+6w3rO0ukRKICDznb/ABF1TiDKOMnsqcd7kXnXoP3Kvaam1er1eU8b1M3yxijiv3cofCrThrSmyjYOTQoJdXF2iE6LVRyuY1hTqCzpYEwaKJcYc3JBrb4z5INouLEZEHIoy6uhqPiaZkvE5O81hNE7wkIyIKDFdlaKvL5GF0EzjvFzc2uPzH4spqZ7VczU+FYc28x2n98nHYtspiNEHOZF20VvHCCbeY1HqrdM9bOBqfCc+LvEbx7fhDgbYAJLGOJTYgo5XKLCm4KC7p6dNCiXGXDJGWIaaSaS0LHOJ5cEIjdb0uCuIBqXgfSz8rDeKeq2p6eOmZuQt3R56o3iIhtRkQEGqpO7BI7kwn0WY5a3nasy8uYr8vJVSYhktJWaLCl4KC7pYEwBRLsCC12fylmH0hYb0XiJBAQEBBFxN25h1U7lC8+hW1eYRZ52xWn2l5o0K88rVJiWkrONPptQoLOjglNCiXoYOqErPATaqePo9wjenK+WEggICAgg42bYTVn9Fw9FtT5oQaqdsNvpLzoWursvMwkRELSU9JhNpTchQ2dDDO8pwUS/AdVhmVhgZ/zbc2H2RmnLoESiAgICCt2jNsEq7cWW6kLfH80Kut/z2ee7pv8Ayrm8PNxWd29gN8h6rWZhPSJTae4cLiyhsv4Z2mFiAoHRhgoPrZXEqXEqrtaKRz2Mc6JxMbm94C/EC+ozRvWNpdciQQEBAQEBAQEBAQLICAgIP//Z" },
    { productName: "Sudadera", designName: "buah", price: 70, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYHAv/EADQQAAEDAgMFBgUDBQAAAAAAAAEAAgMEEQUhMQYSQVGREyIycaHBFGFigdFjseEVIyRCUv/EABoBAQACAwEAAAAAAAAAAAAAAAADBAECBQb/xAApEQEAAgEDAgQGAwAAAAAAAAAAAQIDBBExEiEFQVFhEzJxsdHwFCI0/9oADAMBAAIRAxEAPwD3FAQEBB87wva+fJB9IME2FygA3QZQEBAQEBBgmyDkcT2olfK+GgDWMBI7U5l3kOCsVwxzZx8/iMzaa4+PVTtmqHTio7eXtQfHvG62tEbbK9L3m3Vv3XMeMVrGgGUknm0H1VeYiHWxZLWr3knqqmps2WZxZxbosJJmZbqauqKYgRvu3/l2YRmLL3D61tZG4gbr2Gzm3WEkTuloyICAgIKPa/EvgMHk3HWlm/ts+V9T09lLhp1Xc/xPU/A087cz2hwVI6+9c5Xy6K5Z57BKwiKhl0MawgHd1UFnTw8NwWicug3YNV9jXEk2Y47rkZrPd1qwmEBAQEHmW2eJ/G4vJFGbw0w7Nvzd/seuX2XQ09Omm/q8f4tqvi6iaxxXt+f32VmHkmFp+ZW1+UWmmemFkx5a3es51uDdVBZ08XdKjrmtAvHICTYAtN+gCgs6uLhNhlEoNmSNsbd9hb0utEz71Qa2DdldfS6MQ6zCqn4mkaSbvb3XeYWE1Z3hMRsICCr2kxL+lYRPUg2ktuRDm86dNfspMVOu0Qqa7Ufx8Fr+fl9XkZJNySSeJXUeE33WNCLRN69VBbl0sEf1hYxFR2X8aQyFzpGbvg1c4vsR5C3uFXs6mCe2yxjFmgclGtMHVGHyPGSgtMFqewqwwmzJe79+H4+6w3rO0ukRKICDznb/ABF1TiDKOMnsqcd7kXnXoP3Kvaam1er1eU8b1M3yxijiv3cofCrThrSmyjYOTQoJdXF2iE6LVRyuY1hTqCzpYEwaKJcYc3JBrb4z5INouLEZEHIoy6uhqPiaZkvE5O81hNE7wkIyIKDFdlaKvL5GF0EzjvFzc2uPzH4spqZ7VczU+FYc28x2n98nHYtspiNEHOZF20VvHCCbeY1HqrdM9bOBqfCc+LvEbx7fhDgbYAJLGOJTYgo5XKLCm4KC7p6dNCiXGXDJGWIaaSaS0LHOJ5cEIjdb0uCuIBqXgfSz8rDeKeq2p6eOmZuQt3R56o3iIhtRkQEGqpO7BI7kwn0WY5a3nasy8uYr8vJVSYhktJWaLCl4KC7pYEwBRLsCC12fylmH0hYb0XiJBAQEBBFxN25h1U7lC8+hW1eYRZ52xWn2l5o0K88rVJiWkrONPptQoLOjglNCiXoYOqErPATaqePo9wjenK+WEggICAgg42bYTVn9Fw9FtT5oQaqdsNvpLzoWursvMwkRELSU9JhNpTchQ2dDDO8pwUS/AdVhmVhgZ/zbc2H2RmnLoESiAgICCt2jNsEq7cWW6kLfH80Kut/z2ee7pv8Ayrm8PNxWd29gN8h6rWZhPSJTae4cLiyhsv4Z2mFiAoHRhgoPrZXEqXEqrtaKRz2Mc6JxMbm94C/EC+ozRvWNpdciQQEBAQEBAQEBAQLICAgIP//Z" },
    { productName: "Sudadera", designName: "buah", price: 80, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYHAv/EADQQAAEDAgMFBgUDBQAAAAAAAAEAAgMEEQUhMQYSQVGREyIycaHBFGFigdFjseEVIyRCUv/EABoBAQACAwEAAAAAAAAAAAAAAAADBAECBQb/xAApEQEAAgEDAgQGAwAAAAAAAAAAAQIDBBExEiEFQVFhEzJxsdHwFCI0/9oADAMBAAIRAxEAPwD3FAQEBB87wva+fJB9IME2FygA3QZQEBAQEBBgmyDkcT2olfK+GgDWMBI7U5l3kOCsVwxzZx8/iMzaa4+PVTtmqHTio7eXtQfHvG62tEbbK9L3m3Vv3XMeMVrGgGUknm0H1VeYiHWxZLWr3knqqmps2WZxZxbosJJmZbqauqKYgRvu3/l2YRmLL3D61tZG4gbr2Gzm3WEkTuloyICAgIKPa/EvgMHk3HWlm/ts+V9T09lLhp1Xc/xPU/A087cz2hwVI6+9c5Xy6K5Z57BKwiKhl0MawgHd1UFnTw8NwWicug3YNV9jXEk2Y47rkZrPd1qwmEBAQEHmW2eJ/G4vJFGbw0w7Nvzd/seuX2XQ09Omm/q8f4tqvi6iaxxXt+f32VmHkmFp+ZW1+UWmmemFkx5a3es51uDdVBZ08XdKjrmtAvHICTYAtN+gCgs6uLhNhlEoNmSNsbd9hb0utEz71Qa2DdldfS6MQ6zCqn4mkaSbvb3XeYWE1Z3hMRsICCr2kxL+lYRPUg2ktuRDm86dNfspMVOu0Qqa7Ufx8Fr+fl9XkZJNySSeJXUeE33WNCLRN69VBbl0sEf1hYxFR2X8aQyFzpGbvg1c4vsR5C3uFXs6mCe2yxjFmgclGtMHVGHyPGSgtMFqewqwwmzJe79+H4+6w3rO0ukRKICDznb/ABF1TiDKOMnsqcd7kXnXoP3Kvaam1er1eU8b1M3yxijiv3cofCrThrSmyjYOTQoJdXF2iE6LVRyuY1hTqCzpYEwaKJcYc3JBrb4z5INouLEZEHIoy6uhqPiaZkvE5O81hNE7wkIyIKDFdlaKvL5GF0EzjvFzc2uPzH4spqZ7VczU+FYc28x2n98nHYtspiNEHOZF20VvHCCbeY1HqrdM9bOBqfCc+LvEbx7fhDgbYAJLGOJTYgo5XKLCm4KC7p6dNCiXGXDJGWIaaSaS0LHOJ5cEIjdb0uCuIBqXgfSz8rDeKeq2p6eOmZuQt3R56o3iIhtRkQEGqpO7BI7kwn0WY5a3nasy8uYr8vJVSYhktJWaLCl4KC7pYEwBRLsCC12fylmH0hYb0XiJBAQEBBFxN25h1U7lC8+hW1eYRZ52xWn2l5o0K88rVJiWkrONPptQoLOjglNCiXoYOqErPATaqePo9wjenK+WEggICAgg42bYTVn9Fw9FtT5oQaqdsNvpLzoWursvMwkRELSU9JhNpTchQ2dDDO8pwUS/AdVhmVhgZ/zbc2H2RmnLoESiAgICCt2jNsEq7cWW6kLfH80Kut/z2ee7pv8Ayrm8PNxWd29gN8h6rWZhPSJTae4cLiyhsv4Z2mFiAoHRhgoPrZXEqXEqrtaKRz2Mc6JxMbm94C/EC+ozRvWNpdciQQEBAQEBAQEBAQLICAgIP//Z" }
  ];

  constructor(private modalService: MdbModalService) {
    this.selectedTab = false;
  }

  ngOnInit(): void {

    this.getInfo()
    this.getMore(false) //obtener diseños (1a pag)
    // this.getMore(true) //obtener fav (1a pag)
  }

  // ---
  // PUBLIC METHODS.
  // ---

  // I show the given tab.
  public show(tab: false | true): void {

    this.selectedTab = tab;
    // By default - the default behavior of the browser - when we change the content
    // of an overflow-container, the overflow-container doesn't change its scroll
    // offset unless it suddenly has less content than it did before. As such, when
    // the tab-content changes, we have to explicitly scroll the overflow-container
    // back to the top.
    this.scrollTabContentToTop();

  }

  getInfo(){
    //getInfo de nombreReal y descripcion   
    this.userName = localStorage.getItem('userName')
    axios.get(backURI + "users/user/" + this.userName)
        .then(response => {
          // Obtenemos los datos
          console.log(response.data);
          this.nombreObtenido = response.data.realname
          this.descripcionObtenida = response.data.description
          this.nombre = this.nombreObtenido
          this.descripcion = this.descripcionObtenida
          this.url = response.data.image
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }
  
  getMore(seleccion: boolean) {
    console.log(seleccion);
    this.idUser = localStorage.getItem('idUsuario')

    if (!seleccion) {
      //FALSE -> diseños en venta
      console.log('EN PRODUCTOS');
      
      axios.get(backURI + "perfil/" + this.idUser + "/products/" + this.contPageDisenos)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length == 0) {
            this.cargarMas = false
            if(this.newProducts.length == 0){
              this.noHayDisenos = true
            }
          } else {
            this.noHayDisenos = false
            this.cargarMas = true

          }
          this.newProducts = this.newProducts.concat(response.data)
          console.log('ESTO VAAAAAAAAAAAA');
          
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
        this.contPageDisenos ++

    } else {
      console.log('EN FAV');

      //TRUE ->favoritos 
      axios.get(backURI + "perfil/" + this.idUser + "/fav/" + this.contPageFav)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length == 0) {
            this.cargarMasFav = true
            if(this.newFavs.length == 0){
              this.noHayFav = true
            }
          } else {
            this.noHayFav = false
            this.cargarMasFav = true
          }
          this.newFavs = this.newFavs.concat(response.data)
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
        this.contPageFav++
    }
  }
  
  openModal() {
    this.modalRef = this.modalService.open(ModalEditComponent, {
      data: {nombre: this.nombre,
             descripcion: this.descripcion}
    })
    this.modalRef.onClose.subscribe((data : any) => {
      console.log("openmodal de lcos");
      if(data != undefined){
        this.nombre = data[0].nombre
        this.descripcion = data[0].descripcion
      }      
    });
  }

  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evento) => { // called once readAsDataURL is completed
        console.log(evento.target?.result);
        if(evento.target?.result != undefined){
          const formData = new FormData()
          formData.append('media', event.target.files[0])
          formData.append('key', '0000255a5921f1840e4f359f5679670c')

          axios.post('https://thumbsnap.com/api/upload', formData)
            .then(response => {
               if(response.status == 200){
                  this.hayErrorFoto = false
                  console.log('TODO HA IDO BIEN');
                  console.log(response.data.data.media);
                  this.url = response.data.data.media
                  // this.subirFoto(response.data.data.media)
                  var uName = localStorage.getItem('userName')
                  console.log(uName);
                  console.log(this.url);
                  axios.post(backURI + "users/setImage", {
                    username: uName,
                    image: this.url,
                  })
                    .then(response => {
                      console.log('Subida al back con éxito');
                      
                    })
                    .catch(e => {
                      // Capturamos los errores
                      console.log(e);
                    })
                }else{
                  //mensaje error
                  console.log('FALLO AL SUBIR FOTO');
                  this.hayErrorFoto = true
                  const myTimeout = setTimeout( () => {
                    this.hayErrorFoto = false
                    
                  }, 3000);
                }
            })
            .catch(e => {
              // Capturamos los errores
              console.log(e);
            })

         
        }

      }
    }
  }


  // ---
  // PRIVATE METHODS.
  // ---

  // I scroll the tab-content overflow-container back to the top.
  private scrollTabContentToTop(): void {
    this.tabsContentRef.nativeElement.scrollTo(0, 0);
  }

}
