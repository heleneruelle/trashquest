import { Link } from '@remix-run/react';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import { SUPPORTED_LANGUAGES } from '~/config';

function LanguageSwitcher() {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      {SUPPORTED_LANGUAGES.map((language) => (
        <Link to={createCompositeUrl(i18n, '', { language })} key={language}>
          {language}
        </Link>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
