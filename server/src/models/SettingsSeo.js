module.exports = (sequelize, DataTypes) =>
    sequelize.define('SettingsSeo', {
        index_title: {
            type: DataTypes.STRING,
          },
          index_title_lv: {
            type: DataTypes.STRING,
          },
          index_title_ru: {
            type: DataTypes.STRING,
          },
          index_desc: {
            type: DataTypes.TEXT,
          },
          index_desc_lv: {
            type: DataTypes.TEXT,
          },
          index_desc_ru: {
            type: DataTypes.TEXT,
          },
  
          events_title: {
            type: DataTypes.STRING,
          },
          events_title_lv: {
            type: DataTypes.STRING,
          },
          events_title_ru: {
            type: DataTypes.STRING,
          },
          events_desc: {
            type: DataTypes.TEXT,
          },
          events_desc_lv: {
            type: DataTypes.TEXT,
          },
          events_desc_ru: {
            type: DataTypes.TEXT,
          },
  
          articles_title: {
            type: DataTypes.STRING,
          },
          articles_title_lv: {
            type: DataTypes.STRING,
          },
          articles_title_ru: {
            type: DataTypes.STRING,
          },
          articles_desc: {
            type: DataTypes.TEXT,
          },
          articles_desc_lv: {
            type: DataTypes.TEXT,
          },
          articles_desc_ru: {
            type: DataTypes.TEXT,
          },
  
          w_proc_title: {
            type: DataTypes.STRING,
          },
          w_proc_title_lv: {
            type: DataTypes.STRING,
          },
          w_proc_title_ru: {
            type: DataTypes.STRING,
          },
          w_proc_desc: {
            type: DataTypes.TEXT,
          },
          w_proc_desc_lv: {
            type: DataTypes.TEXT,
          },
          w_proc_desc_ru: {
            type: DataTypes.TEXT,
          },
  
          w_prod_title: {
            type: DataTypes.STRING,
          },
          w_prod_title_lv: {
            type: DataTypes.STRING,
          },
          w_prod_title_ru: {
            type: DataTypes.STRING,
          },
          w_prod_desc: {
            type: DataTypes.TEXT,
          },
          w_prod_desc_lv: {
            type: DataTypes.TEXT,
          },
          w_prod_desc_ru: {
            type: DataTypes.TEXT,
          },
  
          contacts_title: {
            type: DataTypes.STRING,
          },
          contacts_title_lv: {
            type: DataTypes.STRING,
          },
          contacts_title_ru: {
            type: DataTypes.STRING,
          },
          contacts_desc: {
            type: DataTypes.TEXT,
          },
          contacts_desc_lv: {
            type: DataTypes.TEXT,
          },
          contacts_desc_ru: {
            type: DataTypes.TEXT,
          },
    })
