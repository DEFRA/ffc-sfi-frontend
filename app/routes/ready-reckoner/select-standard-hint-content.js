function arable (hectares, payment) {
  return `
  <p class="govuk-body-m">Based on ${hectares} hectares, you'll need to change how you manage at least 5% of the arable land area.</p>
  <h2 class="govuk-heading-m">We’ll pay you a minimum of £${payment.toFixed(2)} a year</h2>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

  <h3 class="govuk-heading-m">
    What you need to provide
  </h3>

  <p class="govuk-body-m govuk-!-margin-top-4">
    Use at least <strong>5.0 hectares</strong> of the arable land to provide food, shelter and nesting cover for farmland birds and pollinating insects all year round.
  </p>

  <ul class="govuk-list govuk-list--bullet">
    <li>1.0 hectares nesting and cover</li>
    <li>2.0 hectares for <a href="../../guidance/v3/S010C-pollen-and-nectar-plots" target="_blank">insect and flower-rich habitat (opens in a new tab)</a></li>
    <li>2.0 hectares for winter seed food, choose from:
      <ul class="govuk-list govuk-list--bullet">
        <li>basic overwintered stubble</li>
        <li>enhanced overwintered stubble</li>
        <li>increased plantlife in grass margins and plots</li>
        <li>unharvested cereal headlands</li>
      </ul>
    </li></ul>

    <p>Stubbles can follow cereal, oilseed rape or linseed crops (not maize).</p>

  <p>You'll also need to:</p>
  <ul class="govuk-list govuk-list--bullet">
    <li>maintain a 10-metre buffer radium around in-field trees</li>
    <li>maintain and use a nutrient management plan for manures and fertilisers</li>
    <li>add organic manures and slurry to land you're due to plough</li>
  </ul>


  <h3 class="govuk-heading-s">Choose how you want to feed the birds by</h3>

  <ul class="govuk-list govuk-list--bullet">
    <li>leaving the stubble of previous crops over winter and planting the next crop in spring</li>
    <li>creating flower-rich grass margins and plots
      <ul class="govuk-list govuk-list--bullet">
        <li>create and maintain legume or nectar and flower-rich margins or plots</li>
        <li>planting autumn sown bumblebird mix</li>
        <li>leaving cereal headlands unharvested</li>
      </ul>
    </li>
  </ul>

  <h3 class="govuk-heading-s">This option is not suitable for</h3>

  <ul class="govuk-list govuk-list--bullet">
    <li>high cover of wildflower or bird food</li>
    <li>fields where there is a high risk of erosion as overwintered stubbles maintains bare ground</li>
  </ul>

  <p class="govuk-body-m">Minimum entry requirements should cover ‘good agricultural and environmental conditions’ <a href="#">(GAEC) 4,5 and 6</a>. </p>
  <br>
  `
}

function grassland (hectares, payment) {
  return `
  <p class="govuk-body-m">Based on ${hectares} hectares, you'll need to change how you manage at least 5% of the grassland area.</p>
  <h2 class="govuk-heading-m">We’ll pay you a minimum of £${payment.toFixed(2)} a year</h2>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

  <h3 class="govuk-heading-m">
    What you need to provide
  </h3>

  <p class="govuk-body-m govuk-!-margin-top-4">
    Use at least <strong>5.0 hectares</strong> of grassland area to improve its nutrient condition and reduce the effect of livestock grazing.
  </p>

  <h3 class="govuk-heading-s">Permanent grassland that has not been reseeded for at least 5 years</h3>

  <ul class="govuk-list govuk-list--bullet">
    <li>Maintain a buffer around in-field trees</li>
    <li>Feed livestock outside the buffer area</li>
    <li>Protect trees from damage by livestock where necessary</li>
  </ul>

  <ul class="govuk-list govuk-list--bullet">
    <li>Graze pastures to retain an average sward height of at least 5cm, or graze rotationally, with rest periods</li>
    <li>Leave field corners or areas unmanaged (2.0 hectares of your grassland area)</li>
    <li>In meadows and silage fields, leave at least a third of margins uncut</li>
  </ul>

  <h3 class="govuk-heading-s">Meet standards for soil erosion, water body protection and nutrient inputs</h3>

  <ul class="govuk-list govuk-list--bullet">
    <li>Use suitable alternatives to urea based fertilisers or use urease inhibitors</li>
    <li>Use a nutrient management plan so that, when adding manures and fertilisers, you meet crop and soil requirements</li>
  </ul>

  <p class="govuk-body-m">Minimum entry requirements should cover ‘good agricultural and environmental conditions’ <a href="#">(GAEC) 4,5 and 6</a>.</p>
  <br>
  `
}

function hedgerow (metres, payment) {
  const numTrees = Math.ceil(metres / 400)

  return `
  <p class="govuk-body-m">Based on ${metres} metres</p>
  <h2 class="govuk-heading-m">We’ll pay you a minimum of £${payment.toFixed(2)} a year</h2>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

  <h3 class="govuk-heading-m">
    What you need to provide
  </h3>

  <p class="govuk-body-m govuk-!-margin-top-4">Hedgerows must be:</p>

  <ul class="govuk-list govuk-list--bullet">
    <li>over 20m long</li>
    <li>less than 2m tall from the ground to the base of the leafy layer</li>
    <li>less than 5m wide between major woody stems at the base</li>
  </ul>

  <h3 class="govuk-heading-s">Make a 4 metre buffer strip along both sides of all hedgerows</h3>
  <ul class="govuk-list govuk-list--bullet">
    <li><a href="S041C-establish-and-manage-hedgerows" target="_blank">establish and manage hedgerows (opens in a new tab)</a></li>
    <li>arable field margins</li>
    <li>low input cropped margins</li>
  </ul>

  <h3 class="govuk-heading-s">Cut a maximum of 50% of total hedgerow length each year on rotation</h3>

  <ul class="govuk-list govuk-list--bullet">
    <li>cut no more than half your hedgerows each year</li>
    <li>protect and restore traditional banks and walls using traditional techniques and materials</li>
  </ul>

  <h3 class="govuk-heading-s">Maintain at least ${numTrees} tree${numTrees !== 1 ? 's' : ''} within the hedgerows</h3>

  <ul class="govuk-list govuk-list--bullet">
    <li>hedgerows must have an average density of 1 tree for every 400 metres</li>
    <li>establish trees in field boundaries</li>
    <li>create and maintain buffer strips around high priority feature</li>
  </ul>

  <h3 class="govuk-heading-s">You must not</h3>
  <ul class="govuk-list govuk-list--bullet">
    <li>cultivate or apply fertiliser or pesticide within a 2 metre buffer of the centre of the hedgerow</li>
    <li>cut hedgerows during the bird breeding period of 1 March to 31 August, other than for:
      <ul class="govuk-list govuk-list--bullet">
        <li>safety reasons</li>
        <li>laying</li>
        <li>coppicing</li>
      </ul>
    </li>
  </ul>
  <p class="govuk-body-m">Minimum entry requirements should cover ‘good agricultural and environmental conditions’ <a href="#">(GAEC) 4,5 and 6</a>.</p>
  <br>
  `
}

function woodland (hectares, payment) {
  return `
  <p class="govuk-body-m">Based on ${hectares} metres</p>
  <h2 class="govuk-heading-m">We’ll pay you a minimum of £${payment.toFixed(2)} a year</h2>
  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
  `
}

module.exports = { arable, grassland, hedgerow, woodland }
