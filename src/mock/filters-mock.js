import {filters} from '../filter-const.js';

const generateFilters = (points) =>
  Object.entries(filters).map(([filterType, filterPatternByType]) => ({
    type: filterType,
    count: filterPatternByType(points).length,
  }));

export {generateFilters};
