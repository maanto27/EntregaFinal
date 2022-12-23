import { HomePage } from '../support/pages/homePage'
import { ProductsPage } from '../support/pages/productsPage'
import { ShoppingCartPage } from '../support/pages/shoppingCartPage'
import { CheckOutPage } from '../support/pages/checkoutPage'
import { ReciptPage } from '../support/pages/reciptPage'
const constantes = require('../support/constantes')

describe('Entrega Final', () => {
  let productosData;
  let checkoutData;
  const homePage = new HomePage ();
  const productsPage = new ProductsPage ();
  const shoppingCartPage = new ShoppingCartPage();
  const checkoutPage = new CheckOutPage();
  const reciptPage = new ReciptPage();
  const username = 'pushingit' + Math.floor(Math.random() * 1000)
  const password = '123456!'
  const gender = 'female'
  const day = '27'
  const month = '1'
  const year = '1996'
  
  before('Before', () =>{ 
    cy.fixture('productos').then(data => {
      productosData = data
    });
    cy.fixture('checkout').then(data => {
      checkoutData = data
    });
  });

  it('EntregaFinal' , () => {
    cy.request({
      method: 'POST',
      url: "https://pushing-it.onrender.com/api/register",
      body: {
          username : username,
          password: password,
          gender: gender,
          day: day ,
          month: month ,
          year: year ,

      }

    }).then((respuesta) => {
      cy.log(respuesta.body.username)
      expect(respuesta.status).is.equal(200)
      expect(respuesta.body.newUser.username).is.equal(respuesta.body.newUser.username)
    });
  
      cy.request({
          method: 'POST',
          url: 'https://pushing-it.onrender.com/api/login',
          body: {
              username: username,
              password: password
          }
      }).then((respuesta) =>{
          cy.log(respuesta.body)
          expect(respuesta.status).is.equal(200)
          expect(respuesta.body.user.createdAt.username).is.equal(respuesta.body.user.createdAt.username)
      });
      cy.request({
        url: 'https://pushing-it.onrender.com/api/login',
        method: 'POST',
        body: {
          username: 'pushingit' ,
          password: '123456!'
        }
      }).then(respuesta =>{
        window.localStorage.setItem('token', respuesta.body.token)
        window.localStorage.setItem('user', respuesta.body.user.username)
      });
    cy.visit('');
    homePage.DarleClickAlBotonOnlineShop();
    productsPage.AgregarProducto(productosData.productos.producto1.name);
    productsPage.CerrarVentanaEmergente();
    productsPage.AgregarProducto(productosData.productos.producto2.name);
    productsPage.CerrarVentanaEmergente();
    productsPage.CarritoDeCompraButton();
    shoppingCartPage.VerificarNombreProductos(productosData.productos.producto1.name).should('have.text' , productosData.productos.producto1.name);
    shoppingCartPage.VerificarNombreProductos(productosData.productos.producto2.name).should('have.text' , productosData.productos.producto2.name);
    shoppingCartPage.VerificarPrecioProductos(productosData.productos.producto1.name).should('have.text' , '$18');
    shoppingCartPage.VerificarPrecioProductos(productosData.productos.producto2.name).should('have.text' , '$30');
    shoppingCartPage.ClickShowTotalPriceButton();
    shoppingCartPage.VerificarPrecioDeLosProductos(productosData.productos.producto1.precio + productosData.productos.producto2.precio).should('have.text' , productosData.productos.producto1.precio + productosData.productos.producto2.precio);
    shoppingCartPage.ClickGoToCheckOutButton();
    checkoutPage.LlenarNombre(checkoutData.checkout.nombre);
    checkoutPage.LlenarApellido(checkoutData.checkout.apellido);
    checkoutPage.LlenarTarjeta(checkoutData.checkout.cardnumber);
    checkoutPage.DarleClickalBotonPurchase();
    reciptPage.VerificarNombre({ timeout: constantes.TIMEOUT}).should('have.text' , 'maria semprun has succesfully purchased the following items');
    reciptPage.VerificarCardNumber().should('have.text' , '1234567890123456');
    reciptPage.VerificarNombreProducto1(productosData.productos.producto1.name).should('have.text' , productosData.productos.producto1.name);
    reciptPage.VerificarNombreProducto2(productosData.productos.producto2.name).should('have.text' , productosData.productos.producto2.name);
    reciptPage.VerificarPrecioDeProductos(productosData.productos.producto1.precio + productosData.productos.producto2.precio).should('have.text' , 'You have spent $48');
  });
  after('after' , () => {
    cy.request({
      method: 'DELETE',
      url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
  }).then((respuesta) => {
      cy.log(respuesta)
      expect(respuesta.status).is.equal(200)
  });
  });
});