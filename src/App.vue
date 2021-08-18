<template>
  <div id="app">
    <div class="opt">
      count:
      <input
        type="range"
        placeholder="count"
        :min="1"
        :max="100000"
        :value="count"
        @input="count = Number($event.target.value)"
      />
      {{ count }}
    </div>
    <div class="examples">
      <div class="example">
        not using fragment:
        <button @click="notUsingFragmentInsert">insert</button>
        <button @click="notUsingFragmentToggle">toggle</button>
      </div>
      <div class="example">
        using fragment:
        <button @click="usingFragmentInsert">insert</button>
        <button @click="usingFragmentToggle">toggle</button>
      </div>
    </div>
    <div class="examples">
      <k-demo
        class="example"
        ref="kdemo1"
        :count="count"
        :usingFragment="false"
      />
      <k-demo class="example" ref="kdemo2" :count="count" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import KDemo from "./components/KDemo.vue";

export default Vue.extend({
  name: "fragment-demo",
  components: {
    KDemo
  },
  data() {
    return {
      count: 10000
    };
  },
  /**
   * chrome 使用 fragment 性能反而略低一点，不过也是在ms级别的差距
   * edge 与 chrome 表现基本一致
   * firefox 使用 fragment 性能略高一点，也是在ms界别的差距
   * safari 最有意思，使用 fragment 性能居然能快近20倍
   * ie？？ not to mention！
   */
  methods: {
    notUsingFragmentToggle() {
      (this.$refs.kdemo1 as any).toggle();
    },
    usingFragmentToggle() {
      (this.$refs.kdemo2 as any).toggle();
    },
    notUsingFragmentInsert() {
      (this.$refs.kdemo1 as any).insert();
    },
    usingFragmentInsert() {
      (this.$refs.kdemo2 as any).insert();
    }
  }
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.opt {
  /* position: fixed;
  top: 20px;
  right: 20px; */
  padding: 10px;
  /* border-radius: 8px; */
  background-color: rgba(133, 178, 119, 1);
  /* z-index: 2; */
  margin-bottom: 20px;
  text-align: center;
}
.examples {
  display: flex;
  margin: 0 20px;
}
.example {
  flex-grow: 1;
  button + button {
    margin-left: 5px;
  }
  & + & {
    margin-left: 20px;
  }
}
</style>
