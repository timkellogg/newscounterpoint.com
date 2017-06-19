import $     from 'jquery'
import Quill from 'quill'

export default class Wysiwyg {
  constructor() {
    this.$el     = document.querySelector('.js-wysiwyg')
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
    this.$editor = new Quill(this.$el, this.options)
  }
}
