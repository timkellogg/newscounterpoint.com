import $ from 'jquery'

export default class Header {
  constructor() {
    this.$el = $('.header')
    this.$trigger = $(this.$el).find('.js-hamburger-click')
    console.log('heresd')
    this.bindListeners()
  }

  bindListeners() {
    this.$trigger.on('click', () => {
      console.log('clicked')
    })
  }
}