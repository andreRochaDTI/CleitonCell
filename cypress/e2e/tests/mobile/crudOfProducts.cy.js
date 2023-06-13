
describe('CRUD of Products To Cart', () => {

    beforeEach(() => {
        cy.on('window:confirm', () => true);
        cy.visit('http://localhost:3000');
        cy.viewport(320, 480);
    });

    it('Checking add To Card Buttow in Image', () => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
            });
        });
    });

    it('Checking add Products Each Time To Cart - Simple Quantity', () => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
                cy.get('.cart-btn').eq(index).click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();
            });

            cy.get('#root > nav > a.ml-auto > button').click();
            let sumPrice = 0;
            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });
            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            })
        });
    });

    it('Checking add Products Each Time To Cart - Simple Quantity', () => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
                cy.get('.cart-btn').eq(index).click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();

                cy.get('#root > nav > a.ml-auto > button').click();
                let sumPrice = 0;
                cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                    // Ação a ser executada para cada elemento

                    cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                        cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                            // Ação a ser executada com o texto do elemento $itemPrice
                            // Por exemplo, realizar asserções ou trabalhar com o texto
                            cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                            cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                                cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                    cy.log(itemQuantityText);
                                    cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                        expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                        sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                    });
                                });
                            });
                        });
                    });
                });
                cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong')
                    .invoke('text')
                    .then(subtotalItens => {
                        expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                        cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong')
                            .invoke('text')
                            .then(taxValue => {
                                expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10);
                                cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong')
                                    .invoke('text')
                                    .then(totalValueOfPurchase => {
                                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(
                                            parseFloat(sumPrice) + parseFloat(subtotalItens) / 10
                                        );
                                    });
                            });
                    });


                cy.get('#root > section > div.container > div > div > a:nth-child(1) > button').click();

            });

        });
    });

    it('Checking add Products Each Time To Cart - Simple Quantity - Add using specify Button', () => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('#root > div > div > div:nth-child(2) > div > div > div.img-container.p-5 > a').eq(index).click();

                cy.get('#root > div > div.row > div:nth-child(2) > h2').should('contain', product.name);
                cy.get('#root > div > div.row > div:nth-child(2) > h4.text-blue > strong').should('contain', ((product.price).replace(/(\$)(\d+)/, "$ $2")).replace(/ /g, ""));
                cy.get('#root > div > div.row > div:nth-child(2) > p.text-muted.lead').should('have.text', product.description);
                cy.get('#root > div > div.row > div:nth-child(2) > div > button').click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();
            });

            cy.get('#root > nav > a.ml-auto > button').click();
            let sumPrice = 0;
            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });
            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            })
        });
    });

    it('Checking add Products Each Time To Cart - Multiple Quantities', () => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
                cy.get('.cart-btn').eq(index).click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();
            });

            cy.get('#root > nav > a.ml-auto > button').click();
            let sumPrice = 0;

            cy.fixture('products/cartTestScenarios.json').then(cartTestsScenarios => {
                cartTestsScenarios.multipleQuantitiesOfItems.forEach((productCartItem, index) => {
                    cy.get('#root > section > div:nth-child(3) > div > div:nth-child(2)').eq(index).should('contain.text', productCartItem.name);
                    cy.get(':nth-child(3) > .row > :nth-child(3)').eq(index).should('contain.text', productCartItem.price);
                    cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(2)').eq(index).should('have.text', "1");
                    for (let i = 0; i < productCartItem.quantity - 1; i++) {
                        cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(3)').eq(index).click();
                    }
                    cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(2)').eq(index).should('have.text', (productCartItem.quantity).toString());
                });
            });
            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });
            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            })
        });
    });

    it('Deleting Items from cart - Multiple Quantities', () => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
                cy.get('.cart-btn').eq(index).click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();
            });

            cy.get('#root > nav > a.ml-auto > button').click();
            let sumPrice = 0;

            cy.fixture('products/cartTestScenarios.json').then(cartTestsScenarios => {
                cartTestsScenarios.multipleQuantitiesOfItems.forEach((productCartItem, index) => {
                    cy.get('#root > section > div:nth-child(3) > div > div:nth-child(2)').eq(index).should('contain.text', productCartItem.name);
                    cy.get(':nth-child(3) > .row > :nth-child(3)').eq(index).should('contain.text', productCartItem.price);
                    cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(2)').eq(index).should('have.text', "1");
                    for (let i = 0; i < productCartItem.quantity - 1; i++) {
                        cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(3)').eq(index).click();
                    }
                    cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(2)').eq(index).should('have.text', (productCartItem.quantity).toString());
                });
            });
            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });
            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            });
            cy.fixture('products/cartTestScenarios.json').then(cartTestsScenarios => {
                sumPrice = 0;
                cartTestsScenarios.deleteItemsFromCart.forEach((productCartItem, index) => {
                    cy.get('#root > section > div:nth-child(3) > div > div:nth-child(2)').eq(index).invoke('text').then(productName => {
                        if (productName.includes(productCartItem.name)) {
                            cy.get('#root > section > div:nth-child(3) > div > div:nth-child(5) > div > i').eq(index).click();
                        }
                    });
                });


            });

            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });

            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            });

        });
    });

    it('Cleaning cart', () => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
                cy.get('.cart-btn').eq(index).click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();
            });

            cy.get('#root > nav > a.ml-auto > button').click();
            let sumPrice = 0;
            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });
            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            })
        });

        cy.get('#root > section > div.container > div > div > a:nth-child(1) > button').click();
        cy.get('#root > nav > a.ml-auto > button').click();
        cy.get('#root > section > div > div > div > h1').should('have.text', 'Your cart is currently empty');
    });

    it('Check Required Fields on Payment',() => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
                cy.get('.cart-btn').eq(index).click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();
            });

            cy.get('#root > nav > a.ml-auto > button').click();
            let sumPrice = 0;

            cy.fixture('products/cartTestScenarios.json').then(cartTestsScenarios => {
                cartTestsScenarios.multipleQuantitiesOfItems.forEach((productCartItem, index) => {
                    cy.get('#root > section > div:nth-child(3) > div > div:nth-child(2)').eq(index).should('contain.text', productCartItem.name);
                    cy.get(':nth-child(3) > .row > :nth-child(3)').eq(index).should('contain.text', productCartItem.price);
                    cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(2)').eq(index).should('have.text', "1");
                });
            });
            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });
            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            })
        });

        cy.get('#root > section > div.container > div > div > a:nth-child(5) > button').click();
        cy.get('#root > div > div.row > div > h1').should('have.text','Payment Screen');
        cy.get('#root > div > div:nth-child(2) > button').click();
        cy.get('#root > div > div:nth-child(2) > p').should('have.text','Please fill in all fields.');
        cy.get('#cardNumber').type('123456789123');
        cy.get('#root > div > div:nth-child(2) > button').click();
        cy.get('#root > div > div:nth-child(2) > p').should('have.text','Please fill in all fields.');
        cy.get('#cardOwner').type('DONO DO TESTE 123');
        cy.get('#root > div > div:nth-child(2) > p').should('have.text','Please fill in all fields.');

    });

    it('Payment Test of Products',() => {
        cy.fixture('products/products.json').then(products => {
            products.availableProducts.forEach((product, index) => {
                cy.get('.card > .img-container > a > .card-img-top').eq(index).realHover();
                cy.wait(1000);
                cy.get('.cart-btn').eq(index).should('be.visible');
                cy.get('.cart-btn').eq(index).click();
                cy.get('#modal > h5:nth-child(1)').should('have.text', 'item added to the cart');
                cy.get('#modal > h5:nth-child(3)').should('have.text', product.name);
                cy.get('#modal > h5.text-muted').should('contain', (product.price).replace(/(\$)(\d+)/, "$ $2"));
                cy.get('#modal > a:nth-child(5) > button').click();
            });

            cy.get('#root > nav > a.ml-auto > button').click();
            let sumPrice = 0;

            cy.fixture('products/cartTestScenarios.json').then(cartTestsScenarios => {
                cartTestsScenarios.multipleQuantitiesOfItems.forEach((productCartItem, index) => {
                    cy.get('#root > section > div:nth-child(3) > div > div:nth-child(2)').eq(index).should('contain.text', productCartItem.name);
                    cy.get(':nth-child(3) > .row > :nth-child(3)').eq(index).should('contain.text', productCartItem.price);
                    cy.get('#root > section > div:nth-child(3) > div > div.col-10.mx-auto.col-lg-2.my-2.my-lg-2-0 > div > div > span:nth-child(2)').eq(index).should('have.text', "1");
                });
            });
            cy.get('#root > section > div:nth-child(3) > div').each(($item) => {
                // Ação a ser executada para cada elemento

                cy.wrap($item).find('div:nth-child(3)').then($itemPrice => {
                    cy.wrap($itemPrice).invoke('text').then((itemPriceText) => {
                        // Ação a ser executada com o texto do elemento $itemPrice
                        // Por exemplo, realizar asserções ou trabalhar com o texto
                        cy.log(itemPriceText.replace(/\D/g, "")); // Exemplo de exibição do texto no console do Cypress
                        cy.wrap($item).find('span:nth-child(2)').then($itemQuantity => {
                            cy.wrap($itemQuantity).invoke('text').then(itemQuantityText => {
                                cy.log(itemQuantityText);
                                cy.wrap($item).find('strong').invoke('text').then(finalItemPrice => {
                                    expect(parseInt(finalItemPrice.replace(/\D/g, ""))).to.be.equal(parseInt(itemPriceText.replace(/\D/g, "")) * parseInt(itemQuantityText.replace(/\D/g, "")))
                                    sumPrice += parseInt(finalItemPrice.replace(/\D/g, ""));
                                });
                            });
                        });
                    });
                });
            });
            cy.get('#root > section > div.container > div > div > h5:nth-child(2) > strong').invoke('text').then(subtotalItens => {
                expect(parseInt(subtotalItens)).to.be.equal(sumPrice);
                cy.get('#root > section > div.container > div > div > h5:nth-child(3) > strong').invoke('text').then(taxValue => {
                    expect(parseFloat(taxValue)).to.be.equal(parseFloat(subtotalItens) / 10)
                    cy.get('#root > section > div.container > div > div > h5:nth-child(4) > strong').invoke('text').then(totalValueOfPurchase => {
                        expect(parseFloat(totalValueOfPurchase)).to.be.equal(parseFloat(sumPrice) + (parseFloat(subtotalItens) / 10));
                    });
                });
            })
        });

        cy.get('#root > section > div.container > div > div > a:nth-child(5) > button').click();
        cy.get('#root > div > div.row > div > h1').should('have.text','Payment Screen');
        cy.get('#cardNumber').type('123456789123');
        cy.get('#cardOwner').type('DONO DO TESTE 123');
        cy.get('#cardExpiration').type('12/26');
        cy.get('#root > div > div:nth-child(2) > button').click();
        cy.get('#root > div > div:nth-child(2) > p').should('have.text','Purchase completed successfully.');
    });
});