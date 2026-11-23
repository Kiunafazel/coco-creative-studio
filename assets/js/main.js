
/* COCO — Creative Design Studio · Interactions */
(function () {
  'use strict';

  /* ── Footer year ── */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });


  /* ── Burger toggle ── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainnav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');

      var isOpen = nav.classList.contains('open');

      burger.textContent = isOpen ? '✕' : '☰';
      burger.setAttribute('aria-expanded', isOpen);
    });
  }


  /* ── Active navigation ── */
  var path = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('#mainnav a').forEach(function (a) {
    var href = a.getAttribute('href');

    if (href === path) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });


  /* ── Scroll reveals ── */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      obs.observe(el);
    });

  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ── Count-up animation ── */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);

    if (isNaN(target)) return;

    var current = 0;
    var duration = 1500;
    var step = Math.ceil(target / (duration / 16));

    var timer = setInterval(function () {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      el.textContent = current.toLocaleString();

    }, 16);
  }

  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          countUp(e.target);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function (el) {
      countObs.observe(el);
    });
  }


  /* ── Contact form validation ── */
  var form = document.getElementById('contactform');

  if (form) {

    var fields = [
      {
        id: 'name',
        msg: 'Name is required'
      },
      {
        id: 'email',
        msg: 'Please enter a valid email address',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      {
        id: 'project_type',
        msg: 'Please select a service'
      },
      {
        id: 'message',
        msg: 'Please describe your idea'
      }
    ];

    function validateField(field) {
      var input = document.getElementById(field.id);
      var err = document.getElementById('err-' + field.id);

      if (!input) return true;

      var val = input.value.trim();

      var invalid = !val || (field.pattern && !field.pattern.test(val));

      if (invalid) {
        if (err) err.textContent = field.msg;
        input.style.borderColor = 'var(--fail)';
        return false;
      }

      if (err) err.textContent = '';
      input.style.borderColor = 'var(--border)';

      return true;
    }

    fields.forEach(function (field) {
      var input = document.getElementById(field.id);

      if (input) {
        input.addEventListener('input', function () {
          validateField(field);
        });

        input.addEventListener('change', function () {
          validateField(field);
        });
      }
    });


    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;

      fields.forEach(function (field) {
        if (!validateField(field)) {
          valid = false;
        }
      });

      if (valid) {
        var success = document.getElementById('form-success');

        if (success) {
          success.style.display = 'block';
          success.textContent =
            'Thank you! Your form passed validation. Message delivery is not configured yet.';
        }

        form.reset();

        fields.forEach(function (field) {
          var input = document.getElementById(field.id);
          var err = document.getElementById('err-' + field.id);

          if (input) {
            input.style.borderColor = 'var(--border)';
          }

          if (err) {
            err.textContent = '';
          }
        });
      }
    });
  }


  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

})();
