/*!
 * Brackets Number Tabs Extension
 *
 * @author John Smith
 * @license http://opensource.org/licenses/MIT
 */


/*jslint vars: true, plusplus: true, nomen: true, regexp: true, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
  'use strict';

  var AppInit = brackets.getModule('utils/AppInit');
  var CommandManager = brackets.getModule('command/CommandManager');
  var DocumentManager = brackets.getModule('document/DocumentManager');
  var ExtensionUtils = brackets.getModule('utils/ExtensionUtils');
  var KeyBindingManager = brackets.getModule('command/KeyBindingManager');
  var MainViewManager = brackets.getModule('view/MainViewManager');
  
  function setDocument(index) {
    var workingSet = MainViewManager.getWorkingSet();

    if(workingSet && workingSet.length > index) {
      var file = workingSet[index];
      
      if(file) {
        DocumentManager.getDocumentForPath(file.fullPath)
          .done(function (doc) {
            DocumentManager.setCurrentDocument(doc);
          })
          .fail(function() {
            console.error(arguments);
          });
      }
    }
  }
  
  function cb(index) {
    return function() {
      setDocument(index);
    };
  }
  
  function bind() {
    var id = 'ohnnyj.numbertabs.';

    for(var i = 1; i <= 9; ++i) {
      var key = 'Cmd-' + i;
      var _id = id + i;

      CommandManager.register('Tab ' + i, _id, cb(i - 1));
      KeyBindingManager.addBinding(_id, key);
    }
  }
  
  AppInit.appReady(function () {
    ExtensionUtils.loadStyleSheet(module, 'res/style/numbertabs.less');
    bind();
  });
});
