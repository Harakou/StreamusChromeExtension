define([
    'text!../template/shuffleButton.htm'
], function (ShuffleButtonTemplate) {
    'use strict';

    var ShuffleButtonView = Backbone.View.extend({

        tagName: 'button',

        className: 'button-icon button-small toggleButton',
                                
        template: _.template(ShuffleButtonTemplate),
        
        events: {
            'click': 'toggleShuffle'
        },
        
        enabledTitle: chrome.i18n.getMessage("shuffleEnabled"),
        disabledTitle: chrome.i18n.getMessage("shuffleDisabled"),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            //  TODO: Consider using the same class (pressed or disabled) for all buttons.
            this.$el.toggleClass('pressed', this.model.get('enabled'));

            if (this.model.get('enabled')) {
                this.$el.attr('title', this.enabledTitle);
            } else {
                this.$el.attr('title', this.disabledTitle);
            }

            return this;
        },
        
        initialize: function () {
            this.listenTo(this.model, 'change:enabled', this.render);
        },
        
        toggleShuffle: function () {
            this.model.toggleShuffle();
        }
        
    });
    
    return ShuffleButtonView;
});