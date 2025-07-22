(function() {
  // 🔧 PERSONALIZACE – upravitelné barvy
  const COLORS = {
    bannerBg:     '#F8F4EC',
    bannerBorder: '#a62b0c',
    textColor:    '#1A2A3A',
    btnBg:        '#1A2A3A',
    btnText:      '#fff',
    btnBorder:    '#1A2A3A'
  };

  const css = `
    #cookie-banner, #cookie-settings-btn {
      font-family: sans-serif; color: ${COLORS.textColor};
      z-index: 9999;
    }
    #cookie-banner {
      position: fixed; bottom: 20px; left: 50%;
      transform: translateX(-50%);
      max-width: 600px; width: calc(100% - 40px);
      background: ${COLORS.bannerBg}; border: 2px solid ${COLORS.bannerBorder};
      border-radius: 8px; padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,.15);
    }
    #cookie-banner[aria-hidden="false"] { display: block; }
    #cookie-banner[aria-hidden="true"]  { display: none; }
    #cookie-banner .cb-header {
      display: flex; justify-content: space-between; align-items: center;
    }
    #cookie-banner .cb-title { font-size: 18px; font-weight: bold; margin: 0; }
    #cookie-banner .cb-description {
      margin: 10px 0 15px; font-size: 14px; line-height: 1.4;
    }
    #cookie-banner .cb-btn {
      padding: 8px 12px; font-size: 14px; border-radius: 4px;
      border: 2px solid ${COLORS.btnBorder}; background: transparent;
      cursor: pointer;
    }
    #cookie-banner .cb-btn.primary {
      background: ${COLORS.btnBg}; color: ${COLORS.btnText};
    }
    #cookie-banner .cb-btn.link {
      background: none; border: none; text-decoration: underline;
      padding: 0;
    }
    #cookie-banner .cb-details {
      margin-top: 15px; border-top: 1px solid #ccc; padding-top: 15px;
    }
    #cookie-banner details { margin-bottom: 10px; }
    #cookie-banner summary {
      font-weight: bold; cursor: pointer; outline: none;
    }
    #cookie-banner details p {
      margin: 8px 0 0 20px; font-size: 13px; line-height: 1.4;
    }
    #cookie-banner details label {
      display: block; margin: 5px 0 0 20px; font-size: 14px;
    }
    #cookie-banner .cb-actions {
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap;
    }
    #cookie-banner .cb-actions .cb-buttons {
      display: flex; gap: 10px; margin-top: 10px;
    }
    #cookie-settings-btn {
      position: fixed; bottom: 20px; right: 20px;
      background: ${COLORS.btnBg}; color: ${COLORS.btnText}; border: none;
      padding: 8px 12px; border-radius: 4px; cursor: pointer;
      display: none;
    }
    @media (max-width: 480px) {
      #cookie-banner { padding: 15px; }
      #cookie-banner .cb-header { flex-direction: column; align-items: flex-start; }
      #cookie-banner .cb-actions { flex-direction: column; align-items: stretch; }
      #cookie-banner .cb-actions .cb-buttons { flex-direction: column; }
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  const POLICY_URL = 'https://youronlinecalculator.site/cookie-policy/';
  const VERSION = '1.0';

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
        'ad_personalization': cm === 'yes' ? 'granted' : 'denied'
      });
    }

    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: 'cookie_consent_update',
      analytics_storage: ca === 'yes' ? 'granted' : 'denied',
      ad_storage: cm === 'yes' ? 'granted' : 'denied',
      consent_time: new Date().toISOString(),
      consent_version: VERSION
    });

    showManageBtn();
    return;
  }

  window.addEventListener('DOMContentLoaded', renderBanner);

  function renderBanner() {
    const html = `
      <div class="cb-header">
        <p class="cb-title">Tato webová stránka používá cookies</p>
        <button id="cb-accept-all" class="cb-btn primary">Povolit vše</button>
      </div>
      <p class="cb-description">
        K personalizaci obsahu a reklam, poskytování funkcí sociálních sítí a analýze návštěvnosti používáme cookies.
        Další informace a nastavení najdete v
        <a href="${POLICY_URL}" target="_blank">Zásadách cookies</a>.
      </p>
      <div class="cb-actions">
        <button id="cb-settings-toggle" class="cb-btn link">Podrobné nastavení ▼</button>
      </div>
      <div id="cb-details" class="cb-details" style="display:none">
        <p>Vyberte, jaké soubory cookie chcete povolit:</p>
        <details id="cb-analytics-section">
          <summary>Analytické cookies</summary>
          <p>Statistické cookies pomáhají majitelům webu porozumět chování návštěvníků. Anonymně sbírají data.</p>
          <label><input type="checkbox" id="cb-analytics"> Povolit analytické cookies</label>
        </details>
        <details id="cb-marketing-section">
          <summary>Marketingové cookies</summary>
          <p>Marketingové cookies slouží k zobrazování cílených reklam a měření jejich účinnosti.</p>
          <label><input type="checkbox" id="cb-marketing"> Povolit marketingové cookies</label>
        </details>
        <div class="cb-buttons">
          <button id="cb-save" class="cb-btn primary">Uložit</button>
          <button id="cb-close" class="cb-btn">Zavřít</button>
        </div>
      </div>`;
    
    const d = document.createElement('div');
    d.id = 'cookie-banner';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-hidden', 'false');
    d.innerHTML = html;
    document.body.appendChild(d);

    document.getElementById('cb-accept-all').onclick = () => savePrefs(true, true);
    document.getElementById('cb-settings-toggle').onclick = () => {
      toggleDetails();
      document.getElementById('cb-analytics-section').open = true;
      document.getElementById('cb-marketing-section').open = true;
    };
    document.getElementById('cb-close').onclick = () => hideDetails();
    document.getElementById('cb-save').onclick = () => {
      const a = document.getElementById('cb-analytics').checked;
      const m = document.getElementById('cb-marketing').checked;
      savePrefs(a, m);
    };
  }

  function toggleDetails() {
    const det = document.getElementById('cb-details');
    det.style.display = det.style.display === 'none' ? 'block' : 'none';
  }

  function hideDetails() {
    document.getElementById('cb-details').style.display = 'none';
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
        'ad_personalization': allowMark ? 'granted' : 'denied'
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
      btn.textContent = 'Spravovat cookies';
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
