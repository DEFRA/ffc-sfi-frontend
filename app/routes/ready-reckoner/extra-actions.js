function arableLandBlurb (rate1, rate2) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for each hectare of land</strong> to:</p>
<ol class="govuk-list govuk-list--number">
  <li>Provide food and shelter for farmland wildlife</li>
  <li>Maintain a buffer around in-field trees</li>
  <li>Maintain and use a nutrient management plan</li>
  <li>Mix organic manures and slurry into land you’ll plough</li>
</ol>
<p class="govuk-body">We’ll also pay you an extra <strong>£${rate2} for each tree</strong> you maintain a buffer around.</p>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">arable land standard (opens in a new tab)</a></p>
`
}

function arableSoilsBlurb (rate1, rate2) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for each hectare of land</strong> to:</p>
<ol class="govuk-list govuk-list--number">
  <li>Carry out a soil structure assessment</li>
  <li>Identify areas that can give carbon storage, flood mitigation, water quality or biodiversity</li>
  <li>In areas with soil compaction and run-off, use sub-soiling or cultivations</li>
  <li>Reduce soil compaction by cultivating wet soil and avoiding machinery traffic</li>
</ol>
<p class="govuk-body">We’ll also pay you an extra <strong>£${rate2} a hectare</strong> to establish green cover on land at high risk of surface runoff, soil erosion or regular floods.</p>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">arable and horticultural soils standard (opens in a new tab)</a></p>
`
}

function improvedGrasslandBlurb (rate1, rate2) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for each hectare of land</strong> to:</p>
<ol class="govuk-list govuk-list--number">
  <li>Graze pastures to retain an average sward height of at least 5cm</li>
  <li>leave at least 33% of hay and silage field margins uncut, distributed around cutting fields (2m width minimum)</li>
  <li>Maintain a buffer around in-field trees</li>
  <li>Use a nutrient management plan to ensure that application of manures and fertilisers meets crop and soil requirements</li>
  <li>Take field corners or small areas up to 0.5 ha out of grazing and cutting management (to cover a minimum of 2% of grassland area)</li>
</ol>
<p class="govuk-body">You’ll get an extra <strong>£${rate2} for each tree</strong> you maintain a buffer around.</p>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">improved grassland standard (opens in a new tab)</a></p>
`
}

function improvedGrasslandSoilsBlurb (rate1, rate2, rate3) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for each hectare of land</strong> to:</p>
<ol class="govuk-list govuk-list--number">
  <li>Do a soil assessment to find areas with different soil properties to manage issues like carbon storage and flood risk </li>
  <li>Do a visual soil assessment and identify biological indicators (e.g. simple earthworm count)</li>
  <li>On land with soil compaction and runoff, improve soil structure by practices such as sub-soiling and reduced livestock density</li>
  <li>Reduce the risk of causing soil compaction by avoiding machinery traffic</li>
  <li>On grazed permanent grassland, avoid poaching so that bare ground, without growing plant cover, is limited to no more than 15% of field for more than 30 days</li>
  <li>On grassland at risk of surface runoff, soil erosion or flooding establish grass on at least 25% of the whole field by 1 December</li>
</ol>
<p class="govuk-body">We’ll also pay you an extra:</p>
<ul class="govuk-list govuk-list--bullet">
  <li><strong>£${rate2} a hectare</strong> for reducing or removing livestock from wet soils</li>
  <li><strong>£${rate3} a hectare</strong> for maintaining permanent grassland that you only re-seed by direct drilling or over-sowing.</li>
</ul>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">improved grassland soils standard (opens in a new tab)</a></p>
`
}

function unimprovedGrasslandBlurb (rate1) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for each hectare of land</strong> to:</p>
<ol class="govuk-list govuk-list--number">
  <li>Avoid nutrient inputs on pasture you manage by grazing and topping only</li>
  <li>Maintain a buffer around in-field trees that are over 30cm</li>
  <li>Use organic fertiliser and no more than 12 tha-1 FYM of manure on fields cut for forage.</li>
  <li>Use supplementary feeding that does not cause poaching or overgrazing, and where possible, restrict it to home-produced forage</li>
  <li>Carry out in-channel management in ditches on a rotation of at least 3 years</li>
  <li>Graze pastures to retain an average sward height of at least 5cm, or graze rotationally, with rest periods so that any wild or sown flowers can flower and produce seed.</li>
