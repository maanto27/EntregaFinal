export class ProductsPage {
    constructor () {
        this.cerrarventanaemergente = '#closeModal'
        this.carritodecomprabutton = '#goShoppingCart'
    }

    AgregarProducto(productos) {
        cy.get(`[value = "${productos}"]`).click()
    }
    CerrarVentanaEmergente() {
        cy.get(this.cerrarventanaemergente).click()
    };
    CarritoDeCompraButton() {
        cy.get(this.carritodecomprabutton).click()
    };
};