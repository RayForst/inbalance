<template lang="pug">
  transition(name="modal")
    .modal-mask
      .modal-wrapper(@click.self="close")
        .modal-container
          i.close(
            @click="close"
          ) +
          <slot></slot>
</template>

<script>
import EventBus from "@/event-bus";

export default {
  name: "modal",
  data() {
    return {};
  },
  components: {},
  methods: {
    close() {
      EventBus.$emit("modal-close", true);
    }
  }
};
</script>


<style lang="stylus">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  justify-content: center;
  align-items: flex-start;

  .close {
    position: absolute;
    right: 19px;
    top: 0px;
    font-weight: normal;
    font-style: normal;
    font-size: 30px;
    z-index: 9999;
    transform: rotate(-45deg);
    padding: 10px;
    cursor: pointer;
  }

  .card {
    width: 100%;
    margin-bottom: 0;
  }
}

.modal-wrapper {
  display: flex;
  width: 100%;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  position: sticky;
  top: 0;
  align-items: center;
  overflow: hidden;
}

.modal-container {
  width: 90%;
  max-width: 700px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
  display: flex;
  padding: 30px;
  box-sizing: border-box;
  max-height: 100%;
  overflow: auto;
  align-items: flex-start;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container, .modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
