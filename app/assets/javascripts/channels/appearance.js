var buttonSelector;

App.cable.subscriptions.create("AppearanceChannel", {
  connected: function() {
    this.install();
    return this.appear();
  },
  disconnected: function() {
    return this.uninstall();
  },
  rejected: function() {
    return this.uninstall();
  },
  appear: function() {
    return this.perform("appear", {
      appearing_on: $("main").data("appearing-on")
    });
  },
  away: function() {
    return this.perform("away");
  }
}, buttonSelector = "[data-behavior~=appear_away]", {
  install: function() {
    $(document).on("page:change.appearance", (function(_this) {
      return function() {
        return _this.appear();
      };
    })(this));
    $(document).on("click.appearance", buttonSelector, (function(_this) {
      return function() {
        _this.away();
        return false;
      };
    })(this));
    return $(buttonSelector).show();
  },
  uninstall: function() {
    $(document).off(".appearance");
    return $(buttonSelector).hide();
  }
});

// ---
// generated by coffee-script 1.9.2