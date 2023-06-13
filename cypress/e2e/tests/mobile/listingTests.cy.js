
describe('Listing Products Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(320, 480);
    });

    it('Checking Simple Information Of Products', () => {
        cy.get('#root > div > div > div:nth-child(1) > div > h1').should('have.text', 'our  products');

        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach(product => {
                cy.get('.card')
                    .find('.align-self-center.mb-0')
                    .should('contain', product.name);
                cy.get('.card')
                    .find('h5')
                    .should('contain', product.price);
            });
        });
    });

    it('Checking Specific Information Of Each Products', () => {
        cy.get('#root > div > div > div:nth-child(1) > div > h1').should('have.text', 'our  products');

        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card')
                  .eq(index)
                  .find('a')
                  .click();
                
                cy.get('#root > div > div.row > div:nth-child(2) > h2').should('contain',product.name);
                cy.get('#root > div > div.row > div:nth-child(2) > h4.text-title.text-uppercase.text-muted.mt-3.mb-2').should('contain',product.madeBy);
                cy.get('#root > div > div.row > div:nth-child(2) > h4.text-blue').should('contain',product.price);
                cy.get('#root > div > div.row > div:nth-child(2) > p.text-capitalize.font-weight-bold.mt-3.mb-0').should('have.text','some info about product');
                cy.get('#root > div > div.row > div:nth-child(2) > p.text-muted.lead').should('have.text',product.description);
                cy.wait(1000);
                cy.get('#root > div > div.row > div:nth-child(2) > div > a > button').click();
                
              });
              
        });
    });

});