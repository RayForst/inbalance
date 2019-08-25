<template lang="pug">
  app-form(
    :action="action"
    :storeKey="storeKey" 
    :submitText="'Save'"
  )
    .row
      .col-xs-12.col-md-6
        app-form-translate(
          :storeKey="storeKey"
          :isEdit="isEdit"
        )
          template(v-slot:en)
            app-form-input(:name="'name'" :label="'Name'" :required="true")
            app-form-text-editor(:name="'text'" :label="'Text'" :required="true" :key="'en'")
          
          template(v-slot:lv)
            app-form-input(:name="'name_lv'" :label="'Name - LV'" :required="true")
            app-form-text-editor(:name="'text_lv'" :label="'Text - LV'" :required="true" :key="'lv'")
          
          template(v-slot:ru)
            app-form-input(:name="'name_ru'" :label="'Name - RU'" :required="true")
            app-form-text-editor(:name="'text_ru'" :label="'Text - RU'" :required="true" :key="'ru'")

      .col-xs-12.col-md-6
        template(
          v-if="partner"
        )
          app-form-input(v-if="isEdit" :name="'slug'" :label="'URL'" :required="true")
        template(
          v-else
        )
          app-form-input(v-if="isEdit" :disabled="true" :name="'slug'" :label="'URL'" :required="true")
        app-form-select(v-if="loaded" :name="'menupos'" :label="'Menu Category'" :options="menu" :required="true")
        app-form-image(:name="'image'" :label="'Main image'" :required="true")
        app-form-checkbox(:name="'show'" :label="'Show'")
        app-form-input-hidden(v-if="isEdit" :name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "article-add-form",
  props: ["isEdit"],
  data() {
    return {
      storeKey: "static",
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
        "МЕРОПРИЯТИЯ",
        "СВЯЗАТЬСЯ С НАМИ",
        "СТАТЬИ"
      ]
    };
  },
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    },
    partner() {
      return (
        this.slug === "become-a-partner" ||
        this.slug === "become-a-partner-skin-regimen"
      );
    }
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormImage: () => import("@/components/Form/Inputs/Image.vue"),
    appFormCheckbox: () => import("@/components/Form/Inputs/Checkbox.vue"),
    appFormSelect: () => import("@/components/Form/Inputs/Select.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormTranslate: () => import("@/components/Form/Translations")
  },
  methods: {
    async get() {
      const response = (await contentService.productCategories.get({})).data;

      this.menu[0] = response[0].name;
      this.menu[1] = response[1].name;
      this.menu[3] = "WELLNESS PRODUCTS";

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
