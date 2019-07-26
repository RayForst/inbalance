<template lang="pug">
  app-form(
    :action="action"
    :storeKey="'static'" 
    :submitText="'Save'"
  )
    .row
      .col-xs-12.col-md-6
        app-form-input(:name="'name'" :label="'Name'" :required="true")
        app-form-select(v-if="loaded" :name="'menupos'" :label="'Menu Category'" :options="menu" :required="true")
        app-form-image(:name="'image'" :label="'Main image'" :required="true")
      .col-xs-12.col-md-6
        app-form-text-editor(:name="'text'" :label="'Text'" :required="true")
        template(
          v-if="isEdit"
        )
          app-form-input-hidden(:name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "article-add-form",
  props: ["isEdit"],
  data() {
    return {
      loaded: false,
      categories: [],
      actions: {
        add: "/static",
        edit: "/static/edit"
      },
      menu: [
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
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    }
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormImage: () => import("@/components/Form/Inputs/Image.vue"),
    appFormSelect: () => import("@/components/Form/Inputs/Select.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue")
  },
  methods: {
    async get() {
      const response = (await contentService.productCategories.get({})).data;

      this.menu[0] = response[0].name;
      this.menu[1] = response[1].name;
      this.menu[3] = response[2].name;

      let selectOptions = this.menu.map((val, index) => {
        return {
          title: val,
          value: index
        };
      });

      this.menu = selectOptions;
      this.loaded = true;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
