import { Link, useLocation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import { SUPPORTED_LANGUAGES } from '~/config';

function LanguageSwitcher() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const noLanguagePathname = pathname.replace(/^\/([a-zA-Z]{2})\//, '/');
  return (
    <div className="language-switch__container">
      {SUPPORTED_LANGUAGES.map((language) => (
        <Link
          to={createCompositeUrl(i18n, noLanguagePathname, { language })}
          key={language}
        >
          {t(language)}
        </Link>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
