export interface TodoDTO {
  id: number;
  title: string;
  description?: string;
  status: 'Completed'| 'Pending' | 'Cancelled';
  dueDate?: Date;
}