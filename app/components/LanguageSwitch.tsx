import { Link } from '@remix-run/react';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import { SUPPORTED_LANGUAGES } from '~/config';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { t } = useTranslation();
  return (
    <div className="language-switch__container">
      {SUPPORTED_LANGUAGES.map((language) => (
        <Link to={createCompositeUrl(i18n, '', { language })} key={language}>
          {t(language)}
        </Link>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
