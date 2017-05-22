export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/app',
      component: 'app'
    })
    .state('chat', {
      resolve: {
        userLogin: function ($state) {
          return new Promise((resolve, reject) => {
            if (sessionStorage.getItem('Login')) {
              return resolve(sessionStorage.getItem('Login'));
            }
            reject();
            $state.go('login');
          });
        }
      },
      url: '/',
      component: 'chat'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    });
}
