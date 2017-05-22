/**
 * Created by user on 22.05.17.
 */

export const scrollToBottom = function () {
  return {
    restrict: 'A',
    link: (scope, element) => {
      scope.$on('pushed', () => {
        element[0].scrollTop = element[0].scrollHeight;
      });
    }
  };
};
