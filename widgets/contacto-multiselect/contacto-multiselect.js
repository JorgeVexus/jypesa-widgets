/**
 * Jypesa Multi-Select Dropdown Component
 * Transforms the contact form single-select collection field into a rich multi-select dropdown.
 */
(function() {
  function initMultiSelect() {
    var select = document.getElementById('collection-interest') || document.getElementById('coleccion-interes');
    if (!select || select.dataset.multiInit === 'true') return;
    select.dataset.multiInit = 'true';

    // Detect language: English if /en/ or jypesausa.com or page says "Collection of interest"
    var isEnglish = window.location.pathname.indexOf('/en') !== -1 ||
                    window.location.hostname.indexOf('jypesausa') !== -1 ||
                    (select.previousElementSibling && select.previousElementSibling.textContent.indexOf('Collection') !== -1);

    var config = isEnglish ? {
      placeholder: 'Select collections of interest...',
      selectedSuffix: 'selected',
      clearAllText: 'Clear all',
      categories: [
        { name: 'Standard', items: ['Elements', 'Tea Leaf', 'Rainforest', 'A&O'] },
        { name: 'Superior', items: ['Cava', 'Biogena', 'Lavarino Cosso'] },
        { name: 'Premium', items: ['Vervan', 'Persea', 'Agavia'] }
      ]
    } : {
      placeholder: 'Selecciona colecciones de interés...',
      selectedSuffix: 'seleccionadas',
      clearAllText: 'Limpiar selección',
      categories: [
        { name: 'Estándar', items: ['Elements', 'Tea Leaf', 'Rainforest', 'A&O'] },
        { name: 'Superior', items: ['Cava', 'Biogena', 'Lavarino Cosso', 'Dove', 'Tresseme'] },
        { name: 'Premium', items: ['Vervan', 'Hawaiian', 'For All Folks', 'Persea', 'Agavia', 'Valquer'] }
      ]
    };

    // If options are already in the select, honor the categories or use present options
    var availableValues = [];
    config.categories.forEach(function(cat) {
      cat.items.forEach(function(item) {
        availableValues.push(item);
      });
    });

    // Hide native select and remove its 'name' to prevent submitting single/duplicate value
    select.style.display = 'none';
    var originalName = select.getAttribute('name') || 'Coleccion_interes';
    select.removeAttribute('name');

    // Create hidden input to carry the comma-separated string for Webflow form submission
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = originalName;
    hiddenInput.id = select.id + '-hidden';
    select.parentNode.insertBefore(hiddenInput, select.nextSibling);

    // Build container
    var container = document.createElement('div');
    container.className = 'jyp-multiselect-container';

    // Build trigger
    var trigger = document.createElement('div');
    trigger.className = 'jyp-multiselect-trigger';
    trigger.tabIndex = 0;
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    var content = document.createElement('div');
    content.className = 'jyp-multiselect-content';

    var arrow = document.createElement('div');
    arrow.className = 'jyp-multiselect-arrow';
    arrow.innerHTML = '<svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    trigger.appendChild(content);
    trigger.appendChild(arrow);
    container.appendChild(trigger);

    // Build dropdown
    var dropdown = document.createElement('div');
    dropdown.className = 'jyp-multiselect-dropdown';
    dropdown.setAttribute('role', 'listbox');
    dropdown.setAttribute('aria-multiselectable', 'true');

    var selectedValues = [];
    var optionElements = {};

    config.categories.forEach(function(cat) {
      // Check if any items from this category are in availableValues
      var visibleItems = cat.items.filter(function(item) {
        return availableValues.indexOf(item) !== -1;
      });

      if (visibleItems.length === 0) return;

      var catHeader = document.createElement('div');
      catHeader.className = 'jyp-category-title';
      catHeader.textContent = cat.name;
      dropdown.appendChild(catHeader);

      visibleItems.forEach(function(val) {
        var opt = document.createElement('div');
        opt.className = 'jyp-option-item';
        opt.setAttribute('role', 'option');
        opt.dataset.value = val;

        var box = document.createElement('div');
        box.className = 'jyp-checkbox-box';
        box.innerHTML = '<svg class="jyp-checkbox-check" viewBox="0 0 12 10"><polyline points="1.5 5 4.5 8 10.5 2"></polyline></svg>';

        var label = document.createElement('span');
        label.className = 'jyp-option-text';
        label.textContent = val;

        opt.appendChild(box);
        opt.appendChild(label);

        opt.addEventListener('click', function(e) {
          e.stopPropagation();
          toggleValue(val);
        });

        dropdown.appendChild(opt);
        optionElements[val] = opt;
      });
    });

    // Footer with count and clear
    var footer = document.createElement('div');
    footer.className = 'jyp-dropdown-footer';

    var countEl = document.createElement('span');
    countEl.className = 'jyp-dropdown-count';
    countEl.textContent = '0 ' + config.selectedSuffix;

    var clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'jyp-dropdown-clear-btn';
    clearBtn.textContent = config.clearAllText;
    clearBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      selectedValues = [];
      updateUI();
    });

    footer.appendChild(countEl);
    footer.appendChild(clearBtn);
    dropdown.appendChild(footer);

    container.appendChild(dropdown);
    hiddenInput.parentNode.insertBefore(container, hiddenInput.nextSibling);

    function toggleValue(val) {
      var idx = selectedValues.indexOf(val);
      if (idx > -1) {
        selectedValues.splice(idx, 1);
      } else {
        selectedValues.push(val);
      }
      updateUI();
    }

    function updateUI() {
      // Update hidden input
      hiddenInput.value = selectedValues.join(', ');

      // Sync with native select for Webflow forms
      Array.from(select.options).forEach(function(opt) {
        opt.selected = selectedValues.indexOf(opt.value) > -1;
      });
      select.dispatchEvent(new Event('change', { bubbles: true }));

      // Update dropdown option items
      Object.keys(optionElements).forEach(function(val) {
        var el = optionElements[val];
        var isSel = selectedValues.indexOf(val) > -1;
        if (isSel) {
          el.classList.add('is-selected');
          el.setAttribute('aria-selected', 'true');
        } else {
          el.classList.remove('is-selected');
          el.setAttribute('aria-selected', 'false');
        }
      });

      // Update trigger content
      content.innerHTML = '';
      if (selectedValues.length === 0) {
        var placeholder = document.createElement('span');
        placeholder.className = 'jyp-multiselect-placeholder';
        placeholder.textContent = config.placeholder;
        content.appendChild(placeholder);
        countEl.textContent = '0 ' + config.selectedSuffix;
        clearBtn.style.display = 'none';
      } else {
        countEl.textContent = selectedValues.length + ' ' + config.selectedSuffix;
        clearBtn.style.display = 'inline-block';

        selectedValues.forEach(function(val) {
          var chip = document.createElement('span');
          chip.className = 'jyp-multiselect-chip';
          chip.textContent = val;

          var rm = document.createElement('button');
          rm.type = 'button';
          rm.className = 'jyp-multiselect-chip-remove';
          rm.innerHTML = '&times;';
          rm.title = 'Remove ' + val;
          rm.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleValue(val);
          });

          chip.appendChild(rm);
          content.appendChild(chip);
        });
      }
    }

    function openDropdown() {
      container.classList.add('is-open');
      trigger.classList.add('is-active');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      container.classList.remove('is-open');
      trigger.classList.remove('is-active');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (container.classList.contains('is-open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (container.classList.contains('is-open')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    document.addEventListener('click', function(e) {
      if (!container.contains(e.target)) {
        closeDropdown();
      }
    });

    // Initial render
    updateUI();
  }

  window.initJypesaMultiSelect = initMultiSelect;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMultiSelect);
  } else {
    initMultiSelect();
  }
})();
