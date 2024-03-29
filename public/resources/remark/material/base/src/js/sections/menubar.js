(function(window, document, $) {
  'use strict';

  var $body = $('body'),
    $html = $('html');

  $.site.menubar = {
    opened: null,
    folded: null,
    disableHover: null,
    $instance: null,
    scrollable: {
      api: null,

      init: function() {
        this.api = $.site.menubar.$instance.children('.site-menubar-body').asScrollable({
          namespace: 'scrollable',
          direction: 'vertical',
          contentSelector: '>',
          containerSelector: '>'
        }).data('asScrollable');
      },

      update: function() {
        if (this.api) {
          this.api.update();
        }
      },

      enable: function() {
        if (!this.api) {
          this.init();
        }
        if (this.api) {
          this.api.enable();
        }
      },

      disable: function() {
        if (this.api) {
          this.api.disable();
        }
      }
    },

    init: function() {
      $html.removeClass('css-menubar').addClass('js-menubar');

      this.$instance = $(".site-menubar");
      if (this.$instance.length === 0) {
        return;
      }

      var self = this;

      if ($body.hasClass('site-menubar-open')) {
        this.opened = true;
      } else {
        this.opened = false;
      }

      if ($body.hasClass('site-menubar-fold')) {
        this.folded = true;
      } else {
        this.folded = false;
      }

      if ($body.hasClass('site-menubar-disable-hover') || this.folded) {
        this.disableHover = true;
      } else {
        this.disableHover = false;
        this.hover();
      }

      this.$instance.on('changed.site.menubar', function() {
        self.update();
      });

    },

    animate: function(doing, callback) {
      var self = this;
      $body.addClass('site-menubar-changing');

      setTimeout(function() {
        doing.call(self);
        self.$instance.trigger('changing.site.menubar');
      }, 10);

      setTimeout(function() {
        callback.call(self);
        $body.removeClass('site-menubar-changing');

        self.$instance.trigger('changed.site.menubar');
      }, 250);
    },

    reset: function() {
      this.opened = null;
      $body.removeClass('site-menubar-open');
    },

    open: function() {
      if (this.opened !== true) {
        this.animate(function() {
          $body.addClass('site-menubar-open');
          if (this.disableHover) {
            $body.addClass('site-menubar-fixed')
          }
          this.opened = true;

        }, function() {
          this.scrollable.enable();

          if (this.opened !== null) {
            $.site.resize();
          }
        });
      }
    },

    hide: function() {
      if (this.folded) {
        this.scrollable.disable();
      }

      if (this.opened !== false) {
        this.animate(function() {
          $body.removeClass('site-menubar-open site-menubar-fixed');
          this.opened = false;

        }, function() {
          if (this.opened !== null) {
            $.site.resize();
          }
        });
      }
    },

    hover: function() {
      var self = this;
      this.$instance.on('mouseenter', function() {
        if ($body.hasClass('site-menubar-fixed')) {
          return;
        }
        self.open();
      }).on('mouseleave', function() {
        if ($body.hasClass('site-menubar-fixed')) {
          return;
        }
        self.hide();
      });
    },

    toggle: function() {
      var breakpoint = Breakpoints.current();
      var opened = this.opened;

      if (opened === null || opened === false) {
        this.disableHover = true;
        this.open();
      } else {
        this.disableHover = false;
        this.hide();
      }
    },

    update: function() {
      this.scrollable.update();
    }
  };
})(window, document, jQuery);
