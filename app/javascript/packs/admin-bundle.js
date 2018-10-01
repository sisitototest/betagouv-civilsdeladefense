/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

const Rails = require('rails-ujs')
Rails.start()

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr.js'

document.querySelectorAll('.ckeditor').forEach((node) => {
  ClassicEditor
    .create(node, {
      toolbar: [ 'bold', 'italic', 'link', 'bulletedList', 'numberedList' ],
      language: 'fr',
    })
    .then( editor => {
        console.log( editor )
    })
    .catch( error => {
        console.error( error )
    })
})

function importAll(r) {
  return r.keys().map(r)
}

importAll(require.context('images/', true, /\.(ico|png|jpe?g|svg|gif)$/))
importAll(require.context('icons/', true, /\.svg$/))

require('js/offcanvas.js')
require('js/dependent-fields.js')
require('js/board.js')

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'select2'; // globally assign select2 fn to $ element

import Popper from 'popper.js'
window.Popper = Popper
require('snackbarjs')
require('bootstrap-material-design')

$('body').bootstrapMaterialDesign()

$( document ).ready(function() {
  $('select.filter').select2({
    width: '100%',
    minimumResultsForSearch: Infinity,
    prompt: 'Select',
    allowClear: true
  }).on('select2:unselecting', function(ev) {
    if (ev.params.args.originalEvent) {
      // When unselecting (in multiple mode)
      ev.params.args.originalEvent.stopPropagation();
    } else {
      // When clearing (in single mode)
      $(this).one('select2:opening', function(ev) { ev.preventDefault(); })
    }
  }).on('change', function(e) {
    let form = e.currentTarget.form
    Rails.fire(form, 'submit')
  })

  var alertNotice = document.querySelector('.alert.alert-info')
  if (alertNotice !== null) {
    var msg = alertNotice.innerHTML
    $.snackbar({content: msg})
  }

  $('.custom-file-input').on('change', function() {
    let fileName = $(this).val().split('\\').pop()
    $(this).next('.custom-file-label').addClass("selected").html(fileName)
  })
})

document.addEventListener("DOMContentLoaded", function() {
  var inputSearchNodes = document.querySelectorAll('.input-search')
  if (inputSearchNodes !== null) {
    inputSearchNodes.forEach( (inputSearchNode) => {
      inputSearchNode.addEventListener('click', function(e) {
      })
    })
  }
})

$('#remoteContentModal').on('show.bs.modal', function (event) {
  var link = event.relatedTarget
  var href = link.href
  var modal = $(this)
  Rails.ajax({
    type: "GET",
    url: href,
    success: function(response){
      var content = $(response).find('body').html()
      modal.find('.modal-body').html(content)
      if (link.classList.contains('job-application-modal-link')) {
        initEmailTemplates()
      }
    },
    error: function(response){
      console.log("error")
      console.log(response)
    }
  })
})
