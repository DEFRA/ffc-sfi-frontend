module.exports = {
  setCalculationResult: (yar, value) => yar.set('calculationResult', value),
  getCalculationResult: yar => yar.get('calculationResult'),
  setCorrelationId: (yar, value) => yar.set('correlationId', value),
  getCorrelationId: yar => yar.get('correlationId'),
  setLandValues: (yar, value) => yar.set('landValues', value),
  getLandValues: yar => yar.get('landValues'),
  setSelectedStandards: (yar, value) => yar.set('selectedStandards', value),
  getSelectedStandards: yar => yar.get('selectedStandards')
}
