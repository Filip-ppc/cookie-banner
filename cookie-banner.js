(function() {
  // PERSONALIZATION
  const COLORS = {
    bannerBg:       '#F8F4EC',
    bannerBorder:   '#1A2A3A',
    textColor:      '#1A2A3A',
    btnBg:          '#1A2A3A',
    btnText:        '#fff',
    btnBorder:      '#1A2A3A'
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
