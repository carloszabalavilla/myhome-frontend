export function localDate(value = new Date()) {
  return [value.getFullYear(), String(value.getMonth() + 1).padStart(2, "0"), String(value.getDate()).padStart(2, "0")].join("-");
}
export function taskPayload(values, userId, original) {
  return {
    ...values, id: original?.id || 0, user: userId, createdBy: original?.createdBy || userId,
    date: values.date + "T00:00:00Z",
    startHour: values.date + "T" + values.startHour.substring(0, 5) + ":00Z",
    endHour: values.date + "T" + values.endHour.substring(0, 5) + ":00Z",
    createdAt: (original?.createdAt || localDate()) + "T00:00:00Z",
    isDone: original?.done || original?.isDone || false
  };
}
