export class ShoppingCartPage {
    constructor () {
        this.ShowTotalPriceButton = 'button[class="chakra-button css-15tuzzq"]'
        this.CheckOutButton = 'button[class="chakra-button css-17aoa8p"]'
    }

    VerificarNombreProductos(productos) {
        return cy.contains(productos);
    };

    VerificarPrecioProductos(productos) {
        return cy.get(`[name='${productos}']`).siblings('#productPrice');
    };

    ClickShowTotalPriceButton() {
        cy.get(this.ShowTotalPriceButton).click();
    };

    VerificarPrecioDeLosProductos() {
        return cy.get('#price')
    }

    ClickGoToCheckOutButton() {
        cy.get(this.CheckOutButton).click();
    }
};
