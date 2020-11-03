const Joi = require('@hapi/joi')
const Wreck = require('@hapi/wreck')

const outputFields = [
  'area_ha', 'description', 'land_cover_class_code', 'parcel_id'
]

function processLandCover (data) {
  // for each feature, group by land_cover_class_code
  const viewModel = {
    landtypes: {},
    totalArea: 0
  }

  data.features.forEach((feature) => {
    const { area_ha: area, description, land_cover_class_code: lccc, parcel_id: parcelId } = feature.properties

    viewModel.totalArea += area

    if (viewModel.landtypes[lccc]) {
      const parcel = {
        area,
        id: parcelId
      }
      viewModel.landtypes[lccc].parcels.push(parcel)
      viewModel.landtypes[lccc].totalArea += area
    } else {
      const parcels = [{
        area,
        id: parcelId
      }]
      viewModel.landtypes[lccc] = { description, parcels, totalArea: area }
    }
  })
  console.log(viewModel)
  return viewModel
}

module.exports = {
  method: 'POST',
  path: '/results',
  handler: async (request, h) => {
    // get sbi ref and make request to rpa land cover api
    console.log(request.payload)
    const { sbi } = request.payload
    // only request response to include data that is used
    const { payload } = await Wreck.get(`LandCovers/MapServer/0/query?where=SBI=${sbi}&outFields=${outputFields.join(',')}&f=geojson&returngeometry=false`,
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
