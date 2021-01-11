<template lang="pug">
tr(
    :class="{ 'gray': item.proceed == 1 || item.proceed == 2 }"
)
    td # {{ item.id}}
    td {{ orderDate }}
    td 
        | {{ customerName }}
    td {{ customerPhone }}
    td {{ customerEmail }}
    td(style="min-width: 80px;" v-if="coupon")
        s {{ orderAmount }}
        br
        span.coupon(v-if="coupon") Coupon
        br
        | {{ totalDiscount }}
    td(v-else) {{ orderAmount }}
    td(v-if="omniviaFree") Omnivia Free!
    td(v-else) {{ shipping }}
    td(style="min-width: 80px;") {{ total }}
    td(
        v-html="products.join('<br/> ')"
    )
    td(:class="'payment-status-'+paymentStatus") {{ paymentStatus }}
    td
        select(v-model="item.proceed" @change="saveStatus")
            option(value="0") new
            option(value="1") done
            option(value="2") rejected
            option(value="3") in progress
    td 
        a.ui-link(@click.prevent="$emit('view', item.id, shipping, orderAmount, total, coupon, totalDiscount)") view
</template>

<script>
import moment from "moment";
import contentService from "@/services/ContentService";
import currency from "currency.js";
import Prices from "@/services/Prices.js";


export default {
    name: 'checkout-record',
    props: ['item', "index"],
    data() {
        return {
            productsRaw:null,
            products: [],
            productsTemp: []
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
                return `<a href="http://www.inbalans.lv/product/${elem.slug}" target="_blank">${elem.name}</a>`;
            });

            this.productsTemp = products.map(function(elem){
                return `${elem.name}`;
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

                details = `${total.format()}`;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        paymentStatus() {
            let textStatus = 'Pending';

            if (this.item.status === 1) {
                textStatus = 'Done';
            }

              if (this.item.status === 2) {
                textStatus = 'Rejected';
            }

            return textStatus;
        },
        coupon() {
            let details = false;
            
            try {
                let data = JSON.parse(this.item.details);

                details = data.coupon;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        omniviaFree() {
            let res = false;

            
            try {
                let data = JSON.parse(this.item.details);
                let shipping = data.shippingPrice;
                let shippingTotalAmount = 0;

                if (this.productsRaw) {
                    let preperadProducts = this.productsRaw.map(product => {
                        let qnt = data.products.find(el => {
                            return el.id === product.id;
                        });

                        return {
                            price: product.price,
                            quantity: qnt.quantity
                        }
                    });

                    shippingTotalAmount = Prices.calculate(preperadProducts, this.coupon, true, false, false, false);
                }


                if (shipping === 3 && shippingTotalAmount >= 5000) {
                    res = true;
                }
            } catch(e) {
                console.warn(e);
            }

            return res;

        },
        shipping() {
            let details = 'data are corrupted'

            if (this.omniviaFree) {
                return 'Omnivia Free!';
            }
            
            try {
                let data = JSON.parse(this.item.details);
                
                let shipping = data.shippingPrice;

                if (shipping == 0) shipping = 'Free!';
                else shipping = `€  ${shipping}.00`;

                details = shipping;
            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        total() {
           let details = 'data are corrupted'
            
            try {

                let data = JSON.parse(this.item.details);

                if (this.productsRaw) {
                    let preperadProducts = this.productsRaw.map(product => {
                        let qnt = data.products.find(el => {
                            return el.id === product.id;
                        });

                        return {
                            price: product.price,
                            quantity: qnt.quantity
                        }
                    });

                    details = Prices.calculate(preperadProducts, this.coupon, false, false, false, data.shippingPrice);
                }

            } catch(e) {
                console.warn(e);
            }

            return details;
        },
        totalDiscount() {
            let details = 'data are corrupted'
            
            try {

                let data = JSON.parse(this.item.details);

                if (this.productsRaw) {
                    let preperadProducts = this.productsRaw.map(product => {
                        let qnt = data.products.find(el => {
                            return el.id === product.id;
                        });

                        return {
                            price: product.price,
                            quantity: qnt.quantity
                        }
                    });

                    details = Prices.calculate(preperadProducts, this.coupon, false, false, false, false);
                }

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

        // td(v-if="omniviaFree") Omnivia Free!
        // td(v-else) {{ shipping }}
        let shipping = this.omniviaFree ? 'Omnivia Free' : this.shipping;

        const statuses = [
            'new',
            'done',
            'rejected',
            'in progress'
        ];
        let coupon = this.coupon ? 'COUPON' : 'NO COUPON';
        setTimeout(() => {
            console.log(`${this.item.id},${this.orderDate},${this.customerName},${this.customerPhone},${this.customerEmail},${coupon},${this.orderAmount},${shipping},${this.total},${this.productsTemp.join('|')},${this.paymentStatus},${statuses[this.item.proceed]}`);
        }, 500);
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
.payment-status-Rejected {
    background:#f44336;
    color:#fff;
    font-weight bold;
}
.payment-status-Done {
    background:#4caf50;
    color:#fff;
    font-weight bold;
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