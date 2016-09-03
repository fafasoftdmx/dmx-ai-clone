const resolveLegacyImageResources = (imageArray = []) => {
  const globalRE = /carrollgardens/gi;
  const retVal = imageArray
    .filter(item => item.angle && item.full && item.medium && item.small && item.thumb)
    .map(item => ({
      angle: item.angle,
      full: item.full.replace(globalRE, 'media').replace('.svc', '-svc'),
      medium: item.medium.replace(globalRE, 'media').replace('.svc', '-svc'),
      small: item.small.replace(globalRE, 'media').replace('.svc', '-svc'),
      thumb: item.thumb.replace(globalRE, 'media').replace('.svc', '-svc'),
    }));
  return retVal;
};

// NOTE: we don't send to backend dealerId, appraiserId, dateCreated, bidRequestsMade, bids
export const viewToDomain = (vm) => {
  const dm = {};
  dm.isTradeIn = vm.isTradeIn;
  dm.acv = vm.acv;
  dm.recordings = vm.recordings;
  dm.vehicleBuildInfo = {
    vin: vm.generalInfo.vin,
    year: vm.generalInfo.year,
    make: vm.generalInfo.make,
    model: vm.generalInfo.model,
    style: vm.generalInfo.styleId,
    exteriorColor: vm.exteriorColor,
    interiorColor: vm.interiorColor,
    options: vm.options,
    equipment: vm.equipment,
    source: vm.generalInfo.source,
    categories: vm.categories,
  };
  dm.vehicleStateInfo = {
    mileage: vm.mileage,
    condition: {
      paint: vm.ratings && vm.ratings.paint,
      fitAndFinish: vm.ratings && vm.ratings.body,
      interior: vm.ratings && vm.ratings.interior,
      tireAndWheel: {
        overallRating: vm.ratings && vm.ratings.tires,
      },
    },
    media: {
      photos: vm.media,
    },
  };
  return dm;
};

export const domainToView = (dm) => {
  const {
    vehicleStateInfo = {},
    vehicleBuildInfo,
    appraiserId,
    recordings,
    isTradeIn,
    acv,
  } = dm;
  const { bidRequestsMade: bidRequestsMade = 0, bids = [] } = dm.bidActivity || {};
  const vm = {
    id: dm._id,
    dateCreated: dm.createdAt,
    isTradeIn,
    acv,
    bidRequestsMade,
    bids,
    recordings,
    vehicleCategories: vehicleBuildInfo.categories,
    generalInfo: {
      vin: vehicleBuildInfo.vin,
      year: vehicleBuildInfo.year,
      make: vehicleBuildInfo.make,
      model: vehicleBuildInfo.model,
      styleId: vehicleBuildInfo.style,
      source: vehicleBuildInfo.source,
    },
    exteriorColor: vehicleBuildInfo.exteriorColor,
    interiorColor: vehicleBuildInfo.interiorColor,
    options: vehicleBuildInfo.options,
    equipment: vehicleBuildInfo.equipment,
    mileage: vehicleStateInfo.mileage,
    ratings: vehicleStateInfo.condition && {
      paint: vehicleStateInfo.condition.paint,
      body: vehicleStateInfo.condition.fitAndFinish,
      interior: vehicleStateInfo.condition.interior,
      tires: vehicleStateInfo.condition.tireAndWheel.overallRating,
    },
    media: resolveLegacyImageResources(
      vehicleStateInfo.media ? vehicleStateInfo.media.photos : []
    ),
    owner: appraiserId,
    dealerId: dm.dealerId,
  };
  return vm;
};

const appraisalTransformer = { domainToView, viewToDomain };
export default appraisalTransformer;
