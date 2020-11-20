  <template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            .card
              .row
                app-list-header(
                  :icon="icon"
                  :title="title"
                  :sup="items.length"
                )
              .row
                .col-xs-12
                  table.ui-table
                    tr
                      th id
                      th date
                      th customer
                      th phone
                      th email
                      th amount
                      th shipping
                      th total
                      th products
                      th payment status
                      th status
                      th action
                    appCheckoutItem(
                      v-for="item, index in items.slice(offset, onPage + offset)" 
                      :key="item.id" 
                      :item="item"
                      :index="index"
                      @view="drawViewModal"
                    )
              .row
                .col-xs-12
                  app-pagination(
                    :total="items.length" 
                    :perPage="onPage" 
                    :current="page"
                    @newpage="changePage"
                  )
              app-modal(
                v-if="show"
              )
                .card
                  h4.card-title Order details
                  div(v-html="modalData")
</template>


<script>
import contentService from "@/services/ContentService";
import appCheckoutItem from "@/components/Checkouts/Item";
import EventBus from "@/event-bus";


export default {
  metaInfo: {
    title: "Checkouts"
  },
  name: "Checkouts",
  data() {
    return {
      title: "Checkouts",
      icon: "nc-send",
      show: false,
      items: [],
      modalData: '',
      onPage: 12,
      page: 0
    };
  },
  computed: {
    offset() {
      return this.page > 0 ? this.page * this.onPage : 0;
    }
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appEditor: () => import("@/components/Translations/JsonForm"),
    appListHeader: () => import("@/components/List/Header"),
    appModal: () => import("@/components/Modal/Default.vue"),
    appPagination: () => import("@/components/List/Pagination"),
    appCheckoutItem
  },
  methods: {
    async get() {
      this.items = (await contentService.checkouts.get({})).data;
    },
    modalHideClass(value) {
      return !value ? 'style="display:none"' : '';
    },
    drawViewModal(itemId, shipping, amount, total) {
      this.show = true;

      try {
        const item = this.items.find( item => item.id === itemId) ;
        const details = JSON.parse(item.details);
        console.log(details);

        const personType = details.form.status == 'phiz' ? 'physical' : 'juridical';

        this.modalData = `
          <table class="ui-table">
            <tr>
              <td><b>Person type</b></td>
              <td>${personType}</td>
            </tr>
            <tr>
              <td><b>First Name</b></td>
              <td>${details.first_name}</td>
            </tr>
            <tr>
              <td><b>Last Name</b></td>
              <td>${details.last_name}</td>
            </tr>
            <tr>
              <td><b>E-mail</b></td>
              <td>${details.email}</td>
            </tr>
            <tr>
              <td><b>Phone</b></td>
              <td>${details.phone}</td>
            </tr>
            <tr>
              <td><b>Coutry</b></td>
              <td>${details.phone}</td>
            </tr>
            <tr>
              <td><b>City</b></td>
              <td>${details.phone}</td>
            </tr>
            <tr>
              <td><b>Address</b></td>
              <td>${details.address_line_1} ${details.address_line_2}</td>
            </tr>
            <tr>
              <td><b>Post code</b></td>
              <td>${details.postcode}</td>
            </tr>
            <tr ${this.modalHideClass(details.company)}>
              <td><b>Company</b></td>
              <td>${details.company}</td>
            </tr>
            <tr ${this.modalHideClass(details.company_rn)}>
              <td><b>Company reg. number</b></td>
              <td>${details.company_rn}</td>
            </tr>
            <tr ${this.modalHideClass(details.taxnum)}>
              <td><b>Taxpay number</b></td>
              <td>${details.taxnum}</td>
            </tr>
            <tr ${this.modalHideClass(details.jur_addr)}>
              <td><b>Juridical address</b></td>
              <td>${details.jur_addr}</td>
            </tr>
            <tr ${this.modalHideClass(details.fac_addr)}>
              <td><b>Factical address</b></td>
              <td>${details.fac_addr}</td>
            </tr>
            <tr>
              <td><b>Amount</b></td>
              <td>${amount}</td>
            </tr>
            <tr>
              <td><b>Shipping</b></td>
              <td>${shipping}</td>
            </tr> 
            <tr>
              <td><b>Total</b></td>
              <td>${total}</td>
            </tr>  
          </table>
        `
      } catch (e) {
        this.modalData = `data corrupted`;
      }
    },
    changePage(event, lala) {
      this.page = event;
    }
  },
  mounted() {
    this.get();

    EventBus.$on(["modal-close"], () => {
      this.show = false;
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
th {
  text-transform:capitalize;
}
</style>
