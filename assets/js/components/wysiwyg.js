import $     from 'jquery'
import Quill from 'quill'

export default class Wysiwyg {
  constructor() {
    this.$el        = document.querySelector('.js-wysiwyg')
    this.$form      = $('form')
    this.$textarea  = this.$form.find('.js-select')
    this.options = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],
          [{ 'align': [] }],
        ]
      },
      theme: 'snow',
    }
    
    this.bindListeners()
  }

  bindListeners() {
    if (!this.$el) return
    
    const editor = new Quill(this.$el, this.options)

    this.$form.on('submit', (event) => {
      event.preventDefault()

      const markup = editor.container.firstChild.innerHTML

      $(this).off()
      this.$textarea.val(markup)
      this.submit()
    })
  }
}
