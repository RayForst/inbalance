<template lang="pug">
  .event-preview.flex-col.middle-xs
    list-edit-on-click(
      @edit="edit(item)"
    )
      .image-prev
        .image(
          :style="{ backgroundImage: `url(${image})` }"
        )
        .overlay
          .name {{ item.name }}
          .date {{ date }}

        .ui-badges
          .badge(v-if="item.priority") priority
          .badge.blue(v-if="item.preview") preview
</template>

<script>
import moment from "moment";
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "events-list-item",
  props: ["item"],
  data() {
    return {
      img: "road.jpg"
    };
  },
  methods: {
    dateFormat(date) {
      return `${date.date()} ${date.format("MMMM")}`;
    },
    edit(item) {
      EventBus.$emit("form-edit", item);
    }
  },
  computed: {
    image() {
      const path = `/uploads/${this.item.image}`;

      return path;
    },
    date() {
      const now = moment(new Date());
      const dateStart = moment(this.item.dateStart);
      const yearStart =
        now.year() === dateStart.year() ? false : dateStart.year();

      if (this.item.dateEnd && this.item.dateStart != this.item.dateEnd) {
        const dateEnd = moment(this.item.dateEnd);
        const yearEnd = now.year() === dateEnd.year() ? false : dateEnd.year();

        if (yearEnd) {
          if (
            dateStart.format("M") === dateEnd.format("M") &&
            dateStart.year() !== dateEnd.year()
          ) {
            // day - day month
            return `${this.dateFormat(
              dateStart
            )} ${dateStart.year()} - ${this.dateFormat(dateEnd)} ${yearEnd}`;
          }

          if (dateStart.format("M") === dateEnd.format("M")) {
            // day - day month
            return `${dateStart.date()} - ${this.dateFormat(
              dateEnd
            )} ${yearEnd}`;
          } else {
            // day month - day month
            return `${this.dateFormat(dateStart)} - ${this.dateFormat(
              dateEnd
            )} ${yearEnd}`;
          }
        } else {
          if (dateStart.format("M") === dateEnd.format("M")) {
            // day - day month
            return `${dateStart.date()} - ${this.dateFormat(dateEnd)}`;
          } else {
            // day month - day month
            return `${this.dateFormat(dateStart)} - ${this.dateFormat(
              dateEnd
            )}`;
          }
        }
      }

      // day month year
      if (yearStart) {
        return `${this.dateFormat(dateStart)} ${yearStart}`;
      }

      // day month
      return this.dateFormat(dateStart);
    }
  },
  components: {
    listEditOnClick: () => import("@/components/List/ItemEdit.vue")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.event-preview {
  margin-bottom: 20px;

  .image-prev {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    border: 1px solid rgba(#dfe2e1, 0.7);
    border-radius: 5px;
    position: relative;

    &:before {
      content: '';
      display: block;
      padding-top: 54%;
    }

    .image {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center center;
    }

    .overlay {
      position: absolute;
      top: 0px;
      left: 0px;
      color: #fff;
      height: 100%;
      background-image: linear-gradient(to bottom, rgba(97, 118, 127, 0), rgba(0, 0, 0, 0.81));
      display: flex;
      align-items: flex-end;
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
    }

    .name {
      font-size: 13px;
      line-height: 1.5em;
      text-transform: uppercase;
    }
  }

  .date {
    font-size: 12px;
    line-height: 1.33em;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: gray;
    position: absolute;
    top: 10px;
    color: #fff;
    background: #103324;
    padding: 5px 12px;
  }
}
</style>
