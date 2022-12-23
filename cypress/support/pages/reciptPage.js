export class ReciptPage {
    VerificarNombre() {
        return cy.get('#name')
    }
    VerificarCardNumber() { 
        return cy.get('#creditCard');
    }
    VerificarNombreProducto1(productos) {
        return cy.contains(productos)
    }
    VerificarNombreProducto2(productos) {
        return cy.get('#name').siblings(`[id='${productos}']`)
    }
    VerificarPrecioDeProductos() {
        return cy.get('#totalPrice')
    }
}