app.factory("shoppingCartSrv", function($q, productSrv) {

    function ShoppingCart(parseShoppingCart) {
        this.id = parseShoppingCart.id;
        this.userID = parseShoppingCart.get("userID");
        this.productID = parseShoppingCart.get("productID");
        this.productQuantity = parseInt(parseShoppingCart.get("productQuantity"));
        this.productColor = parseShoppingCart.get("productColor");
        this.productSize = parseShoppingCart.get("productSize");
        this.productPrice = parseShoppingCart.get("productPrice");
        this.productImage = " ";
        this.productName = " ";
        this.productDesc = " ";
        this.linePrice = this.productPrice * this.productQuantity;
    }

    function getShoppingCartPerUserID() {

        var async = $q.defer();
        var promises = [];
        var shoppingCarts = [];

        // Building a query
        const ShoppingCartParse = Parse.Object.extend('ShoppingCart');
        const query = new Parse.Query(ShoppingCartParse);
        query.equalTo("userID", Parse.User.current());

        query.find().then((results) => {
            console.log('ShoppingCart found', results);
            for (let i = 0; i < results.length; i++) {
                shoppingCarts.push(new ShoppingCart(results[i]));
                promises.push(productSrv.getProductbyID(shoppingCarts[i].productID.id));
            }
            Promise.all(promises).then(function(results) {
                for (let i = 0; i < results.length; i++) {
                    shoppingCarts[i].productImage = results[i].image;
                    shoppingCarts[i].productName = results[i].name;
                    shoppingCarts[i].productDesc = results[i].desc;
                }
                async.resolve(shoppingCarts);
            });

        }, (error) => {
            console.error('Error while fetching ShoppingCart', error);
            async.reject(error);
        });

        return async.promise;
    }


    function updateShoppingCartQuantity(shoppingCart, quantity) {

        var async = $q.defer();
        var promises = [];
        var shoppingCarts = [];

        // Building a query
        const ShoppingCartParse = Parse.Object.extend('ShoppingCart');
        const query = new Parse.Query(ShoppingCartParse);

        query.get('shoppingCart.id').then((object) => {
            object.set('productQuantity', quantity);
            object.save().then((response) => {
                console.log('ShoppingCart found', results);
                for (let i = 0; i < shoppingCart.length; i++) {
                    if (shoppingCart[i].id === results.id) {
                        shoppingCarts[i].quantity = results[i].quantity;
                        shoppingCart[i].linePrice = shoppingCarts[i].productPrice = shoppingCarts[i].productQuantity;
                    }
                }
                async.resolve(shoppingCarts);
            });

        }, (error) => {
            console.error('Error while updating ShoppingCart', error);
            async.reject(error);
        });
        return async.promise;
    }

    return {
        getShoppingCartPerUserID: getShoppingCartPerUserID,
        updateShoppingCartQuantity: updateShoppingCartQuantity
    }

});