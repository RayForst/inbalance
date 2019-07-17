<template lang="pug">
  app-form(
    :action="action"
    :storeKey="'event'" 
    :submitText="'Save'"
  )
    .row
      .col-xs-12.col-md-6
        app-form-input(:name="'name'" :label="'Name'" :required="true")
        app-form-input(:name="'caption'" :label="'Caption - only for priority events'")
        app-form-datepicker(:name="'dateStart'" :label="'Date start'" :required="true")
        app-form-datepicker(:name="'dateEnd'" :label="'Date end'")
        app-form-input(:name="'priority'" :label="'Priority'" :type="'checkbox'")
        app-form-input(:name="'preview'" :label="'Only preview'" :type="'checkbox'")
      .col-xs-12.col-md-6
        app-form-text-editor(:name="'description'" :label="'Description'" :required="true")
        app-form-image(:name="'image'" :label="'Main image'" :required="true")
        app-form-images(:name="'images'" :label="'Additional images'")
        app-form-input-hidden(v-if="isEdit" :name="'id'")
</template>

<script>
export default {
  name: "event-add-form",
  props: ["isEdit"],
  data() {
    return {
      categories: [],
      actions: {
        add: "/events",
        edit: "/events/edit"
      }
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormDatepicker: () => import("@/components/Form/Inputs/Datepicker.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormImage: () => import("@/components/Form/Inputs/Image.vue"),
    appFormImages: () => import("@/components/Form/Inputs/Images.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue")
  },
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
