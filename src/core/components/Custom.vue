<template>
<section>
  <!-- For custom templates added as a Single CARD -->
  <template v-if="isSingle">
    <div class="kai-row"></div>
    <div class="kai-card-wraper">
      <section>
        <CustomKIMCard v-if="item.type === 'KIM_CARD'" :item="item"></CustomKIMCard>
        <CustomConciergeCard v-if="item.type === 'CONCIERGE_CARD'" :item="item"></CustomConciergeCard>
      </section>
    </div>
  </template>
  <!-- For custom templates added as a multiple CARDs -->
  <template v-else>
    <CustomKIMCard v-if="item.type === 'KIM_CARD'" :item="item"></CustomKIMCard>
    <CustomConciergeCard v-if="item.type === 'CONCIERGE_CARD'" :item="item"></CustomConciergeCard>
  </template>
  <!-- For other custom templates that are not following the CARD approach -->
  <Search v-if="item.type === 'WEB_SEARCH' || item.type === 'WEB_SEARCH_GOOGLE' || item.type === 'WEB_SEARCH_SILVERCLOUD'" :item="item"></Search>
  <!-- For Charts -->
  <Chart v-if="item.type === 'CHART'" :item="item"></Chart>
</section>
</template>

<script>
import CustomKIMCard from './CustomKIMCard'
import CustomConciergeCard from './CustomConciergeCard'
import Search from './Search'
import Chart from './Chart'

export default {
  name: 'Custom',
  props: ['item', 'isSingle'],
  components: {
    CustomKIMCard,
    CustomConciergeCard,
    Search,
    Chart
  }
}
</script>
