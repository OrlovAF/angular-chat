import _ from 'lodash';

class ChatController {
  constructor(Pubnub, Restangular, $scope) {
    'ngInject';
    const self = this;
    self.userLogin = sessionStorage.getItem('Login');
    self.$scope = $scope;
    self.$scope.messages = [];
    this.rest = Restangular.withConfig(RestangularConfigurer => {
      RestangularConfigurer
      // .setDefaultHttpFields({timeout: 5000})
        .setBaseUrl('http://localhost:3000')
        .setDefaultHeaders({'Content-Type': 'application/json'})
        .addResponseInterceptor( (data, operation, what, url, response, deferred) => {
          if (response.status === 200) {
            return deferred.resolve(response.data || {
                status: response.status,
                statusText: response.statusText
              });
          }

          return deferred.reject(response);
        });
    });
    this.uuid = _.random(100).toString();
    this.channel = 'messages-channel';
    this.rest
      .one('message.json')
      .get()
      .then(response => {
        this.randomMessages = response;
      })
      .catch(err => {
        console.log(err);
      });

    Pubnub.init({
      publish_key: 'pub-c-f0d315e9-6546-4388-a1c4-b0fd9e6b95f6',
      subscribe_key: 'sub-c-93553b18-3c9e-11e7-a8ad-0619f8945a4f',
      uuid: this.uuid
    });

    Pubnub.subscribe({
      channels: [this.channel],
      triggerEvents: true
    });

    this.sendBotMessage();
    this.Pubnub = Pubnub;
    this.messages = [];
    this.Pubnub.addListener({
      message: response => {
        self.applyMessages(response.message);
      }
    });
  }

  sendMessage(message) {
    if (!message) {
      return;
    }
    this.Pubnub.publish({
        channel: this.channel,
        message: {
          content: message,
          sender_uuid: this.uuid,
          date: new Date(),
          name: this.userLogin
        }
      },
      (status, res) => {
      console.log(res, status);
        //self.messages.push(this.messageContent);
      });
    this.messageContent = '';
  }

  sendBotMessage() {
    const self = this;
    const getRandomArbitrary = (min, max) => {
      return Math.round(Math.random() * (max - min) + min);
    };

    if (!self.timer) {
      self.timer = setInterval(() => {
        if (self.randomMessages) {
          const randomMessage = self.randomMessages[getRandomArbitrary(0, 2)] || {};

          if (randomMessage && randomMessage.message) {
            self.applyMessages(
              {
                content: randomMessage.message,
                sender_uuid: randomMessage.uuid,
                date: new Date(),
                name: randomMessage.name
              }
            );
          }
        }
      }, 5000);
    }
  }

  applyMessages(data) {
    const self = this;
    self.$scope.$apply(() => {
      self.$scope.messages.push(data);
    });
    self.$scope.$broadcast('pushed');
  }
}

export const Chat = {
  template: require('./Chat.html'),
  controller: ChatController
};
