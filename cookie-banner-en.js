<script>
(function() {
  const COLORS = {
    bannerBg: '#F8F4EC',
    bannerBorder: '#a62b0c',
    textColor: '#1A2A3A',
    btnBg: '#1A2A3A',
    btnText: '#fff',
    btnBorder: '#1A2A3A'
  };

  const css = `
    #cookie-banner, #cookie-settings-btn {
      font-family: sans-serif; color: ${COLORS.textColor};
      z-index: 9999;
    }
    #cookie-banner {
      position: fixed; bottom: 0; left: 0;
      width: 100%;
      background: ${COLORS.bannerBg}; border-top: 2px solid ${COLORS.bannerBorder};
      padding: 30px 40px; font-size: 16px;
      box-shadow: 0 -2px 8px rgba(0,0,0,.15);
    }
    #cookie-banner[aria-hidden="false"] { display: block; }
    #cookie-banner[aria-hidden="true"]  { display: none; }
    #cookie-banner .cb-header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    #cookie-banner .cb-description {
      margin: 10px 0 20px;
      line-height: 1.6;
    }
    #cookie-banner .cb-btn {
      padding: 12px 20px; font-size: 16px; border-radius: 6px;
      border: 2px solid ${COLORS.btnBorder}; background: transparent;
      cursor: pointer;
    }
    #cookie-banner .cb-btn.primary {
      background: ${COLORS.btnBg}; color: ${COLORS.btnText};
    }
    #cookie-banner .cb-btn.link {
      background: none; border: none; text-decoration: underline; padding: 0;
    }
    #cookie-banner .cb-details {
      margin-top: 15px; border-top: 1px solid #ccc; padding-top: 15px;
    }
    #cookie-banner details { margin-bottom: 10px; }
    #cookie-banner summary {
      font-weight: bold; cursor: pointer; outline: none;
    }
    #cookie-banner details p {
      margin: 8px 0 0 20px; font-size: 14px; line-height: 1.4;
    }
    #cookie-banner details label {
      display: block; margin: 5px 0 0 20px; font-size: 14px;
    }
    #cookie-banner .cb-actions {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
      min-height: 60px;
      padding-top: 10px;
    }
    #cookie-banner .cb-actions .cb-buttons {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0 24px 20px 0;
    }
    #cookie-settings-btn {
      position: fixed; bottom: 20px; right: 20px;
      background: ${COLORS.btnBg}; color: ${COLORS.btnText}; border: none;
      padding: 10px 14px; border-radius: 4px; cursor: pointer; display: none;
    }
    @media (max-width: 768px) {
      #cookie-banner { padding: 20px; font-size: 14px; }
      #cookie-banner .cb-btn { font-size: 14px; padding: 10px 14px; }
      #cookie-banner .cb-header { font-size: 18px; }
      #cookie-banner .cb-actions { flex-direction: column; align-items: stretch; }
      #cookie-banner .cb-actions .cb-buttons { position: static; margin: 10px 0 0; }
    }
  `;

  const POLICY_URL = 'https://youronlinecalculator.site/cookie-policy/';
  const VERSION = '1.0';

  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};path=/;expires=${d.toUTCString()}`;
  }

  function getCookie(name) {
    const m = document.cookie.match('(^|;)\\s*' + name + '=([^;]+)');
    return m ? m.pop() : '';
  }

  const cm = getCookie('cc_marketing'), ca = getCookie('cc_analytics');
  if (cm || ca) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'ad_storage': cm === 'yes' ? 'granted' : 'denied',
        'analytics_storage': ca === 'yes' ? 'granted' : 'denied',
        'functionality_storage': 'granted',
        'ad_user_data': cm === 'yes' ? 'granted' : 'denied',
        'ad_personalization': cm === 'yes' ? 'granted' : 'denied',
        'personalization_storage': cm === 'yes' ? 'granted' : 'denied'
      });
    }
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: 'cookie_consent_update' });
    showManageBtn();
    return;
  }

  window.addEventListener('DOMContentLoaded', renderBanner);

  function renderBanner() {
    const html = `
      <div class="cb-header">This website uses cookies</div>
      <p class="cb-description">
        We use cookies to personalize content and ads, to provide social media features and to analyze our traffic.
        You can find more details and settings in our
        <a href="${POLICY_URL}" target="_blank">Cookie Policy</a>.
      </p>
      <div class="cb-actions">
        <button id="cb-settings-toggle" class="cb-btn link">Cookie settings</button>
        <div class="cb-buttons">
          <button id="cb-accept-all" class="cb-btn primary">Allow all</button>
        </div>
      </div>
    `;

    const d = document.createElement('div');
    d.id = 'cookie-banner';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-hidden', 'false');
    d.innerHTML = html;
    document.body.appendChild(d);

    document.getElementById('cb-accept-all').onclick = () => savePrefs(true, true);
    document.getElementById('cb-settings-toggle').onclick = () => showManageBtn();
  }

  function savePrefs(allowAnal, allowMark) {
    const now = new Date().toISOString();
    setCookie('cc_analytics', allowAnal ? 'yes' : 'no', 365);
    setCookie('cc_marketing', allowMark ? 'yes' : 'no', 365);
    setCookie('cc_consent_time', now, 365);
    setCookie('cc_consent_version', VERSION, 365);

    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'ad_storage': allowMark ? 'granted' : 'denied',
        'analytics_storage': allowAnal ? 'granted' : 'denied',
        'functionality_storage': 'granted',
        'ad_user_data': allowMark ? 'granted' : 'denied',
        'ad_personalization': allowMark ? 'granted' : 'denied',
        'personalization_storage': allowMark ? 'granted' : 'denied'
      });
    }

    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: 'cookie_consent_update',
      analytics_storage: allowAnal ? 'granted' : 'denied',
      ad_storage: allowMark ? 'granted' : 'denied',
      consent_time: now,
      consent_version: VERSION
    });

    const b = document.getElementById('cookie-banner');
    b.setAttribute('aria-hidden', 'true');
    b.remove();
    showManageBtn();
  }

  function showManageBtn() {
    let btn = document.getElementById('cookie-settings-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'cookie-settings-btn';
      btn.textContent = 'Manage cookies';
      btn.onclick = () => {
        setCookie('cc_analytics', '', -1);
        setCookie('cc_marketing', '', -1);
        location.reload();
      };
      document.body.appendChild(btn);
    }
    btn.style.display = 'block';
  }
})();
</script>
