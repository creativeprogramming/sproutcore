// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


/*global module test htmlbody ok equals same stop start */

module("SC.AlertPane UI", {
  setup: function(){
    SC.TestDelegate = SC.Object.create();
  },
  teardown: function(){
    delete SC.TestDelegate;
  }
});

var pane ;

function evaluatePane(pane, message, description, caption, button1Title, button2Title, button3Title, iconClass, themeName,
    button1ToolTip, button2ToolTip, button3ToolTip, button1LayerId, button2LayerId, button3LayerId, defaultButton, cancelButton,
    localizeButton1, localizeButton2, localizeButton3) {
  // wrapper
  ok(pane.get('isVisibleInWindow'), 'pane.isVisibleInWindow should be YES');
  ok(pane.$().hasClass('sc-alert'), 'pane should have sc-alert class');
  ok(pane.childViews[0].get('isVisibleInWindow'), 'pane.div.isVisibleInWindow should be YES');
  ok(pane.childViews[0].$().hasClass('sc-view'), 'pane.div should have sc-view class');
  ok(pane.childViews[0].childViews[0].get('isVisibleInWindow'), 'pane.div.info.isVisibleInWindow should be YES');
  ok(pane.childViews[0].childViews[0].$().hasClass('info'), 'pane.div.info should have info class');
  ok(pane.childViews[0].childViews[1].get('isVisibleInWindow'), 'pane.div.div.isVisibleInWindow should be YES');

  // content
  ok(pane.childViews[0].childViews[0].$('img'), 'pane.div.info.img existence should be YES');
  ok(pane.childViews[0].childViews[0].$('img').hasClass('icon'), 'pane.div.info.img should have icon class');
  ok(pane.childViews[0].childViews[0].$('img').hasClass(iconClass), 'pane.div.info.img should have %@ class'.fmt(iconClass));
  ok(pane.childViews[0].childViews[0].$('h1'), 'pane.div.info.h1 existence should be YES');
  equals(pane.childViews[0].childViews[0].$('h1').text(), 'AlertPane.message', 'pane.div.info.h1 should have title');

  if (description) {
    ok(pane.childViews[0].childViews[0].$('p.description'), 'pane.div.info.description existence should be YES');
    equals(pane.childViews[0].childViews[0].$('p.description').text(), 'AlertPane.description', 'pane.div.info.description should have description');
  } else {
    equals(pane.childViews[0].childViews[0].$('p.description').length, 0, 'pane.div.info should have 0 description');
  }

  if (caption) {
    ok(pane.childViews[0].childViews[0].$('p.caption'), 'pane.div.info.caption existence should be YES');
    equals(pane.childViews[0].childViews[0].$('p.caption').text(), 'AlertPane.caption', 'pane.div.info.caption should have caption');
  } else {
    equals(pane.childViews[0].childViews[0].$('p.caption').length, 0, 'pane.div.info should have 0 caption');
  }

  // buttons
  ok(pane.childViews[0].childViews[1].$('div'), 'pane.div.div.div existence should be YES');
  equals(pane.childViews[0].childViews[1].$('div.button').length, 2, 'pane.div.div should have 2 Buttons');
  ok(pane.childViews[0].$('div'), 'pane.div.div existence should be YES');

  var button1 = pane.childViews[0].childViews[1].childViews[1];
  var button2 = pane.childViews[0].childViews[1].childViews[0];
  var button3 = pane.childViews[0].childViews[2].childViews[0];

  if (button1Title) {
    equals(button1.$('label').text(), button1Title, 'pane.div.div button1 should have custom title %@'.fmt(button1Title));
  } else {
    equals(button1.$('label').text(), 'OK', 'pane.div.div button1 should have default title OK');
  }
  if (button2Title) {
    equals(button2.$('label').text(), button2Title, 'pane.div.div button2 should have custom title %@'.fmt(button2Title));
  } else {
    ok(button2.$().hasClass('sc-hidden'), 'pane.div.div button2 should be hidden');
  }
  if (button3Title) {
    equals(button3.$('label').text(), button3Title, 'pane.div button3 should have custom title %@'.fmt(button3Title));
  } else {
    ok(button3.$().hasClass('sc-hidden'), 'pane.div button3 should be hidden');
  }

  if (localizeButton1) {
    ok(button1.get('localize'), "button1 is set to localize.");
  }
  if (localizeButton2) {
    ok(button2.get('localize'), "button2 is set to localize.");
  }
  if (localizeButton3) {
    ok(button3.get('localize'), "button3 is set to localize.");
  }

  if (button1ToolTip) {
    equals(button1.$('label').prop('title'), button1ToolTip, 'pane.div.div button1 should have custom toolTip %@'.fmt(button1ToolTip));
  } else {
    equals(button1.$('label').prop('title'), '', 'pane.div.div button1 should have default toolTip BLANK');
  }
  if (button2ToolTip) {
    equals(button2.$('label').prop('title'), button2ToolTip, 'pane.div.div button2 should have custom toolTip %@'.fmt(button2ToolTip));
  } else {
    equals(button2.$('label').prop('title'), '', 'pane.div.div button2 should have default toolTip BLANK');
  }
  if (button3ToolTip) {
    equals(button3.$('label').prop('title'), button3ToolTip, 'pane.div.div button3 should have custom toolTip %@'.fmt(button3ToolTip));
  } else {
    equals(button3.$('label').prop('title'), '', 'pane.div.div button3 should have default toolTip BLANK');
  }

  if (button1LayerId) {
    equals(button1.$().prop('id'), button1LayerId, 'pane.div.div button1 should have custom layerId %@'.fmt(button1LayerId));
  } else {
    ok(button1.$().prop('id').indexOf('sc') === 0, 'pane.div.div button1 should have default layerId');
  }
  if (button2LayerId) {
    equals(button2.$().prop('id'), button2LayerId, 'pane.div.div button2 should have custom layerId %@'.fmt(button2LayerId));
  } else {
    ok(button2.$().prop('id').indexOf('sc') === 0, 'pane.div.div button2 should have default layerId');
  }
  if (button3LayerId) {
    equals(button3.$().prop('id'), button3LayerId, 'pane.div.div button3 should have custom layerId %@'.fmt(button3LayerId));
  } else {
    ok(button3.$().prop('id').indexOf('sc') === 0, 'pane.div.div button3 should have default layerId');
  }

  if (defaultButton == null) defaultButton = 1;
  if (defaultButton === 1) {
    ok(button1.$().hasClass('def'), 'pane.div.div button1 should be default');
  } else {
    ok(!button1.$().hasClass('def'), 'pane.div.div button1 should not be default');
  }
  if (defaultButton === 2) {
    ok(button2.$().hasClass('def'), 'pane.div.div button2 should be default');
  } else {
    ok(!button2.$().hasClass('def'), 'pane.div.div button2 should not be default');
  }
  if (defaultButton === 3) {
    ok(button3.$().hasClass('def'), 'pane.div.div button3 should be default');
  } else {
    ok(!button3.$().hasClass('def'), 'pane.div.div button3 should not be default');
  }

  if (cancelButton == null) cancelButton = 2;
  if (cancelButton === 1) {
    ok(button1.$().hasClass('cancel'), 'pane.div.div button1 should be cancel');
  } else {
    ok(!button1.$().hasClass('cancel'), 'pane.div.div button1 should not be cancel');
  }
  if (cancelButton === 2) {
    ok(button2.$().hasClass('cancel'), 'pane.div.div button2 should be cancel');
  } else {
    ok(!button2.$().hasClass('cancel'), 'pane.div.div button2 should not be cancel');
  }
  if (cancelButton === 3) {
    ok(button3.$().hasClass('cancel'), 'pane.div.div button3 should be cancel');
  } else {
    ok(!button3.$().hasClass('cancel'), 'pane.div.div button3 should not be cancel');
  }

  if (!themeName) themeName = 'capsule';
  ok(button1.$().hasClass(themeName), 'pane.div.div button1 should have class ' + themeName);
  ok(button2.$().hasClass(themeName), 'pane.div.div button2 should have class ' + themeName);
  ok(button3.$().hasClass(themeName), 'pane.div.div button3 should have class ' + themeName);
}

