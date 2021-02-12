module.exports = [{
  id: 'arable',
  landType: 'arable', // assume landtype is a 1-to-1 with standard
  optionalActions: [{
    id: 'arable0',
    paymentRate: 13,
    units: {
      name: 'Number of trees',
      symbol: 'trees'
    }
  }],
  paymentRate: 28,
  title: 'Arable and horticultural land',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'arable-soils',
  landType: 'arable',
  optionalActions: [{
    id: 'arable-soils0',
    paymentRate: 114,
    units: {
      name: 'hectares',
      symbol: 'ha'
    }
  }],
  paymentRate: 30,
  title: 'Arable and horticultural soils',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'improved-grassland',
  landType: 'improved-grassland',
  optionalActions: [{
    id: 'improved-grassland0',
    paymentRate: 3,
    units: {
      name: 'Number of trees',
      symbol: 'trees'
    }
  }],
  paymentRate: 27,
  title: 'Improved grassland',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'improved-grassland-soils',
  landType: 'improved-grassland',
  optionalActions: [{
    id: 'improved-grassland-soils0',
    paymentRate: 88,
    units: {
      name: 'hectares',
      symbol: 'ha'
    }
  }, {
    id: 'improved-grassland-soils1',
    paymentRate: 56,
    units: {
      name: 'hectares',
      symbol: 'ha'
    }
  }],
  paymentRate: 6,
  title: 'Improved grassland soils',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'unimproved-grassland',
  landType: 'unimproved-grassland',
  optionalActions: [],
  paymentRate: 22,
  title: 'Semi-improved and unimproved grassland',
  units: {
    name: 'meters',
    symbol: 'm'
  }
}, {
  id: 'hedgerows',
  landType: 'hedgerows',
  optionalActions: [],
  paymentRate: 16,
  title: 'Hedgerows',
  units: {
    name: 'meters',
    symbol: 'm'
  }
}, {
  id: 'waterbody-buffers',
  landType: 'waterbody-buffers',
  optionalActions: [{
    id: 'waterbody-buffers0',
    paymentRate: 0.05,
    units: {
      name: 'Number of square meters',
      symbol: 'm^2'
    }
  }],
  paymentRate: 200,
  title: 'Waterbody buffering',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'woodland',
  landType: 'woodland',
  optionalActions: [{
    id: 'woodland0',
    paymentRate: 200,
    units: {
      name: 'Number of square meters',
      symbol: 'm^2'
    }
  }],
  paymentRate: 49,
  title: 'Farm woodland',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}]
