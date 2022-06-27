<template>
  <div>
    <top-bar></top-bar>
    <layout></layout>
  </div>
</template>
<script>
import Layout from '@/components/common/Layout'
import TopBar from '@/components/common/TopBar'
export default {
  components: { Layout, TopBar },
  methods: {
    onSearch() {
      console.log(1)
    }
  }
}
</script>
<style></style>
