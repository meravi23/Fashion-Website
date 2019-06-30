app.factory("productSrv", function($q) {

    function Product(parseProduct) {
        this.id = parseProduct.id;
        this.name = parseProduct.get("name");
        this.desc = parseProduct.get("desc");
        this.image = parseProduct.get("image")._url;
        this.discount = parseProduct.get("discount");
        this.price = parseProduct.get("price");
        this.stockQuantity = parseProduct.get("stockQuantity");
        this.categoryID = parseProduct.get("categoryID");
        this.sizes = parseProduct.get("sizes");
        this.colors = parseProduct.get("colors");
    }

    function getProductbyCategoryID(categoryID) {
        var async = $q.defer();

        var products = [];
        const ProductParse = Parse.Object.extend('Product');
        const query = new Parse.Query(ProductParse);

        query.equalTo("categoryID", categoryID);

        query.find().then((results) => {
            console.log('Product found', results);
            for (let index = 0; index < results.length; index++) {
                products.push(new Product(results[index]));
            }
            async.resolve(products);
        }, (error) => {
            console.error('Error while fetching Product', error);
            async.reject(error);
        });

        return async.promise;
    }


    function getProductbyID(productID) {
        var async = $q.defer();

        const ProductParse = Parse.Object.extend('Product');
        const query = new Parse.Query(ProductParse);

        query.get(productID).then((results) => {
            console.log('Product found', results);
            async.resolve(new Product(results));
        }, (error) => {
            console.error('Error while fetching Product', error);
            async.reject(error);
        });

        return async.promise;
    }


    return {
        getProductbyCategoryID: getProductbyCategoryID,
        getProductbyID: getProductbyID
    }

});