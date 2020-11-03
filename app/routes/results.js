const Joi = require('@hapi/joi')
const Wreck = require('@hapi/wreck')

function processLandCover (data) {
  // for each feature, group by land_cover_class_code
  const viewModel = {}

  data.features.forEach((feature) => {
    console.log(feature)
    console.log(feature.properties)
    const { area_ha, description, land_cover_class_code: lccc } = feature.properties
    console.log(lccc)
    if (viewModel[lccc]) {
      viewModel[lccc].areas.push(area_ha)
    } else {
      viewModel[lccc] = { areas: [area_ha], description }
    }
  })
  console.log(viewModel)
  return data
}

module.exports = {
  method: 'POST',
  path: '/results',
  handler: async (request, h) => {
    // get sbi ref and make request to rpa land cover api
    console.log(request.payload)
    const { sbi } = request.payload
    // only request response to include data that is used
    const outputFields = 'area_ha,description,land_cover_class_code'
    const { payload } = await Wreck.get(`LandCovers/MapServer/0/query?where=SBI=${sbi}&outFields=${outputFields}&f=geojson&returngeometry=false`,
      {
        baseUrl: 'https://environment.data.gov.uk/arcgis/rest/services/RPA/',
        json: true
      })
    const landcover = processLandCover(payload)
    return h.view('results', { sbi, landcover })
  },
  options: {
    validate: {
      payload: Joi.object({
        sbi: Joi.string().pattern(/^[0-9]{9}/).required()
      }),
      failAction: (request, h) => h.view('sbi', { errors: [{ text: 'Please enter an SBI', href: '#sbi' }] }).takeover()
    }
  }
}
