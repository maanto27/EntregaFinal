export class CheckOutPage {
    constructor () {
        this.llenarcampodenombre = '#FirstName'
        this.llenarcampodeapellido = '#lastName'
        this.llenarcampodetarjeta = '#cardNumber'
        this.darleclickalbotonpurchase = "button[class='chakra-button css-13zsa']"
    }
    LlenarNombre(checkout) {
        cy.get(this.llenarcampodenombre).type(checkout)
    }
    LlenarApellido(checkout) {
        cy.get(this.llenarcampodeapellido).type(checkout)
    }
    LlenarTarjeta(checkout) {
        cy.get(this.llenarcampodetarjeta).type(checkout)
    }
    DarleClickalBotonPurchase () {
        cy.get(this.darleclickalbotonpurchase).click()
    }
}