test("AlertPane.show with icon, message, description, caption and 3 buttons", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.show({
    message: 'AlertPane.message',
    description: 'AlertPane.description',
    caption: 'AlertPane.caption',
    icon: 'sc-icon-tools-24',
    delegate: this,
    buttons: [
      { title: 'okButtonTitle' },
      { title: 'cancelButtonTitle' },
      { title: 'extraButtonTitle' }
    ]
  });
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-tools-24');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.show with 3 buttons with isDefault, isCancel, toolTip, layerId and localize", function () {
  SC.RunLoop.begin();
  pane = SC.AlertPane.show({
    message: 'AlertPane.message',
    description: 'AlertPane.description',
    caption: 'AlertPane.caption',
    icon: 'sc-icon-tools-24',
    delegate: this,
    buttons: [
      { title: 'okButtonTitle', toolTip: 'okButtonToolTip', layerId: 'okButtonLayerId', isCancel: true, localize: true },
      { title: 'cancelButtonTitle', toolTip: 'cancelButtonToolTip', layerId: 'cancelButtonLayerId', localize: true },
      { title: 'extraButtonTitle', toolTip: 'extraButtonToolTip', layerId: 'extraButtonLayerId', isDefault: true, localize: true }
    ]
  });
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption',
    "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-tools-24', null,
    'okButtonToolTip', 'cancelButtonToolTip', 'extraButtonToolTip',
    'okButtonLayerId', 'cancelButtonLayerId', 'extraButtonLayerId',
    3, 1, true, true, true);
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.show with icon, message, description, caption and 3 buttons - old style", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.show("AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-tools-24', this);
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-tools-24');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.warn with icon, message, description, caption and 3 buttons", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.warn({
    message: "AlertPane.message",
    description: 'AlertPane.description',
    caption: 'AlertPane.caption',
    buttons: [
      { title: "okButtonTitle" },
      { title: "cancelButtonTitle" },
      { title: 'extraButtonTitle' }
    ],
    delegate: this
  });
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-alert-48');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.error with icon, message, description, caption and 3 buttons", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.error({
    message: "AlertPane.message",
    description: 'AlertPane.description',
    caption: 'AlertPane.caption',
    buttons: [
      { title: "okButtonTitle" },
      { title: "cancelButtonTitle" },
      { title: 'extraButtonTitle' }
    ],
    delegate: this
  });
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-error-48');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.plain with message, description, caption and 3 buttons", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.plain({
    message: "AlertPane.message",
    description: 'AlertPane.description',
    caption: 'AlertPane.caption',
    buttons: [
      { title: "okButtonTitle" },
      { title: "cancelButtonTitle" },
      { title: 'extraButtonTitle' }
    ],
    delegate: this
  });
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'blank');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.info with icon, message, description, caption and 3 buttons", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.info({
    message: "AlertPane.message",
    description: 'AlertPane.description',
    caption: 'AlertPane.caption',
    buttons: [
      { title: "okButtonTitle" },
      { title: "cancelButtonTitle" },
      { title: 'extraButtonTitle' }
    ],
    delegate: this
  });
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-info-48');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.info with icon, message and 1 default button (omit all optional parameters) - old style", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.info("AlertPane.message");
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", null, null, null, null, null, 'sc-icon-info-48');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.info with icon, message and 3 buttons (passing null to optional description and caption) - old style", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.info("AlertPane.message", null, null, "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', this);
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", null, null, "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-info-48');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.info with icon, message, description, caption and 1 button (passing null to 3 buttons) - old style", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.info("AlertPane.message", 'AlertPane.description', 'AlertPane.caption', null, null, null, this);
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', null, null, null, 'sc-icon-info-48');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.info with individual actions and targets for three buttons", function() {

  var clickValue = null;

  SC.TestDelegate.didClickOK = function() {
    clickValue = 'OK';
  };

  SC.TestDelegate.didClickCancel = function() {
    clickValue = 'Cancel';
  };

  function showPane(){
    pane = SC.AlertPane.info({
      message: 'AlertPane.message',
      description: 'AlertPane.description',
      caption: 'AlertPane.caption',
      icon: 'sc-icon-tools-24',
      buttons: [
        { title: 'okButtonTitle', action: 'didClickOK', target: SC.TestDelegate },
        { title: 'cancelButtonTitle', action: 'didClickCancel', target: 'SC.TestDelegate' },
        { title: 'extraButtonTitle', action: function() { clickValue = 'Extra'; } }
      ]
    });
    clickValue = null;
  }

  function clickButton(button) {
    var elem = button.$();
    SC.Event.trigger(elem, 'mousedown');
    SC.Event.trigger(elem, 'mouseup');
  }

  SC.RunLoop.begin();
  showPane();
  clickButton(pane.get('button1'));
  SC.RunLoop.end();

  equals(clickValue, 'OK', 'Action for the OK button was clicked');

  SC.RunLoop.begin();
  showPane();
  clickButton(pane.get('button2'));
  SC.RunLoop.end();

  equals(clickValue, 'Cancel', 'Action for the Cancel button was clicked');

  SC.RunLoop.begin();
  showPane();
  clickButton(pane.get('button3'));
  SC.RunLoop.end();

  equals(clickValue, 'Extra', 'Action for the Extra button was clicked');

  pane.destroy();
});

