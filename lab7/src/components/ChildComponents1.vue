<template>
  <div style="text-align: center">
    <div>Child 1 Component</div>
    <div>receive from father: {{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'ChildComponents1',
  props: {
    message: String
  }
}
</script>

<style></style>
