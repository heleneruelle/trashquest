import { useFetcher, useParams, useActionData } from '@remix-run/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Select from '../inputs/Select';
import countriesToVm from '../../utils/tovm/countriesToVm';
import { AVAILABLE_COUNTRIES, firebaseErrorCodes } from '../../config';

interface LocationAutoCompleteProps {
  hint: string | null;
  types?: Array<string>;
  countryHint: string | null;
  poi?: boolean;
}

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

function LocationAutoComplete({
  hint = null,
  types = ['place'],
  countryHint = null,
  poi = false,
}: LocationAutoCompleteProps) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const selectRef = useRef();
  const { lang } = useParams();
  const actionData = useActionData();
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] =
    useState(defaultLocationState);

  const value =
    query ||
    selectedLocation?.properties?.full_address ||
    selectedLocation?.properties?.name ||
    '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedLocation({
      ...defaultLocationState,
      properties: { ...defaultLocationState.properties, name: value },
    });

    if (value.trim() !== '' && selectRef?.current?.value) {
      fetcher.load(
        `/api/search?query=${value}&language=${lang}&country=${
          selectRef.current.value
        }&types=${types.join()}&poi=${poi}`
      );
    }
  };

  const handleSuggestionClick = (location: any) => {
    setQuery('');
    setSelectedLocation(location);
  };

  const handleCountrySelectChange = () => {
    setQuery('');
    setSelectedLocation(defaultLocationState);
  };

  const searchResponse = useMemo(() => {
    const { searchData, poiData } = fetcher?.data || {};
    if (searchData?.features || poiData?.features) {
      return [...(searchData.features || []), ...(poiData.features || [])];
    }
    return null;
  }, [fetcher?.data]);

  return (
    <div className="location-autocomplete">
      <Select
        id="country"
        name={t('country')}
        ref={selectRef}
        options={countriesToVm(AVAILABLE_COUNTRIES)}
        hint={countryHint}
        changeCallback={handleCountrySelectChange}
      />
      <label className="autocomplete">
        {t('location')}
        <input
          type="text"
          name="locationName"
          value={value} // `value` est toujours défini
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <small className="input-hint">{hint}</small>
        {searchResponse && query && (
          <ul className="autocomplete-list">
            {searchResponse.map((location: any) => (
              <li
                key={location.id}
                onClick={() => handleSuggestionClick(location)}
                className="autocomplete-item"
              >
                {`${location.properties.name} - ${location.properties.full_address}`}
              </li>
            ))}
          </ul>
        )}
        {actionData?.error === firebaseErrorCodes.location && (
          <small className="input-hint input-hint__error">
            {t('create-new-account.input.hint.location-error')}
          </small>
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
    </div>
  );
}

export default LocationAutoComplete;