test("users interaction with mutiple alert panes with 1-3 buttons", function() {

  var didDismiss = NO;

  var delegate = SC.Object.create({

    threeButtonAlertPane: function() {
      pane = SC.AlertPane.warn({
        title: "AlertPane.warn title",
        description: 'Click OK to see this alert pane again.  \nClick Other... to see other alert panes.',
        caption: 'Click cancel to dismiss.',
        buttons: [
          { title: "OK" },
          { title: "Cancel" },
          { title: 'Other...' }
        ],
        delegate: this
      });
      pane.dismiss(pane.get('button3'));
      pane.destroy();
    },

    twoButtonAlertPane: function() {
      pane = SC.AlertPane.error({
        title: "AlertPane.error title",
        description: 'Click OK to see one button alert pane.',
        caption: 'Click cancel to dismiss.',
        buttons: [
          { title: "OK" },
          { title: "Cancel" }
        ],
        delegate: delegate
      });
      pane.dismiss(pane.get('button2'));
      pane.destroy();
    },

    oneButtonAlertPane: function() {
      pane = SC.AlertPane.info({
        title: "AlertPane.info title",
        description: 'Click OK to dismiss.',
        delegate: delegate
      });
      pane.dismiss(pane.get('button1'));
      pane.destroy();
    },

    alertPaneDidDismiss: function(alert, status) {
      switch(status) {
        case SC.BUTTON1_STATUS:
          if (alert.icon && alert.icon.indexOf('info')!=-1){ didDismiss = YES; }
          break;
        case SC.BUTTON2_STATUS:
          if (alert.icon && alert.icon.indexOf('error')!=-1){ this.oneButtonAlertPane(); }
          break;
        case SC.BUTTON3_STATUS:
          if (alert.icon && alert.icon.indexOf('alert')!=-1){ this.twoButtonAlertPane(); }
          break;
      }
    }
  });

  SC.RunLoop.begin();
  delegate.threeButtonAlertPane();
  SC.RunLoop.end();

  ok(didDismiss, "should dismiss all buttons");

  delegate.destroy();
}) ;

