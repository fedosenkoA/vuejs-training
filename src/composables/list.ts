import { ref, Ref } from 'vue';
import { ListItem } from './listItem';

export interface List {
  id: number;
  name: string;
  items: ListItem[];
}
