import {
  Form,
  useActionData,
  //useActionData,
  useNavigation,
  useParams,
  useFetcher,
} from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { AVAILABLE_COUNTRIES } from '../../config';

const defaultLocationState = {
  id: undefined,
  properties: {
    name: '',
    full_address: undefined,
    coordinates: {
      latitude: undefined,
      longitude: undefined,
    },
  },
};

const SignUpForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const { t } = useTranslation();
  const selectRef = useRef();
  const { lang } = useParams();
  const fetcher = useFetcher();
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] =
    useState(defaultLocationState);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedLocation({
      ...defaultLocationState,
      properties: { ...defaultLocationState.properties, name: e.target.value },
    });

    if (value.trim() !== '') {
      fetcher.load(
        `/api/search?query=${value}&language=${lang}&country=${selectRef.current.value}&types=place`
      );
    }
  };

  const handleSuggestionClick = (location) => {
    setSelectedLocation(location);
    setQuery(''); // Clear the suggestions
  };

  return (
    <div>
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
      <Form method="post" className="form">
        <label>
          {t('email')}
          <input type="email" name="email" required />
        </label>
        <label>
          {t('password')}
          <input type="password" name="password" required />
        </label>
        <label>
          {t('username')}
          <input type="text" name="username" required />
        </label>
        <label htmlFor="country">Country:</label>
        <select name="country" id="country" ref={selectRef}>
          {AVAILABLE_COUNTRIES.map((country) => (
            <option value={country} key={country}>
              {t(`country.${country}`)}
            </option>
          ))}
        </select>
        <label>
          {t('location')}
          <input
            type="text"
            name="locationName"
            value={
              selectedLocation?.properties?.full_address ||
              selectedLocation?.properties?.name
            }
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {fetcher.data?.features && query && (
            <ul className="autocomplete-list">
              {fetcher.data.features.map((location) => (
                <li
                  key={location}
                  onClick={() => handleSuggestionClick(location)}
                  className="autocomplete-item"
                >
                  {location.properties.full_address}
                </li>
              ))}
            </ul>
          )}
        </label>
        <input type="hidden" name="locationId" value={selectedLocation.id} />
        <input
          type="hidden"
          name="locationLatitude"
          value={selectedLocation?.properties?.coordinates?.latitude}
        />
        <input
          type="hidden"
          name="locationLongitude"
          value={selectedLocation?.properties?.coordinates?.longitude}
        />
        <button type="submit" disabled={navigation.state === 'submitting'}>
          {t(
            navigation.state === 'submitting'
              ? 'create-new.cta.submitting'
              : 'create-new.cta.idle'
          )}
        </button>
      </Form>
    </div>
  );
};

export default SignUpForm;
