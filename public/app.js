var LibraryApp = angular.module('homeLibraryApp', ['ngRoute']);

    LibraryApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            hideMenus: true 
          })
          .when('/login/:loginError', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            hideMenus: true 
          })
          .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerCtrl',
            hideMenus: true 
          })
          .when('/findBook/:userId', {
            templateUrl: 'partials/findBook.html',
            controller: 'findBookCtrl',
            hideMenus: true 
          })
          .when('/mediaList/:userId', {
            templateUrl: 'partials/media-list.html',
            controller: 'MediaListCtrl'
          })
          .when('/mediaList/:userId/media-review/:mediaId/:mediaTitle', {
            templateUrl: 'partials/media-review.html',
            controller: 'MediaReviewCtrl'
          })
          .otherwise({
            redirectTo: '/login'
          });
      }]);

    LibraryApp.controller('LoginCtrl', ['$scope','AuthenticationService', '$routeParams', 
          function($scope, AuthenticationService, $routeParams) {


            $scope.login = function(){
                var result = AuthenticationService.login($scope.username, $scope.password);
            }

          $scope.loginError =  $routeParams.loginError;
          $routeParams.loginError = "";

          }])

    LibraryApp.controller('registerCtrl', ['$scope','$location', '$http', 
          function($scope, $location, $http) {


            $scope.register = function(){

                var newUser = {
                  firstName: $scope.firstName,
                  lastName: $scope.lastName,
                  username: $scope.username,
                  password: $scope.password,
                  age: $scope.age,
                  gender: $scope.gender
                }

                $http.post('api/users', newUser).success(function(){
                  $location.path('/login/' );
                })
            }

          $scope.loginError = "";

          }])

    LibraryApp.controller('findBookCtrl', ['$scope','$location', '$http', '$routeParams', '$rootScope',
          function($scope, $location, $http, $routeParams, $rootScope) {


            $scope.findBook = function(){

                $http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ $scope.submit_isbn).success(function(data){
          
                    if (data.totalItems == "0") {
                            $scope.title = "Book not found"
                    } else {

                            if (angular.isDefined(data.items[0].volumeInfo.title)) {
                              $scope.title = data.items[0].volumeInfo.title;
                            }
                            if (angular.isDefined(data.items[0].volumeInfo.authors)) {
                              $scope.author = data.items[0].volumeInfo.authors[0];
                            }
                            if (angular.isDefined(data.items[0].volumeInfo.description)) {
                              $scope.description = data.items[0].volumeInfo.description;
                            }
                            if (angular.isDefined(data.items[0].volumeInfo.averageRating)) {
                              $scope.upvotes = data.items[0].volumeInfo.averageRating;
                            }
                            if (angular.isDefined(data.items[0].volumeInfo.imageLinks.smallThumbnail)) {
                              $scope.imageURL = data.items[0].volumeInfo.imageLinks.smallThumbnail;
                            }
                            if (angular.isDefined(data.items[0].volumeInfo.categories)) {
                              $scope.genre = data.items[0].volumeInfo.categories[0];
                            }
                          }
                })
            }

            $scope.addBook = function(){

                var newBook = {
                  title: $scope.title,
                  author: $scope.author,
                  description: $scope.description,
                  upvotes: $scope.upvotes,
                  imageURL: $scope.imageURL,
                  type: "book",
                  userId: $routeParams.userId,
                  ISBN: $scope.submit_isbn,
                  genre: $scope.genre
                }

                $http.post('api/library', newBook).success(function(){
                  $location.path('/mediaList/' + $routeParams.userId);
                })

            }

          $scope.loginError = "";
          $scope.UserId = $routeParams.userId;
          $scope.firstName = $rootScope.firstName;

          if (!angular.isDefined($scope.title)) {
              $scope.title = "Book not found";
          } 

          }])
	  
    LibraryApp.controller('MediaListCtrl', ['$scope', 'MediaService', '$routeParams', '$rootScope',
          function($scope, MediaService, $routeParams, $rootScope) {


             MediaService.getUserMedia($routeParams.userId).success(function(data) {
                  $scope.mediaList = data
                 })

            $scope.incrementUpvotes = function(media) {
                   media.upvotes += 1;
               }


            $scope.deleteMedia = function(media) {
              media.state = "deleted";
              }
            
            $scope.undoDelete = function(media) {
              media.state = "normal";
              }    
            
            $scope.confirmDelete = function(index) {
                      if ($scope.mediaList[index].state == "deleted") {


                       // delete media item from database
                       MediaService.deleteMedia($scope.mediaList[index]._id).success(function() {

                            // will also need to delete user reviews
                            MediaService.getMediaReview($scope.mediaList[index].ISBN).success(function(data) {

                                    angular.forEach(data, function(review){
                                        // just delete current users reviews for book, not all reviews
                                        if(review.userId == $routeParams.userId) {
                                          MediaService.deleteMediaReview(review._id)
                                        }
                                    })

                            })
                            // remove from table now that it has being deleted
                            $scope.mediaList.splice(index, 1)       
                           })

                      }
                  } 

             $scope.orderProp = 'upvotes';
             $scope.UserId = $routeParams.userId;
             $scope.firstName = $rootScope.firstName;

          }])

	  LibraryApp.controller('MediaReviewCtrl', ['$scope', 'MediaService', '$routeParams', '$location', '$rootScope', 
         function($scope, MediaService, $routeParams, $location, $rootScope) {

/*
          $scope.incrementUpvotes = function(review){
              review.upvotes += 1;
          }
*/ 

          MediaService.getMediaReview($routeParams.mediaId).success(function(data) {

              $scope.mediaReviews = data
              /*
                  angular.forEach(data, function(review){
                            $scope.review = review
                            })
              */
          })


          $scope.addReview = function(){
   
                var newReview = {
                  userReview: $scope.enterReview,
                  title: $scope.title,
                  author: $rootScope.firstName + " " + $rootScope.lastName,
                  ISBN: $scope.ISBN,
                  userId: $routeParams.userId,
                  upvotes: 0
                }

                MediaService.addMediaReview(newReview).success(function()  {
                    $scope.userReview = "";
                    $scope.mediaReviews.push(newReview); 
//                    $location.path('/mediaList/'+ $routeParams.userId + '/media-review/' + $routeParams.mediaId + '/' + $routeParams.mediaTitle );
                })

          }



            $scope.deleteReview = function(review) {
              review.state = "deleted";
              }
            
            $scope.undoDelete = function(review) {
              review.state = "normal";
              }    
            
            $scope.confirmDelete = function(index) {

                      if ($scope.mediaReviews[index].state == "deleted") {

                       // delete media item from database
                       MediaService.deleteMediaReview($scope.mediaReviews[index]._id).success(function() {
                            // remove from table now that it has being deleted
                            $scope.mediaReviews.splice(index, 1)       
                           })

                      }
                  } 


          $scope.UserId = $routeParams.userId;
          $scope.ISBN = $routeParams.mediaId;
          $scope.title = $routeParams.mediaTitle;
          $scope.firstName = $rootScope.firstName;

      }])
	  
	  
    LibraryApp.factory('MediaService', ['$http' , function($http){
        var api = {};

        api.getUserMedia = function(userId) {
          return $http.get('api/library/' + userId)
        }

        api.deleteMedia = function(mediaId) {
          return $http.delete('api/library/' + mediaId)
        }

        api.getMediaReview = function(mediaId) {
          return $http.get('api/review/' + mediaId)
        }

        api.addMediaReview = function(newReview) {
          return $http.post('api/review', newReview)
        }

        api.deleteMediaReview = function(reviewId) {
          return $http.delete('api/review/' + reviewId)
        }

        return api
    }])

     LibraryApp.factory('AuthenticationService', ['$http', '$location', '$rootScope' , 
              function($http, $location, $rootScope){

                    var api = {

                        login : function(username, password) {
                            
                            result = null

                            $http.get('api/users/' + username).success(function(user){

//                                for (var i in data.Users) {
                                    if (user.password == password) {
                                        result = user;
                                        $rootScope.firstName = user.firstName;
                                        $rootScope.lastName = user.lastName;
                                    }
//                                }    
                                if (!(typeof(result) == "undefined" || result == null)) {
                                    $location.path('/mediaList/' + result._id);
                               } else {
                                    $location.path('/login/' + "Invalid Login Details");
                               }
                                      
                              });            
                            }
                      }
        return api
    }])   