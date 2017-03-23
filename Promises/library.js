(function(window) {
    function myLibrary() {
        //exetute code here

        var catalog = createRandomCatalog(100);


        return {
            searchID: searchID,
            searchTYPE: searchTYPE,
            searchPRICE: searchPRICE,
            searchALL: searchALL
        }

        //fnction definitions//
        //search product by id
        function searchID(id) {
            var promise = new Promise(function(resolve, reject) {
                var i = 0;
                setTimeout(function() {
                    while (i < catalog.length) {
                        if (catalog[i].id == id) {
                            resolve({
                                id: id,
                                price: catalog[i].price,
                                type: catalog[i].type
                            })
                        }
                        i++;
                    }
                    reject("Invalid ID: " + "broj");
                }, 1000);
            });
            return promise;
        };

        function searchTYPE(type) {
            var promise = new Promise(function(resolve, reject) {
                var i = 0;
                var typeArray = [];
                var posiblleTypes = ['Electronics', 'Books', 'Food', 'Clothing'];
                if (!posiblleTypes.includes(type)) {
                    reject("Invalid type: " + type);
                } else {
                    setTimeout(function() {
                        while (i < catalog.length) {
                            if (catalog[i].type == type) {
                                typeArray.push({
                                    id: catalog[i].id,
                                    price: catalog[i].price,
                                    type: catalog[i].type
                                });

                            };
                            i++;
                        }
                        resolve(typeArray);
                    }, 1000)
                }
            })
            return promise;
        };

        function searchPRICE(price, difference) {
            var promise = new Promise(function(resolve, reject) {
                var i = 0;
                var priceArray = [];
                if (!isFinite(price)) {
                    reject("Invalid Price: " + price);
                } else {
                    setTimeout(function() {
                        while (i < catalog.length) {
                            if (Math.abs(catalog[i].price - price) < difference) {
                                priceArray.push({
                                    id: catalog[i].id,
                                    price: catalog[i].price,
                                    type: catalog[i].type
                                })
                            }
                            i++;
                        }
                        resolve(priceArray)
                    }, 1000);
                }
            })
            return promise;
        };

        function searchALL() {
            var promise = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(catalog);
                }, 1000)
            });
            return promise;
        };

        function createRandomObject() {
            var typeArray = ['Electronics', 'Books', 'Food', 'Clothing'];
            var price = (Math.random() * 500).toFixed(2);
            var type = typeArray[Math.floor(Math.random() * 4)];

            return {
                price: price,
                type: type
            }
        };

        function createRandomCatalog(num) {
            var catalog = [];
            for (var i = 0; i < num; i++) {
                var obj = createRandomObject();
                catalog.push({
                    id: i,
                    price: obj.price,
                    type: obj.type
                })
            }
            return catalog;
        };


        //end of fnc definitions

    };

    if (typeof(window.api) === 'undefined') {
        window.api = myLibrary();
    }

})(window);
