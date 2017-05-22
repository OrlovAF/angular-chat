import angular from 'angular';
import 'todomvc-app-css/index.css';
import {TodoService} from './app/todos/todos';
import {App} from './app/containers/App';
import {Chat} from './app/components/Chat';
import {Login} from './app/components/Login';
import {Header} from './app/components/Header';
import {MainSection} from './app/components/MainSection';
import {TodoTextInput} from './app/components/TodoTextInput';
import {TodoItem} from './app/components/TodoItem';
import {Footer} from './app/components/Footer';
import 'angular-ui-router';
import routesConfig from './routes';
import 'pubnub-angular';
import 'restangular';
import './index.css';
import {scrollToBottom} from './app/directives/scrollToBottom';

angular
  .module('app', ['ui.router', 'pubnub.angular.service', 'restangular'])
  .config(routesConfig)
  .service('todoService', TodoService)
  .component('app', App)
  .component('chat', Chat)
  .component('login', Login)
  .component('headerComponent', Header)
  .component('footerComponent', Footer)
  .component('mainSection', MainSection)
  .component('todoTextInput', TodoTextInput)
  .component('todoItem', TodoItem)
  .directive('appScrollToBottom', scrollToBottom)
;
