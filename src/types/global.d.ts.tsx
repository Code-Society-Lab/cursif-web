// Desc: Global types for the Cursif
export { };

declare global {
  interface Page {
    id: string
    title: string
    content: string
    parentId?: number
    parentType?: string
    parent: Parent
    children: Page[]
  }

  interface Notebook {
    id: string
    title?: string
    description?: string
    ownerId?: number
    ownerType?: string
    pages?: Page[]
  }

  interface Parent {
    pages: Page[]
    notebooks: Notebook[]
  }
}