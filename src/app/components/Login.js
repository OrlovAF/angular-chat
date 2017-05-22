class LoginController {
  constructor($state) {
    'ngInject';
    this.userLogin = sessionStorage.getItem('Login');
    this.state = $state;
  }

  saveLogin() {
    sessionStorage.setItem('Login', this.userLogin);
    this.state.go('chat');
  }
}

export const Login = {
  template: require('./Login.html'),
  controller: LoginController
};
