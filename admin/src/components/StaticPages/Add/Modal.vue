<template lang="pug">
  app-modal(
    v-if="loaded"
    v-show="show"
  )
    .card
      h4.card-title(v-if="isEdit") {{ editHeading }}
      h4.card-title(v-else="isEdit") {{ heading }}
      p.caption(
        v-html="caption"
      )
      app-form(:menu="menuIdea" :isEdit="isEdit")
</template>

<script>
import EventBus from "@/event-bus";
import contentService from "@/services/ContentService";

export default {
  name: "static-list-modal",
  data() {
    return {
      show: false,
      loaded: false,
      heading: "Add Static Page",
      caption: "Fill all rows and save",
      editHeading: "Edit Static Page",
      isEdit: false,
      formKey: "static",
      menuIdea: [
        null,
        null,
        "WELLNESS ПРОЦЕДУРЫ",
        null,
        "МЕРОПРИЯТИЯ",
        "СВЯЗАТЬСЯ С НАМИ",
        "СТАТЬИ"
      ]
    };
  },
  components: {
    appModal: () => import("@/components/Modal/Default.vue"),
    appForm: () => import("./Form.vue")
  },
  methods: {
    async get() {
      const response = (await contentService.productCategories.get({})).data;

      console.log("categories catch", response);

      this.menuIdea[0] = response[0].name;
      this.menuIdea[1] = response[1].name;
      this.menuIdea[3] = response[2].name;

      let selectOptions = this.menuIdea.map((val, index) => {
        return {
          title: val,
          value: index
        };
      });

      this.menuIdea = selectOptions;
      this.loaded = true;
    },
    updateStore(item) {
      this.$store.commit("changeForm", {
        form: this.formKey,
        item
      });
    }
  },
  mounted() {
    this.get();
    EventBus.$on("modal-add-article", () => {
      this.show = true;
    });

    EventBus.$on("modal-edit-static", item => {
      console.log(item);
      this.updateStore(item);
      this.isEdit = true;
      this.show = true;
    });

    EventBus.$on(["modal-close", `form-success-${this.formKey}`], () => {
      this.show = false;
      this.isEdit = false;
      this.$store.commit("clearForm", {
        form: this.formKey
      });
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
