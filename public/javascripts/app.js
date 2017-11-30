angular.module('ordering',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.products = [];
    $scope.cart = [];
    $scope.getAll = function() {
			return $http.get('/ordering').success(function(data){
				angular.copy(data, $scope.products);
			});
    };
    $scope.getAll();
    $scope.create = function(product) {
			console.log(product);
			return $http.post('/ordering', product).success(function(data){
				$scope.products.push(data);
			});
    };
    $scope.purchase = function() {
      console.log("In Purchase");
      angular.forEach($scope.products, function(value,key) {
        if(value.selected) {
          $scope.order(value);
          $scope.cart.push(value);
        }
      });
    }

    $scope.order = function(product) {
      return $http.put('/ordering/' + product._id + '/order')
        .success(function(data){
          console.log("order worked");
          product.orders += 1;
        });
    };

    $scope.addProduct = function() {
      var newObj = {Name:$scope.nameContent, price:$scope.priceContent, orders:0, picture:$scope.pictureContent};
      $scope.create(newObj);

      $scope.nameContent = '';
      $scope.priceContent = '';
      $scope.pictureContent = '';
	console.log(newObj);
    }

    $scope.incrementOrders = function(product) {
      $scope.order(product);
    };

    $scope.delete = function(product) {
      console.log("Deleting Name "+product.Name+" ID "+product._id);
      $http.delete('/ordering/'+product._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
