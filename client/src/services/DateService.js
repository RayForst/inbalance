import moment from 'moment';

const dateFormat = date => `${date.date()} ${date.format('MMMM')}`;

export default {
  eventDate(start, end) {
    const now = moment(new Date());
    const dateStart = moment(start);
    const yearStart = now.year() === dateStart.year() ? false : dateStart.year();

    if (end && start !== end) {
      const dateEnd = moment(end);
      const yearEnd = now.year() === dateEnd.year() ? false : dateEnd.year();

      if (yearEnd) {
        if (dateStart.format('M') === dateEnd.format('M') && dateStart.year() !== dateEnd.year()) {
          // day - day month
          return `${dateFormat(dateStart)} ${dateStart.year()} - ${dateFormat(dateEnd)} ${yearEnd}`;
        }

        if (dateStart.format('M') === dateEnd.format('M')) {
          // day - day month
          return `${dateStart.date()} - ${dateFormat(dateEnd)} ${yearEnd}`;
        }
        // day month - day month
        return `${dateFormat(dateStart)} - ${dateFormat(dateEnd)} ${yearEnd}`;
      }
      if (dateStart.format('M') === dateEnd.format('M')) {
        // day - day month
        return `${dateStart.date()} - ${dateFormat(dateEnd)}`;
      }
      // day month - day month
      return `${dateFormat(dateStart)} - ${dateFormat(dateEnd)}`;
    }

    // day month year
    if (yearStart) {
      return `${dateFormat(dateStart)} ${yearStart}`;
    }

    // day month
    return dateFormat(dateStart);
  },
};
