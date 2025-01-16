import { useTranslation } from 'react-i18next';

function countriesToVm(keys) {
  const { t } = useTranslation();
  return keys.map((key) => {
    return {
      id: key,
      name: t(`countries.${key}`),
      value: key,
    };
  });
}

export default countriesToVm;
