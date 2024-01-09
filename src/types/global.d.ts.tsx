// Desc: Global types for the Cursif
export { };

declare global {
  interface User {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
  }

  interface PartialUser {
    id: string
    username: string
  }

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
    owner?: PartialUser
    pages?: Page[]
    lastUpdated: string
  }

  interface Parent {
    pages: Page[]
    notebooks: Notebook[]
  }
}