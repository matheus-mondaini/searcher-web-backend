document.addEventListener('DOMContentLoaded', () => {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  });

  const logoutLinks = document.querySelectorAll('a[href="/logout"]');
  logoutLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!confirm('Deseja realmente sair?')) {
        e.preventDefault();
      }
    });
  });

  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  const keywordsInput = document.getElementById('keywords');
  if (keywordsInput) {
    keywordsInput.addEventListener('blur', () => {
      let value = keywordsInput.value;
      value = value.split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword)
        .join(', ');
      keywordsInput.value = value;
    });
  }

  const urlInput = document.getElementById('url');
  if (urlInput) {
    urlInput.addEventListener('input', () => {
      const url = urlInput.value;
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        urlInput.setCustomValidity('URL deve começar com http:// ou https://');
      } else {
        urlInput.setCustomValidity('');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      link.style.opacity = '0.6';
      setTimeout(() => {
        link.style.opacity = '1';
      }, 200);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });

  const forms = document.querySelectorAll('form');
  let formChanged = false;

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        formChanged = true;
      });
    });

    form.addEventListener('submit', () => {
      formChanged = false;
    });
  });

  window.addEventListener('beforeunload', (e) => {
    if (formChanged) {
      e.preventDefault();
      e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
      return e.returnValue;
    }
  });
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copiado para a área de transferência!');
  }).catch(err => {
    console.error('Erro ao copiar:', err);
  });
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
