export function composeJourneyMessage(
  taxiCost: number,
  carCost: number,
  numPassenger: number
): string {
  let message = '';
  const suffix = numPassenger > 4 ? 's' : '';
  if (taxiCost === carCost)
    message = `Taxi${suffix} or car${suffix}... I estimate that it won't matter
               as both will cost about £${taxiCost.toFixed(2)}`;
  else if (taxiCost < carCost)
    message = `Taxi${suffix} will be cheaper costing about £${taxiCost.toFixed(2)}
              which is £${(carCost - taxiCost).toFixed(2)} less than taking the car${suffix}`;
  
  else
    message = `Car${suffix} will be cheaper costing about £${carCost.toFixed(2)}
              which is £${(taxiCost - carCost).toFixed(2)} less than taking the taxi${suffix}`;

  return message;
}