</ol>
<p class="govuk-body">If you use this standard on <a href="https://www.gov.uk/guidance/protected-areas-sites-of-special-scientific-interest">Site of Special Scientific Interest (SSSI)</a> land and priority habitats, you need to graze and/or cut to maintain <a href="">the appropriate sward height for the grassland type</a>.</p>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">semi-improved and unimproved grassland standard (opens in a new tab)</a></p>
`
}

function woodlandBlurb (rate1, rate2, rate3, rate4) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for unit items</strong> (for example, trees), <strong>£${rate2} a hectare</strong> for established woodland, and <strong>£${rate3} a hectare</strong> for woodland less than 15 years old, to:</p>
<ol class="govuk-list govuk-list--number">
  <li>carry out a woodland condition assessment</li>
  <li>create and manage temporary internal open space and rides</li>
  <li>create and manage deadwood in woodland</li>
  <li>attend an online woodland threats awareness webinar </li>
</ol>
<p class="govuk-body">We’ll also pay you an extra <strong>£${rate4} a year</strong> for assessment and webinar costs</p>
<div class="govuk-inset-text">
  If you need to fell trees to create open space in non-ancient woodland, you might need a felling licence. Check if you need to <a href="https://www.gov.uk/guidance/tree-felling-licence-when-you-need-to-apply">apply for a felling licence</a>.
</div>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">farm woodland standard (opens in a new tab)</a></p>
`
}

function hedgerowBlurb (rate1) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for every 100 metres of land</strong> to:</p>
<ol class="govuk-list govuk-list--number">
  <li>Make a 4 metre buffer strip along both sides of all hedgerows</li>
  <li>Cut a maximum of 50% of total hedgerow length each year on rotation</li>
  <li>Maintain at least 25 trees within the hedgerows</li>
</ol>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">hedgerows standard (opens in a new tab)</a></p>
`
}

function waterbodyBlurb (rate1, rate2) {
  return `<p class="govuk-body">We’ll pay you <strong>£${rate1} for every 100 metres of land</strong> to:</p>
<ol class="govuk-list govuk-list--number">
  <li>Carry out a runoff and soil erosion risk assessment.</li>
  <li>Establish / maintain 6 m waterbody grass buffer strips adjacent to waterbodies.</li>
  <li>Establish in-field grass strips or blocks on cultivated land (this action is optional)</li>
</ol>
<p class="govuk-body">We’ll also pay you an extra <strong>£${rate2} a square meter each year</strong> if you choose to establish in-field grass strips to intercept runoff water.</p>
<p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">waterbody buffering standard (opens in a new tab)</a></p>
`
}

const standards = [
  {
    id: 'arable',
    title: 'Arable land',
    htmlBlurb: arableLandBlurb(26, 13),
    checkboxLabel: 'Add the arable land standard to my calculation'
  },
  {
    id: 'arable-soils',
    title: 'Arable and horticultural soils',
    htmlBlurb: arableSoilsBlurb(30, 114),
    checkboxLabel: 'Add the arable and horticultural soils standard to my calculation'
  },
  {
    id: 'improved-grassland',
    title: 'Improved grassland',
    htmlBlurb: improvedGrasslandBlurb(26, 3),
    checkboxLabel: 'Add the improved grassland standard to my calculation'
  },
  {
    id: 'improved-grassland-soils',
    title: 'Improved grassland soils',
    htmlBlurb: improvedGrasslandSoilsBlurb(6, 88, 224),
    checkboxLabel: 'Add the improved grassland soils standard to my calculation'
  },
  {
    id: 'unimproved-grassland',
    title: 'Semi-improved and unimproved grassland',
    htmlBlurb: unimprovedGrasslandBlurb(60),
    checkboxLabel: 'Add the semi-improved or unimproved grassland standard to my calculation'
  },
  {
    id: 'woodland',
    title: 'Farm woodland',
    htmlBlurb: woodlandBlurb(125, 49, 200, 125),
    checkboxLabel: 'Add the farm woodland standard to my calculation'
  },
  {
    id: 'hedgerows',
    title: 'Hedgerows',
    htmlBlurb: hedgerowBlurb(16),
    checkboxLabel: 'Add the hedgerows standard to my calculation'
  },
  {
    id: 'waterbody',
    title: 'Waterbody buffering',
    htmlBlurb: waterbodyBlurb(16, '3.50'),
    checkboxLabel: 'Add the waterbody buffering standard to my calculation'
  }
]

const pageDetails = {
  path: '/extra-actions',
  nextPath: '/',
  backPath: '/select-std',
  template: 'extra-actions'
}

function pageContent (errorText = null) {
  return {
    title: 'Choose which standards you want to do on your land',
    hint: 'Choose the options you want funding for. We\'ll pay you in monthly instalments so that work can begin without delay.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      standards: standards.map(standard => ({
        title: standard.title,
        htmlBlurb: standard.htmlBlurb,
        checkbox: {
          name: 'standards',
          items: [{ text: standard.checkboxLabel, value: standard.id, id: standard.id }]
        }
      }))
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.view(pageDetails.template, pageContent())
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      const payload = { ...request.payload }
      console.log(payload)

      // if (errorList.length > 0) {
      //   const pageContent = pageContent(updatedStandards, payload, errorList)
      //   return h.view(pageDetails.template, pageContent)
      // }

      return h.redirect(pageDetails.nextPath)
    }
  }
]
