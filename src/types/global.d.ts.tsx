// Desc: Global types for the Cursif
export { };

declare global {
  interface Page {
    id: string
    title: string
    content: string
    parent_id: number
    parent_type: string
    parent: Parent
    children: Page[]
  }

  interface Notebook {
    id: string
    title?: string
    description?: string
    owner_id?: number
    owner_type?: string
    pages?: Page[]
  }

  interface Parent {
    pages: Page[]
    notebooks: Notebook[]
  }
  interface NotebookList {
    notebooks: Notebook[];
  }  
}