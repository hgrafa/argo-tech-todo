export interface TodoDTO {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  dueDate?: Date;
}