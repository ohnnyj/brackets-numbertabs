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
  var Commands = brackets.getModule('command/Commands');
  var ExtensionUtils = brackets.getModule('utils/ExtensionUtils');
  var KeyBindingManager = brackets.getModule('command/KeyBindingManager');
  var MainViewManager = brackets.getModule('view/MainViewManager');
  
  function setDocument(index, active) {
    var workingSet = MainViewManager.getWorkingSet();
    
    if(!active) {
      // TODO: what do we do if there are > 2 panes...
      var fullWorkingSet = MainViewManager.getWorkingSet(MainViewManager.ALL_PANES);
      var fileCount = fullWorkingSet.length - workingSet.length;

      if(fileCount <= index) { return; }
      
      var paneId = MainViewManager.getActivePaneId();
      var paneIds = MainViewManager.getPaneIdList();
      var length = paneIds.length;
      
      if(length < 2) { return; }
      
      for(var i = 0; i < length; ++i) {
        if(paneIds[i] !== paneId) {
          paneId = paneIds[i];
          break;
        }
      }
      
      MainViewManager.setActivePaneId(paneId);
      
      workingSet = MainViewManager.getWorkingSet();
    }
    
    if(workingSet && workingSet.length > index) {
      var file = workingSet[index];
      
      if(file) {
        CommandManager.execute(Commands.CMD_OPEN, {fullPath: file.fullPath});
      }
    }
  }
  
  function cb(index, active) {
    return function() {
      setDocument(index, active);
    };
  }
  
  var id = 'ohnnyj.numbertabs.';
  
  function bindActivePane(i) {
    var key = [{
      key: 'Ctrl-' + i
    }, {
      key: 'Cmd-' + i,
      platform: 'mac'
    }];
    var _id = id + 'active.' + i;

    CommandManager.register('Tab ' + i, _id, cb(i === 0 ? 9 : i - 1, true));
    KeyBindingManager.addBinding(_id, key);
  }
  
  function bindInactivePane(i) {
    var key = [{
      key: 'Alt-Ctrl-' + i
    }, {
      key: 'Opt-Cmd-' + i,
      platform: 'mac'
    }];
    var _id = id + 'inactive.' + i;

    CommandManager.register('Inactive Pane Tab ' + i, _id, cb(i === 0 ? 9 : i - 1, false));
    KeyBindingManager.addBinding(_id, key);
  }
  
  function bind() {
    for(var i = 0; i <= 9; ++i) {
      bindActivePane(i);
      bindInactivePane(i);
    }
  }
  
  AppInit.appReady(function () {
    ExtensionUtils.loadStyleSheet(module, 'res/style/numbertabs.less');
    bind();
  });
});
