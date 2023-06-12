<template>
  <div class="q-pa-none">
    <q-card flat bordered>
      <q-card-section padding>
        <h5 class="q-my-none userheader-2">Billing History</h5>
        <br />
        <q-virtual-scroll
          type="table"
          style="max-height: 20vh"
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :virtual-scroll-sticky-size-end="32"
          :items="getTransactionHistory()"
        >
          <template v-slot:before>
            <thead class="text-left history-header">
              <tr>
                <!-- <th>Index</th> -->
                <th v-for="col in columns" :key="'1--' + col.name">
                  {{ col.name }}
                </th>
              </tr>
            </thead>
          </template>

          <template v-slot="{ item: row, index }">
            <tr :key="index" class="history-body">
              <!-- <td>#{{ index }}</td> -->
              <td v-for="column in columns" :key="index + '-' + column.name">
                {{ row[column.prop] }}
              </td>
            </tr>
          </template>
        </q-virtual-scroll>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { billingService } from 'src/services/userSettings/billingService'

export default defineComponent({
  name: 'Billing',
  components: {},

  setup(_, { emit }) {
    const { getTransactions } = billingService()
    const columns = [
      { name: 'Date', prop: 'Date' },
      { name: 'Type', prop: 'Type' },
      { name: 'Payment Method', prop: 'Payment Method' },
      { name: 'TransactionId', prop: 'TransactionId' },
      { name: 'Price', prop: 'Price' }
    ]

    const getTransactionHistory = () => {
      console.log('getting user transaction history')
      const result = getTransactions()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result
    }

    return {
      getTransactionHistory,
      getTransactions,
      emit,
      columns,
    }
  }
})
</script>

<style lang="scss" scoped>
.history-header {
  font-size: 12px;
  color: #4209b4;
  font-style: normal;
  font-weight: 600;
  padding-top: 2%;
}

.history-body {
  font-size: 16px;
  color: #240561;
  font-style: normal;
  font-weight: 700;
}
</style>
