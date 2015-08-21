var VATCalculator = function () {
	'use strict';
	var euCodes =
		['BG', 'CZ', 'DK', 'DE', 'EE', 'IE', 'GR', 'ES', 'FR', 'HR', 'IT', 'CY',
		 'LV', 'LT', 'LU', 'HU', 'MT', 'NL', 'AT', 'PL', 'PT', 'RO', 'SI', 'SK',
		 'FI', 'SE', 'GB'];
	this.getDesignatedVATCountry = function (ipCountry, deliveryCountry, billingCountry) {
      var isIpEU = euCodes.indexOf(ipCountry) >= 0,
		  isDeliveryEU = euCodes.indexOf(deliveryCountry) >=0,
		  isBillingEU = euCodes.indexOf(billingCountry) >=0;
	  if (!isIpEU && !isDeliveryEU && !isBillingEU) {
		return false;
	  }
	  if (isIpEU && (ipCountry === deliveryCountry || ipCountry === billingCountry)) {
		  return ipCountry;
	  }
	  if (isBillingEU && billingCountry === deliveryCountry) {
		  return billingCountry;
	  }
	  if (isDeliveryEU) {
		  return deliveryCountry;
	  }
	  if (isBillingEU) {
		  return billingCountry;
	  }
	  if (isIpEU) {
		  return ipCountry;
	  }
	  return deliveryCountry;
	};
};
