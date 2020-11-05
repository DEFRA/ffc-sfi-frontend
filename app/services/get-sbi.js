const Wreck = require('@hapi/wreck')

const outputFields = [
  'area_ha', 'description', 'land_cover_class_code', 'parcel_id'
]

function processLandCover (data) {
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

async function getSBI (sbi) {
  const { payload } = await Wreck.get(`LandCovers/MapServer/0/query?where=SBI=${sbi}&outFields=${outputFields.join(',')}&f=geojson&returngeometry=false`,
    {
      baseUrl: 'https://environment.data.gov.uk/arcgis/rest/services/RPA/',
      json: true
    })
  return processLandCover(payload)
}

module.exports = getSBI
