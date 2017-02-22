var portfolio = (function () {
  var portfolio = document.getElementById('portfolio');
  var logo      = portfolio.querySelector('logo');
  var intro     = portfolio.querySelector('intro');
  var work      = portfolio.querySelector('work');
  var footer    = portfolio.querySelector('footer');

  function init() {
    bindUIActions();
    setDate();
  };

  function bindUIActions() {
    window.onload = function () {
      loadCSS('css/bundle.min.css');
    };
  };

  function loadCSS(url) {
    if (document.querySelector('link[href="' + url + '"]') === null) {
      var link = document.createElement('link');
      link.href = url;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';

      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }

  function setDate() {
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  init();
})();

// Work module
var work = (function () {

  // Variables
  var body         = document.body;
  var popup        = document.getElementById('popup');
  var popupContent = document.getElementById('popup-content');
  var wrapper      = body.querySelector('.wrapper');
  var list         = document.querySelector('#work .list');
  var listItems    = [].slice.call(list.querySelectorAll('.work-list-item'));
  var buttons      = [].slice.call(list.querySelectorAll('.work-link'));

  // Constructor
  function init() {
    bindUIActions();
  }

  function bindUIActions() {
    // Loading the work details into a modal
    buttons.forEach(function (button) {
      button.onclick = function (e) {
        var url = button.href;

        // Check if URL is pointing to work dir
        if (url.match(/[a-zA-Z.:/]+(\/work\/\w+\.html)/g)) {
          e.preventDefault();
          getContent(url);
        }
      };
    });

    // Closing the modal
    body.onclick = function (e) { hideModal(e); };
  }

  function getContent(url) {
    var http = new XMLHttpRequest();

    if (!http) {
      alert('Cannot create an XMLHTTP instance');
      return false;
    }

    http.onreadystatechange = function () {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          var html    = http.responseText;
          var content = null;
          var temp    = document.createElement('template');

          temp.innerHTML = html;
          content = temp.content.querySelector('#content').innerHTML;

          showModal(content);
        } else {
          alert('Error with request');
        }
      }
    };

    http.open('GET', url);
    http.send();
  }

  function showModal(content) {
    popupContent.innerHTML = content;
    popup.classList.add('is-active');
    window.scrollTo(0, 0);
  }

  function hideModal(event) {
    if (popup.classList.contains('is-active')) {
      if (event.target === document.body ||
          event.target.id === 'close-btn'
      ) {
        popup.classList.remove('is-active');
      }
    }
  }

  init();
})();
