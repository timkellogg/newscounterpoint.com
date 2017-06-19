import $ from 'jquery'

export default class Header {
  constructor() {
    this.$el        = $('.header')
    this.$menu      = this.$el.find('.header__menu')
    this.$hamburger = this.$el.find('.header__hamburger')
    this.$trigger   = this.$el.find('.js-hamburger-click')

    this.bindListeners()
  }

  bindListeners() {
    if (!this.$el) return

    this.$trigger.click((event) => {
      this.$el.toggleClass('header--open')
      this.$hamburger.toggleClass('header__hamburger--active')
      this.$menu.toggle()
    })
  }
}