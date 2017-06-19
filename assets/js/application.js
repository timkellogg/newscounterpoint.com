import $        from 'jquery'
import Header   from './components/header'
import Wysiwyg  from './components/wysiwyg'

$(document).ready(() => {
  new Header()
  new Wysiwyg()
})
