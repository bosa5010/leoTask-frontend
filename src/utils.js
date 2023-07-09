export const objectId = (objects) => {
  if (objects) {
    const tempObjects = objects.map(({ _id }) => _id);
    return tempObjects;
  }
  return [];
};

export const taskModelSystems = (taskModels) => {
  if (taskModels) {
    const tempTaskModels = [];
    taskModels?.systems.forEach((element) => {
      const exit = tempTaskModels?.filter((e) => e._id === element._id);

      if (exit.length === 0) {
        tempTaskModels.push(element);
      }
    });
    return tempTaskModels;
  }

  return [];
};

export const taskModelItems = (taskModels) => {
  if (taskModels) {
    const tempTaskModels = [];
    taskModels?.steps.forEach((step) => {
      step?.items?.forEach((element) => {
        const exit = tempTaskModels?.filter((e) => e._id === element._id);

        if (exit.length === 0) {
          tempTaskModels.push(element);
        }
      });
    });
    return tempTaskModels;
  }

  return [];
};

export const taskModelItemStatus = (items) => {
  if (items) {
    const tempItemStatus = [];

    items?.forEach((item) => {
      item?.itemStatus.forEach((itemStatus) => {
        const exit = tempItemStatus?.filter((e) => e._id === itemStatus._id);

        if (exit.length === 0) {
          tempItemStatus.push(itemStatus);
        }
      });
    });

    return tempItemStatus;
  }

  return [];
};