test("users interaction with mutiple alert panes with 1-3 buttons - old style", function() {

  var didDismiss = NO;

  var delegate = SC.Object.create({

    threeButtonAlertPane: function() {
      pane = SC.AlertPane.warn("AlertPane.warn title", 'Click OK to see this alert pane again.  \nClick Other... to see other alert panes.', 'Click cancel to dismiss.', "OK", "Cancel", 'Other...', this);
      pane.dismiss(pane.get('button3'));
      pane.destroy();
    },

    twoButtonAlertPane: function() {
      pane = SC.AlertPane.error("AlertPane.error title", 'Click OK to see one button alert pane.', 'Click cancel to dismiss.', "OK", "Cancel", delegate);
      pane.dismiss(pane.get('button2'));
      pane.destroy();
    },

    oneButtonAlertPane: function() {
      pane = SC.AlertPane.info("AlertPane.info title", 'Click OK to dismiss.', delegate);
      pane.dismiss(pane.get('button1'));
      pane.destroy();
    },

    alertPaneDidDismiss: function(alert, status) {
      switch(status) {
        case SC.BUTTON1_STATUS:
          if (alert.icon && alert.icon.indexOf('info')!=-1){ didDismiss = YES; }
          break;
        case SC.BUTTON2_STATUS:
          if (alert.icon && alert.icon.indexOf('error')!=-1){ this.oneButtonAlertPane(); }
          break;
        case SC.BUTTON3_STATUS:
          if (alert.icon && alert.icon.indexOf('alert')!=-1){ this.twoButtonAlertPane(); }
          break;
      }
    }
  });

  SC.RunLoop.begin();
  delegate.threeButtonAlertPane();
  SC.RunLoop.end();

  ok(didDismiss, "should dismiss all buttons");
  delegate.destroy();
}) ;


test("AlertPane.show with custom themeName", function() {
  SC.RunLoop.begin();
  pane = SC.AlertPane.show({
    themeName: 'AlertPane.themeName',
    message: 'AlertPane.message',
    description: 'AlertPane.description',
    caption: 'AlertPane.caption',
    icon: 'sc-icon-tools-24',
    delegate: this,
    buttons: [
      { title: 'okButtonTitle' },
      { title: 'cancelButtonTitle' },
      { title: 'extraButtonTitle' }
    ]
  });
  SC.RunLoop.end();
  evaluatePane(pane, "AlertPane.message", 'AlertPane.description', 'AlertPane.caption', "okButtonTitle", "cancelButtonTitle", 'extraButtonTitle', 'sc-icon-tools-24', 'AlertPane.themeName');
  pane.dismiss();
  pane.destroy();
});

test("AlertPane.show with more than three buttons specified", function() {
  var didError = NO;

  SC.RunLoop.begin();
  try {
    pane = SC.AlertPane.show({
      themeName: 'AlertPane.themeName',
      message: 'AlertPane.message',
      description: 'AlertPane.description',
      caption: 'AlertPane.caption',
      icon: 'sc-icon-tools-24',
      delegate: this,
      buttons: [
        { title: 'okButtonTitle' },
        { title: 'cancelButtonTitle' },
        { title: 'extraButtonTitle' },
        { title: 'extraExtraButtonTitle' }
      ]
    });
  } catch (e) {
    didError = YES;
  }
  SC.RunLoop.end();

  ok(!didError, "Specifying more than three buttons doesn't trigger an unhandled error.");
  pane.destroy();
})
