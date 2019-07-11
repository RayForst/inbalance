<template lang="pug">
  div.static
    .content-container.content
      app-back
      .row
        .col-xs-9.article-conntainer
          .container(v-if="item")
            h1 {{ item.name }}
            img.width-100(
              :src="'/uploads/'+image"
            )
          .container
            p(
              v-if="item"
              v-html="item.text"
            )
            //- p.weight-300 
            //-   i Мы убеждены в том, что Мир целостен и отдельные его части не могут рассматриваться обособленно от других, поэтому во всех сферах жизни, в том числе в уходе за собой, холистический подход – самый эффективный.
            //- p.weight-300 We welcomed our Community to places that reflect the highest expression of creativity and care, great value to us, such as Carlo and Camilla in Segheria, in Milan, and Rocca Meli Lupi di Soragna, to a medieval castle garnished with frescoes ceilings and baroque statues, for the Gala Dinner.<br><br>And, of course, we also fed the mind during the three days of Conference featuring on-stage international researchers with a cutting-edge perspective on social and beauty changes, as well as a new big product launch.<br><br>The four-day journey started in Milan, at Officine del Volo, with a very special evening dedicated to /skin regimen/ with top speakers and a very engaging brand immersion.
            //- .spacer
            //- .videoWrapper
            //-   <iframe width="560" height="349" src="https://www.youtube.com/embed/n_dZNLr2cME?rel=0&hd=1" frameborder="0" allowfullscreen></iframe>
            //- .spacer
            //- .spacer
            //-  .spacer
            //- a.article-link(href='#') https://youtu.be/BjT-QOqsjz4?t=12m8s
            .spacer
        .col-xs-3.aside
          .offset-heading
            .offset-heading__text Recent POSTs
          .article-list
            app-recent-post(v-for="item,index in list" :key="index" :item="item")
          //- .offset-heading
          //-   .offset-heading__text Categories
          //- ul.categories
          //-   li
          //-     a(href='#') What’s new
          //-   li
          //-     a(href='#') Tutorials
          //-   li
          //-     a(href='#') Interviews
          //-   li
          //-     a(href='#') Insights
          //-   li
          //-     a(href='#') Tips
          //- .offset-heading
          //-   .offset-heading__text Tags
          //- .tag-list
          //-   .ui-tag.ui-tag--white Fashion
          //-   .ui-tag.ui-tag--white Fashion
          //-   .ui-tag.ui-tag--white Fashion
          //-   .ui-tag.ui-tag--white Fashion
          //-   .ui-tag.ui-tag--white Fashion
          //-   .ui-tag.ui-tag--white Fashion
      .spacer

</template>

<script>
import appProducts from "@/components/products/ListPreview";
import appSubscribe from "@/components/Subscribe";
import appBack from "@/components/Back";
import appRecentPost from "@/components/articles/RecentPost";
import contentService from "@/services/ContentService";

export default {
  metaInfo: {
    title: "Static page"
  },
  props: ["slug"],
  name: "static",
  data() {
    return {
      item: null,
      productsHeading: "Мы рекомендуем также эти товары",
      products: [
        {
          name: "Product 1"
        },
        {
          name: "Product 2"
        },
        {
          name: "Product 3"
        },
        {
          name: "Product 4"
        },
        {
          name: "Product 5"
        },
        {
          name: "Product 6"
        }
      ],
      list: []
    };
  },
  components: {
    appProducts,
    appSubscribe,
    appBack,
    appRecentPost
  },
  computed: {
    image() {
      return this.item.hasOwnProperty("image")
        ? this.item.image
        : "default.png";
    }
  },
  methods: {
    async get() {
      const response = (await contentService.articles.getOne({
        slug: this.slug
      })).data;

      if (Object.keys(response).length < 1) {
        return this.$router.push({ name: "error" });
      }
      this.item = response;
    },
    async getRecent() {
      // const response = (await contentService.articles.getOne({
      //   slug: this.slug
      // })).data;

      const list = (await contentService.articles.get()).data;

      console.log("list", list);
      this.list = list;

      // if (Object.keys(response).length < 1) {
      //   return this.$router.push({ name: "error" });
      // }
      // this.item = response;
    }
  },
  mounted() {
    this.get();
    this.getRecent();
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

h1 {
  font-size: 32px;
  line-height: 1.29em;
  font-weight: normal;
  color: #000;
  margin-bottom: 40px;
}

.categories {
  padding: 0;
  margin: 0;
  list-style-type: none;
  margin-bottom: 40px;

  a {
    color: #103324;
    text-decoration: none;
    font-size: 14px;
    font-weight: 300;
    line-height: 3em;
    color: #103324;
  }
}

.aside {
  padding-top: 115px;
}

.article-link {
  font-family: 'Lora', sans-serif;
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.18em;
  letter-spacing: normal;
  color: #103324;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.article-conntainer {
  padding-right: 30px;
}

.ui-tag {
  margin-bottom: 20px;
}

@media $media_lg {
  font-size: 36px;
}

.bg-hero {
  background-image: url('./../assets/img/banner2.jpg');
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url('https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg');
  display: flex;
  background-color: $c_primary;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

#share {
  width: 100%;
  margin: 100px auto;
  text-align: center;
}

/* buttons */
#share a {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 8px;
  border-radius: 50%;
  font-size: 24px;
  color: #fff;
  opacity: 0.75;
  transition: opacity 0.15s linear;
}

#share a:hover {
  opacity: 1;
}

/* icons */
#share i {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

/* colors */
.facebook {
  background: #3b5998;
}

.twitter {
  background: #55acee;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.googleplus {
  background: #dd4b39;
}

.linkedin {
  background: #0077b5;
}

.pinterest {
  background: #cb2027;
}

p {
  font-size: 24px;
  font-weight: 300;
  line-height: 1.83em;
  color: #000000;

  &.gray {
    color: #7e8f97;
  }
}

.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}

.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
