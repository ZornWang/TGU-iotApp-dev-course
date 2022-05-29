<template>
  <div style="text-align: center">
    <div>Child 2 Component</div>
    <div>message to father: <input v-model.trim="messageToFather" /></div>
  </div>
</template>

<script>
export default {
  name: 'ChildComponents2',
  data() {
    return {
      messageToFather: ''
    }
  },
  methods: {
    sendMessageToFather() {
      console.log(this.messageToFather)
      this.$emit('toFather', this.messageToFather)
    }
  },
  watch: {
    messageToFather: 'sendMessageToFather'
  }
}
</script>

<style></style>
