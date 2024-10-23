export type SearchInput = {
  page: number,
  limit?: number
  sort?: string | null
  sort_dir?: 'asc' | 'desc'
  filter: string | null
}

export type SearcOutput<Model> = { 
  items: Model[]
  per_page: number
  total: number
  current_page: number
  sort: string | null
  sort_dir: string | null
}

export interface RepositoryInterface<Model, CreateProps> {
  creat(props: CreateProps): Model,
  insert(model: Model): Promise<Model>, 
  findById(id: string): Promise<Model | null>,
  update(model: Model): Promise<Model>,
  delete(id: string): Promise<void>,
  search(query: SearchInput): Promise<<SearchInput<Model>>
}
