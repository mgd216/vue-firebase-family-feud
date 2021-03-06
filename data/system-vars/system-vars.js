const companyInfo = {
  companyName: 'David Milligan Selections',
  companyShortName: 'DMS Wines',
  slogan: 'The Trusted Choice in Estate Wines',
  formattedAddress: '2 Holden Ct, Sagaponack, NY 11962, USA',
  street: '2 Holden Court',
  street2: 'PO Box 750',
  city: 'Sagaponack',
  state: 'NY',
  zipCode: '11962',
  country: 'USA',
  lat: 0,
  lng: 0,
  phone: '617-875-0933',
  fax: '646-514-8617',
  email: 'alexdmselects@outlook.com',
  website: 'www.davidmilliganselections.com',
}

const wineBottleSizes = [
  {
    id: '375',
    milliliters: 375,
    bottlesPerCase: 12,
    name: 'Half Bottle',
  },
  {
    id: '500',
    milliliters: 500,
    bottlesPerCase: 6,
    name: 'Morning Bottle',
  },
  {
    id: '750',
    milliliters: 750,
    bottlesPerCase: 12,
    name: 'Standard Bottle',
  },
  {
    id: '1500',
    milliliters: 1500,
    bottlesPerCase: 6,
    name: 'Magnum',
  },
]
const wineTypes = ['Red', 'White', 'Sparkling', 'Dessert', 'Rose']

module.exports = {
  companyInfo,
  wineBottleSizes,
  wineTypes,
}
