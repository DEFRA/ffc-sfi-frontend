function toDisplay (value) {
  return value?.toLocaleString('en-GB', { maximumFractionDigits: 2 }) ?? 'QQQ'
}

function grassland (values) {
  return `
    <p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(values['improved-grassland'])} hectares</a></strong>
    of improved grassland and <strong><a href="/land-calc">${toDisplay(values['unimproved-grassland'])} hectares</a></strong>
    of semi-improved or unimproved grassland, you would receive <strong>£${toDisplay(values.payment)} per year</strong>,
    including <strong>£${toDisplay(values.paymentOptional)}</strong> in extra payments.</p>`
}

function arable (values) {
  return `
    <p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(values.arable)} hectares</a></strong>
    of arable land, you would recieve <strong>£${toDisplay(values.payment)} per year</strong>, including
    <strong>£${toDisplay(values.paymentOptional)}</strong> in extra payments.</p>`
}

function boundary (values) {
  return `
    <p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(values.hedgerows)} hectares</a></strong>
    of hedgerows and <strong><a href="/land-calc">${toDisplay(values['waterbody-buffers'])} hectares</a></strong> of waterbody buffering,
    you would recieve <strong>£${toDisplay(values.payment)} per year</strong>, including
    <strong>£${toDisplay(values.paymentOptional)}</strong> in extra payments.</p>`
}

function woodland (values) {
  return `
    <p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(values.woodland)} hectares</a></strong>
    of farm woodland, you would recieve <strong>£${toDisplay(values.payment)} per year</strong>, including
    <strong>£${toDisplay(values.paymentOptional)}</strong> in extra payments.</p>`
}

module.exports = {
  getFundingBreakdown: (landFeatureCategory, values) => {
    switch (landFeatureCategory) {
      case 'arable':
        return arable(values)
      case 'grassland':
        return grassland(values)
      case 'boundary':
        return boundary(values)
      case 'woodland':
        return woodland(values)
    }
  },
  getTotalFunding: (sfiTotal, sfiMonthly, bpsTotal, total) => {
    return `
      <p class="govuk-body">For SFI you'll get <strong>£${toDisplay(sfiTotal)}</strong> in 12 monthly payments of <strong>£${toDisplay(sfiMonthly)}</strong>.</p>
      <p class="govuk-body">Your BPS payment will be <strong>£${toDisplay(bpsTotal)}</strong>.</p>
      <p class="govuk-body">Total: <strong>£${toDisplay(total)}</strong>.</p>
      <p class="govuk-body">Find out how <a href="">BPS payments are reducing</a>.</p>
      <details class="govuk-details" data-module="govuk-details">
        <summary class="govuk-details__summary">
          <span class="govuk-details__summary-text">How do we calculate this?</span>
        </summary>
        <div class="govuk-details__text">
          We multiply the payment rate for each standard by the number of hectares you enter
        </div>
      </details>`
  }
}
