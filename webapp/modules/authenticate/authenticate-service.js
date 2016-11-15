'use strict'
creativei_app.factory('AuthService', function($http){
  return {
    get: function(){
      return $http.get('../../commons/JSONs/restaurant.json')
    }
  }
});
