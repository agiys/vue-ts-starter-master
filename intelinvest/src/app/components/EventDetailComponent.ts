import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  template: `
    <v-container>
      <v-card>
        <v-card-title>Детали события</v-card-title>
        <v-card-text>
          <p>Дата: {{ eventData.date }}</p>
          <p>Сумма: {{ eventData.totalAmount }}</p>
          <p>Количество: {{ eventData.quantity }}</p>
          <p>Название: {{ eventData.label }}</p>
          <p>Комментарий: {{ eventData.comment }}</p>
          <p>Период: {{ eventData.period }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  `
})
export default class EventDetailComponent extends Vue {
  @Prop() eventData!: any; 
}
