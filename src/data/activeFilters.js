/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { getDefaultFilter } from '../constants/filters';

//starting filters
export const activeFilters = {
  sort: 'name',
};

const callbacks = [];

const safelyRunCallback = (cb, force) => {
  try {
    cb(activeFilters, force);
  } catch (err) {
    console.error(err);
  }
};

const safelyRunCallbacks = (force) => {
  callbacks.forEach(cb => safelyRunCallback(cb, force));
};

export const onFilterChange = (cb) => {
  callbacks.push(cb);
  safelyRunCallback(cb);
  return function deregister() {
    callbacks.splice(callbacks.indexOf(cb), 1);
  };
};

export const setFilter = (filterPatch, force = false) => {
  Object.assign(activeFilters, filterPatch);

  //remove nulls from filters
  Object.keys(activeFilters).forEach(key => {
    if (activeFilters[key] === null) {
      delete activeFilters[key];
    }
  });

  safelyRunCallbacks(force);

  return activeFilters;
};

export const toggleDiscreteFilter = (field, value) => {
  const filter = activeFilters[field];
  const defaultFilter = getDefaultFilter(field);

  let next = Object.assign({}, defaultFilter, filter);
  if (next[value]) {
    delete next[value];
  } else {
    next[value] = true;
  }

  if (Object.keys(next).length === 0) {
    next = null;
  }

  setFilter({ [field]: next });
};

export const toggleSortFilter = (field) => {
  const filter = activeFilters.sort;
  if (!filter || filter !== field) {
    setFilter({ sort: field });
    return;
  }
  setFilter({ sort: 'name' });
};

export const resetFilter = (field, force) => {
  return setFilter({ [ field ]: null }, force);
};

export default activeFilters;
