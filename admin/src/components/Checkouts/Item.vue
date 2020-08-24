<template lang="pug">
tr(
    :class="{ 'gray': item.proceed == 1 || item.proceed == 2 }"
)
    td # {{ item.id}}
    td {{ orderDate }}
    td 
        | {{ customerName }}
        span.coupon(v-if="coupon") Coupon
    td {{ customerPhone }}
    td {{ customerEmail }}
    td {{ orderAmount }}
    td {{ shipping }}
    td {{ total }}
    td(
        v-html="products.join('<br/> ')"
    )
    td
        select(v-model="item.proceed" @change="saveStatus")
            option(value="0") new
            option(value="1") done
            option(value="2") rejected
            option(value="3") in progress
    td 
        a.ui-link(@click.prevent="$emit('view', item.id, shipping, orderAmount, total)") view
</template>

<script>
import moment from "moment";
import contentService from "@/services/ContentService";
import currency from "currency.js";


export default {
    name: 'checkout-record',
    props: ['item', "index"],
    data() {
        return {
            productsRaw:null,
            products: [

            ]
        }
    },
    methods: {
        async getProducts() {
            let details = []
            
            try {
                let data = JSON.parse(this.item.details);
                details = data.products;
            } catch(e) {
                console.warn(e);
            }

            const products = (await contentService.products.getById({
                poducts: JSON.stringify(details)
            })).data;

            this.productsRaw = products;
            this.products = products.map(function(elem){
                return `<a href="http://inbalans.lv/product/${elem.slug}" target="_blank">${elem.name}</a>`;
            });
        },
        async saveStatus() {
            let proceed = this.item.proceed;
            let id = this.item.id;

            const result = (await contentService.checkouts.save({
                id,
                proceed
            })).data;

            this.$notify({
                group: "main",
                title: "Saved!",
                type: "success",
                text: `Item was succesfuly updated`,
                duration: 5000
            });

            return true;
        }
    },
    computed: {
         orderAmount() {
            let details = 'data are corrupted'
            
            try {
                 let euro = value =>
                currency(value, { symbol: "€ ", separator: " ", decimal: "." });
                let total = euro(0);

                let data = JSON.parse(this.item.details);

                if (this.productsRaw) {
                    this.productsRaw.forEach(x => {
                        let qnt =  data.products.find(el => {
                            return el.id === x.id;
                        });

                        qnt = qnt.quantity;
    
    
                        total = total.add(euro(x.price).multiply(qnt));;
                    })
                }

                details = `${total.format()} EUR`;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
         coupon() {
            let details = 'data are corrupted'
            
            try {
                let data = JSON.parse(this.item.details);

                details = data.coupon;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        shipping() {
            let details = 'data are corrupted'
            
            try {
                let data = JSON.parse(this.item.details);
                
                console.log(data);
                let shipping = data.shippingPrice;

                if (shipping == 0) shipping = 'Free!';
                else shipping = `€  ${shipping}.00 EUR`;

                details = shipping;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        total() {
            let details = 'data are corrupted'
            
            try {
                 let euro = value =>
                currency(value, { symbol: "€ ", separator: " ", decimal: "." });
                let total = euro(0);

                let data = JSON.parse(this.item.details);

                if (this.productsRaw) {
                    this.productsRaw.forEach(x => {
                        let qnt =  data.products.find(el => {
                            return el.id === x.id;
                        });

                        qnt = qnt.quantity;
    
    
                        total = total.add(euro(x.price).multiply(qnt));;
                    })

                    total = total.add(euro(data.shippingPrice));
                }

                details = `${total.format()} EUR`;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        customerName() {
            let details = 'data are corrupted'
            
            try {
                let data = JSON.parse(this.item.details);
                details = `${data.first_name} ${data.last_name}`;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        customerPhone() {
            let details = 'data are corrupted'
            
            try {
                let data = JSON.parse(this.item.details);
                details = `${data.phone}`;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        customerEmail() {
            let details = 'data are corrupted'
            
            try {
                let data = JSON.parse(this.item.details);
                details = `${data.email}`;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        orderDate() {
            return moment(this.item.createdAt).format("lll");
        },
        orderStatus() {
            return 'new';
        }
    },
    mounted() {
        this.getProducts();
    }
}
</script>


<style lang="stylus" scoped>
select {
    width: 100%;
    line-height: 20px;
    font-size: 16px;
    padding: 6px 0;
}

tr {
    &.gray {
        background: #8080801f;
        opacity: 0.4;
    }
}
th, .ui-link {
    text-transform: capitalize;
}

.coupon {
    background: #009688;
    padding: 2px 9px;
    color: #fff;
    line-height: 15px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.075em;
    text-align: center;
    margin-left: 10px;
}
</style>