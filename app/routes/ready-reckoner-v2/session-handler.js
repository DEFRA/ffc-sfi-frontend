module.exports = {
  setCalculationResult: (request, value) => request.yar.set('calculationResult', value),
  getCalculationResult: request => request.yar.get('calculationResult'),
  setCorrelationId: (request, value) => request.yar.set('correlationId', value),
  getCorrelationId: request => request.yar.get('correlationId'),
  setLandValues: (request, value) => request.yar.set('landValues', value),
  getLandValues: request => request.yar.get('landValues'),
  setSelectedStandards: (request, value) => request.yar.set('selectedStandards', value),
  getSelectedStandards: request => request.yar.get('selectedStandards')
}
