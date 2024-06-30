import { Component, Vue } from 'vue-property-decorator';

@Component({
  template: `
    <v-container fluid class="selectable">
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="events"
            :items-per-page="itemsPerPage"
            item-key="date"
            class="elevation-1"
            @click:row="handleRowClick"
          >
            <template v-slot:item.checkbox="{ item }">
              <input type="checkbox" v-model="selectedEvents" :value="item" @click.stop class="styled-checkbox">
            </template>
  
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>События</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="showSelected">Показать выбранные</v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
  
          <div v-if="selectedSums" class="mt-4">
            <p v-for="(sum, type) in selectedSums" :key="type">{{ type }}: {{ sum }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  `
})
export default class EventsPage extends Vue {
  private events: any[] = [];
  private selectedEvents: any[] = [];
  private selectedSums: { [key: string]: number } | null = null;
  private itemsPerPage: number = 5;
  private headers: any[] = [
    { text: 'Выбор', value: 'checkbox', sortable: false },
    { text: 'Дата', value: 'date' },
    { text: 'Сумма', value: 'totalAmount' },
    { text: 'Количество', value: 'quantity' },
    { text: 'Название', value: 'label' },
    { text: 'Комментарий', value: 'comment' },
    { text: 'Период', value: 'period' }
  ];

  async created(): Promise<void> {
    await this.fetchEvents();
  }

  private async fetchEvents(): Promise<void> {
    try {
      const response = await fetch("http://localhost:3004/events");
      this.events = await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  private handleRowClick(event: any): void {
    const eventIdentifier = encodeURIComponent(event.date + event.label);
    this.$router.push({ name: 'event-detail', params: { identifier: eventIdentifier }, query: { eventData: JSON.stringify(event) } });
  }

  private showSelected(): void {
    const sums: { [key: string]: number } = {};
    this.selectedEvents.forEach((event: any) => {
      if (!sums[event.type]) {
        sums[event.type] = 0;
      }
      sums[event.type] += event.totalAmount;
    });
    this.selectedSums = sums;
  }
}

