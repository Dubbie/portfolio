var portfolio = (function () {
  var portfolio = document.getElementById('portfolio');
  var logo      = portfolio.querySelector('logo');
  var intro     = portfolio.querySelector('intro');
  var work      = portfolio.querySelector('work');
  var footer    = portfolio.querySelector('footer');

  function init() {
    bindUIActions();
  };

  function bindUIActions() {
    window.onload = function () {
      animateElements();
      loadCSS('css/test.min.css');
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

  function animateElements() {
    function timeout(el, val, t) {
      setTimeout(function () {
        el.classList.value = val;
      }, t);
    }

    var c = 0;
    var arr = [].slice.call(document.querySelectorAll('.animate'));

    arr.forEach(function (el) {
      var oldValue = el.classList.value;
      newValue = oldValue.replace(/\s*(slideDown|slideUp|slideLeft|slideRight|fadeIn|FadeOut)/g, '');

      if (newValue != oldValue) {
        timeout(el, newValue, 500 * c);
        c++;
      }
    });
  };

  init();

  return {
    animateElements: animateElements,
  };
})();

// Work module
var work = (function () {

  var body        = document.body;
  var modal       = null;
  var closeButton = null;
  var wrapper     = body.querySelector('.wrapper');
  var list        = wrapper.querySelector('#work-list');
  var listItems   = [].slice.call(list.querySelectorAll('.work-list-item'));
  var buttons     = [].slice.call(list.querySelectorAll('.work-link'));

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
    body.onclick = function (e) { removeModal(e); };
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

          createModal(content);
        } else {
          alert('Error with request');
        }
      }
    };

    http.open('GET', url);
    http.send();
  }

  function createModal(content) {
    var newButton = document.createElement('span');
    newButton.id = 'close-btn';
    newButton.className = 'bold';
    newButton.innerHTML = 'Close';

    var newModal = document.getElementById('modal') ? document.getElementById('modal') : document.createElement('div');
    newModal.id = 'content';
    newModal.className = 'padded container animate slideUp';
    newModal.innerHTML = content;

    newModal.appendChild(newButton);
    wrapper.appendChild(newModal);

    modal = newModal;
    closeButton = newButton;

    window.setTimeout(function () {
      portfolio.animateElements();
    }, 100);
  }

  function removeModal(e) {
    if (e.target.closest('#content') == null || e.target == closeButton) {
      if (modal !== null) {
        modal.style.opacity   = 0;
        modal.style.marginTop = '25%';

        window.setTimeout(function () {
          modal.parentElement.removeChild(modal);
          modal = null;
          closeButton = null;
        }, 500);
      }
    }
  }

  init();
})();
