<template>
  <div class="container">
    <div>
      <div style="text-align: center">
        <div>Father Component</div>
        <div>Message to Child 1: <input v-model.trim="messageToChild1" /></div>
        <div>Message from Child 2: {{ messageFromChild2 }}</div>
      </div>
    </div>

    <ChildComponents1 :message="messageToChild1" />
    <ChildComponents2 @toFather="getMessageFromChild2" />
  </div>
</template>

<script>
import ChildComponents1 from './components/ChildComponents1.vue'
import ChildComponents2 from './components/ChildComponents2.vue'

export default {
  name: 'App',
  components: {
    ChildComponents1,
    ChildComponents2
  },
  data() {
    return {
      messageToChild1: '',
      messageFromChild2: ''
    }
  },
  methods: {
    getMessageFromChild2(message) {
      this.messageFromChild2 = message
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
