<template lang="pug">
  .event-calendar
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        h1 {{ $t('events.calendar.title')}}
        .month.container
          .control.left(@click="draw('past')")
            img.icon(:src="require('@/assets/img/calendar-arrow.svg')" alt="")
          .month-name {{ calendarMonth }}
          .control.right(@click="draw('next')")
            img.icon(:src="require('@/assets/img/calendar-arrow.svg')" alt="")
        ol.calendar
          li.calendar-day(
            v-for="day, index in days"
            :data-weekday="daysOfWeek[index % 7]" 
            :class="{ 'calendar-day--begin-week': index === 0, 'calendar-day--not-month': day.hasOwnProperty('pastMonth') && day.pastMonth }"
            v-if="index < 35 || index >= 35 && days[35].pastMonth != true"
          )
            span.calendar-day__number(:class="{ today: today && day.number === today && !day.pastMonth }") {{ day.number }}
            .calendar-day__content
              template(v-if="day.events")
                router-link(:to="{ name: 'event', params: {slug: event.slug } }").event(v-for="event, index in day.events" :key="index")
                  .name {{ event.name }}
</template>

<script>
import EventBus from "@/event-bus";
import moment from "moment";

export default {
  name: "event-calendar",
  props: ["items", "date"],
  data() {
    return {
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      days: [
        {
          number: 25,
          pastMonth: true
        },
        {
          number: 26,
          pastMonth: true
        },
        {
          number: 27,
          pastMonth: true
        },
        {
          number: 28,
          pastMonth: true
        },
        {
          number: 1
        },
        {
          number: 2
        },
        {
          number: 3
        },
        {
          number: 4
        },
        {
          number: 5
        },
        {
          number: 6
        },
        {
          number: 7
        },
        {
          number: 8
        },
        {
          number: 9
        },
        {
          number: 10
        },
        {
          number: 11
        },
        {
          number: 12
        },
        {
          number: 13
        },
        {
          number: 14
        },
        {
          number: 15
        },
        {
          number: 16
        },
        {
          number: 17
        },
        {
          number: 18
        },
        {
          number: 19
        },
        {
          number: 20
        },
        {
          number: 21
        },
        {
          number: 22
        },
        {
          number: 23
        },
        {
          number: 24
        },
        {
          number: 25
        },
        {
          number: 26
        },
        {
          number: 27
        },
        {
          number: 28
        },
        {
          number: 29
        },
        {
          number: 30
        },
        {
          number: 31
        },
        {
          number: 28
        },
        {
          number: 29
        },
        {
          number: 30
        },
        {
          number: 31
        },
        {
          number: 28
        },
        {
          number: 29
        },
        {
          number: 30
        }
      ]
    };
  },
  watch: {
    items: function(newVal, oldVal) {
      this.buildMonth();
    }
  },
  computed: {
    today() {
      const now = moment();

      if (
        this.date !== "" &&
        now.month() === this.date.month() &&
        now.year() === this.date.year()
      ) {
        return now.date();
      }

      return false;
    },
    calendarMonth() {
      return this.date !== "" ? this.date.format("LL") : "";
    }
  },
  methods: {
    draw(direction) {
      EventBus.$emit("draw-calendar", direction);
    },
    buildMonth() {
      if (this.date != "") {
        let date = this.date;
        let monthDates = this.days;

        this.days = [];

        date.set("date", 1);

        let pastMonthOver = false;

        monthDates.forEach((dayObject, index) => {
          // clear events
          monthDates[index].events = [];

          let daysOfWeek = date.day();
          daysOfWeek = daysOfWeek === 0 ? (daysOfWeek = 6) : (daysOfWeek -= 1);

          let daysInMonth = date.daysInMonth();

          if (index === daysOfWeek) {
            pastMonthOver = true;
          }

          if (!pastMonthOver) {
            monthDates[index].pastMonth = true;
            monthDates[index].number = null;
          } else {
            monthDates[index].pastMonth = false;
            let dayNumber = index - daysOfWeek + 1;

            monthDates[index].number = dayNumber;

            this.items.forEach(element => {
              if (moment(element.dateStart).date() == dayNumber) {
                monthDates[index].events.push({
                  name: element.name,
                  slug: element.slug
                });
              }
            });

            if (dayNumber > daysInMonth) {
              dayNumber -= daysInMonth;
              monthDates[index].pastMonth = true;
              monthDates[index].number = null;
            }
          }
        });

        this.days.splice(0, this.days.length);
        this.days.push(...monthDates);
      }
    }
  },
  mounted() {
    this.buildMonth();
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/css/_variables';

.month.container {
  margin-top: 50px;
  position: relative;
}

.month-name {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.1em;
  text-align: center;
  color: #103324;
  text-transform: uppercase;
  height: 19px;
}

h1 {
  font-size: 36px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.28em;
  letter-spacing: normal;
  color: #000000;
}

.month {
  background-color: #fafafb;
}

.control {
  height: 59px;
  width: 59px;
  position: absolute;
  top: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  .icon {
    margin: 0;
  }

  &.left {
    .icon {
      transform: rotate(-180deg);
    }
  }
}

.calendar {
  list-style: none;
  font-size: 1.4rem;
  padding-left: 50px;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 60px;
  border-bottom: 1px solid #efefef;

  @media $media_sm {
    padding-left: 0;
  }
}

.calendar-day {
  color: #000;
  position: relative;
  box-sizing: border-box;
  border: 1px solid;
  border-left: none;
  border-bottom: none;
}

.calendar-day:nth-child(7n+1)::before {
  content: attr(data-week);
  position: absolute;
  color: #999;
}

.calendar-day::after {
  content: attr(data-weekday);
  position: absolute;
  color: #999;
}

.calendar-day__content {
  background: #fff;
}

.calendar-day--not-month .calendar-day__content {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}

.calendar-day--today .calendar-day__content {
  background-color: #67c77c;
}

..calendar-day__content {
  background-color: #ab6381;
}

.calendar-day__number {
  position: absolute;
  top: 6px;
  left: auto;
  right: 6px;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  text-align: center;
  color: #8a888a;
  width: 30px;
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  &.today {
    background: #103324;
    color: #fff;
  }
}

@media $media_xs_max {
  .calendar-day {
    margin: 5px;
  }

  .calendar-day:nth-child(7n+1)::before {
    left: 0;
    right: 0;
    bottom: calc(100% + 0.5rem);
    display: block;
    text-align: center;
  }

  .calendar-day::after {
    right: calc(100% + 0.5rem);
    top: 0.5rem;
  }

  .calendar-day--not-month {
    display: none;
  }

  .calendar-day--begin-week {
    margin-top: 3rem;
  }

  .calendar-day__content {
    padding: 0 0 20%;
  }
}

@media $media_sm {
  .calendar {
    display: flex;
    flex-wrap: wrap;
  }

  .calendar-day {
    flex-basis: calc(14.28571% - 2px);
    border: 1px solid #efefef;
    border-left: none;
    border-bottom: none;

    &[data-weekday='Mon'] {
      border-left: 1px solid #efefef;
    }
  }

  .calendar-day:nth-child(7n+1)::before {
    right: calc(100% + 0.5rem);
    top: 0.5rem;
  }

  .calendar-day::after {
    display: none;
  }

  .calendar-day:nth-child(-n+7)::after {
    display: inline;
    bottom: calc(100% + 0.2rem);
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Lora';
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #7e8f97;
    text-transform: uppercase;
    padding: 20px;
    padding-bottom: 16px;
  }

  .calendar-day--not-month {
    display: block;
  }

  .calendar-day--past .calendar-day__number {
    opacity: 0.5;
  }

  .calendar-day__content {
    min-height: 122px;
    padding: 8px;
    padding-top: 50px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
}

.event {
  background: rgb(207, 214, 211);
  border-left: 4px solid #103324;
  font-family: 'Lora';
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  color: #103324;
  padding: 10px;
  border-radius: 0 3px 3px 0;
  padding-right: 7px;
  padding-left: 5px;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  text-align: left;
}
</style>
