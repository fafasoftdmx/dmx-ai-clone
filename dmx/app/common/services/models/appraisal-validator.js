export function mileageComplete(appraisal) {
  const { mileage } = appraisal;
  return mileage && !isNaN(mileage) && mileage > 0;
}

export function colorsComplete(appraisal) {
  const { exteriorColor, interiorColor } = appraisal;
  const colorValid = (color) => color &&
    color.name && color.name.length > 0 &&
    color.id && color.id.length > 0 &&
    color.colorChips;
  return colorValid(exteriorColor) && colorValid(interiorColor);
}

export function imagesComplete(appraisal) {
  const { media } = appraisal;
  return media && media.length > 0;
}

export function ratingsComplete(appraisal) {
  const { ratings } = appraisal;
  return ratings &&
    ratings.paint && !isNaN(ratings.paint) &&
    ratings.body && !isNaN(ratings.body) &&
    ratings.interior && !isNaN(ratings.interior) &&
    ratings.tires && !isNaN(ratings.tires);
}

export function isComplete(appraisal) {
  const { generalInfo } = appraisal;

  const generalInfoValid = generalInfo &&
    generalInfo.vin && generalInfo.vin.length > 0 &&
    generalInfo.year && !isNaN(generalInfo.year) &&
    generalInfo.make && generalInfo.make.length > 0 &&
    generalInfo.model && generalInfo.model.length > 0 &&
    generalInfo.styleId && generalInfo.styleId.length > 0;

  return generalInfoValid &&
    mileageComplete(appraisal) &&
    colorsComplete(appraisal) &&
    ratingsComplete(appraisal) &&
    imagesComplete(appraisal);
}
