import { useRouteError, isRouteErrorResponse } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { RiEmotionUnhappyFill } from 'react-icons/ri';

export function FatalError() {
  const error = useRouteError();

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  /* let errorMessage = "Unknown error";
    if (isDefinitelyAnError(error)) {
      errorMessage = error.message;
    }
  
    return (
      <div>
        <h1>Uh oh ...</h1>
        <p>Something went wrong.</p>
        <pre>{errorMessage}</pre>
      </div>
    ); */

  const { t } = useTranslation();
  return (
    <div
      className="generic-error"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
      }}
    >
      <RiEmotionUnhappyFill size={30} />
      <h1>{t('error.generic.title')}</h1>
      <p style={{ margin: 0 }}>
        {t('error.generic.message', {
          message: isRouteErrorResponse(error)
            ? error.data.message
            : error.message,
        })}
      </p>
      <p style={{ margin: 0 }}>{t('error.generic.description')}</p>
    </div>
  );
}

export default FatalError;
