<template>
  <div class="box">
    <!-- <div class="head">
      insert duration: {{ jingweiDuration }}ms
      <br />
      toggle duration: {{ toggleDuration }}ms
    </div> -->
    <div class="content">
      <div class="left" ref="left"></div>
      <div class="right" ref="right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { foolishMan, jingwei } from "./utils";

export default Vue.extend({
  name: "k-demo",
  props: {
    count: {
      type: Number,
      required: false,
      default: 100
    },
    usingFragment: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      toggleStartTime: 0,
      toggleEndTime: 0,
      toggleDuration: 0,
      jingweiStartTime: 0,
      jingweiEndTime: 0,
      jingweiDuration: 0
    };
  },
  methods: {
    toggle() {
      const left = this.$refs.left as HTMLDivElement;
      const right = this.$refs.right as HTMLDivElement;
      const isLeft = left.children.length > 0;
      const children = Array.from(isLeft ? left.children : right.children);
      const target = isLeft ? right : left;
      const toggleStartTime = performance.now();
      foolishMan(children, target, this.usingFragment);
      const toggleEndTime = performance.now();
      const toggleDuration = toggleEndTime - toggleStartTime;
      const style = this.usingFragment
        ? "background-color:green;color: white"
        : "background-color:blue;color: white";
      console.log(
        `%c ${this.usingFragment ? "" : "not "}using fragment toggle duration:`,
        style,
        `${toggleDuration}ms`
      );
    },
    insert() {
      const left = this.$refs.left as HTMLDivElement;
      const jingweiStartTime = performance.now();
      jingwei(this.count, left, this.usingFragment);
      const jingweiEndTime = performance.now();
      const jingweiDuration = jingweiEndTime - jingweiStartTime;
      const style = this.usingFragment
        ? "background-color:green;color: white"
        : "background-color:blue;color: white";
      console.log(
        `%c ${this.usingFragment ? "" : "not "}using fragment insert duration:`,
        style,
        `${jingweiDuration}ms`
      );
    }
  }
});
</script>

<style lang="scss">
.box {
  border: 1px solid lightsalmon;
}
.head {
  text-align: center;
  padding: 10px;
  line-height: 20px;
  border-bottom: 1px solid lightsalmon;
}
.content {
  height: 500px;
  display: flex;
  align-items: stretch;
  overflow: auto;
}
.left,
.right {
  overflow: auto;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}
.left {
  border-right: 1px solid lightsalmon;
}
.item {
  background: #74d1b5;
  border: 2px solid #9cdeb1;
  height: 20px;
  margin: 5px 5px 5px;
}
</style>
