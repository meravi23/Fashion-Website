app.factory("shoppingCartSrv", function($q, productSrv, userSrv) {

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
    }

    function getShoppingCartPerUserID() {

        var async = $q.defer();
        var promises = [];
        var shoppingCarts = [];

        // Building a query
        var ShoppingCartParse = Parse.Object.extend('ShoppingCart');
        var query = new Parse.Query(ShoppingCartParse);
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


    function updateShoppingCartQuantity(shoppingCart) {

        var async = $q.defer();
        var promises = [];

        // Building a query
        var ShoppingCartParse = Parse.Object.extend('ShoppingCart');
        var query = new Parse.Query(ShoppingCartParse);

        query.get(shoppingCart.id).then((object) => {
            object.set('productQuantity', shoppingCart.productQuantity);
            object.save().then((response) => {
                console.log('ShoppingCart found', results);
                async.resolve(results);
            }, (error) => {
                console.error('Error while updating ShoppingCart', error);
                async.reject(error);
            });
        });
        return async.promise;
    }


    function deleteShoppingCartProduct(shoppingCart) {

        var async = $q.defer();
        var promises = [];

        // Building a query
        var ShoppingCartParse = Parse.Object.extend('ShoppingCart');
        var query = new Parse.Query(ShoppingCartParse);

        query.get(shoppingCart.id).then((object) => {
            object.destroy().then((response) => {
                console.log('Deleted ShoppingCart', response);
                async.resolve(response);
            }, (error) => {
                console.error('Error while deleting ShoppingCart', error);
                async.reject(error);
            });
        });
        return async.promise;
    }


    function addProducToShoppingCart(shoppingCart) {

        var async = $q.defer();
        var promises = [];
        var shoppingCart = {};
        // Building a query

        const ShoppingCartParse = Parse.Object.extend('ShoppingCart');
        const shoppingCartNewObject = new ShoppingCartParse();

        var ProductParse = Parse.Object.extend("Product");
        var pointerToProduct = new ProductParse();
        pointerToProduct.id = shoppingCart.productID;

        shoppingCartNewObject.set('productPrice', shoppingCart.productPrice);
        shoppingCartNewObject.set('productSize', shoppingCart.productSize);
        shoppingCartNewObject.set('productColor', shoppingCart.productColor);
        shoppingCartNewObject.set('productQuantity', shoppingCart.productQuantity);
        shoppingCartNewObject.set('userID', Parse.User.current());
        shoppingCartNewObject.set("productID", pointerToProduct);

        shoppingCartNewObject.save().then((result) => {
            shoppingCart = new ShoppingCart(result);
            async.resolve(shoppingCart);
            console.log('ShoppingCart created', result);
        }, (error) => {
            console.error('Error while creating ShoppingCart: ', error);
            async.reject(error);
        });

        return async.promise;
    }


    return {
        getShoppingCartPerUserID: getShoppingCartPerUserID,
        updateShoppingCartQuantity: updateShoppingCartQuantity,
        deleteShoppingCartProduct: deleteShoppingCartProduct,
        addProducToShoppingCart: addProducToShoppingCart
    }

});