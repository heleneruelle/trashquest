function poisToVm(poisSearchResponse) {
  return {
    ...poisSearchResponse,
    features: poisSearchResponse.features.map((feature) => ({
      ...feature,
      id: feature.properties.mapbox_id,
    })),
  };
}

export default poisToVm;
