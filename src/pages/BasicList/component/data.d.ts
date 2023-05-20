declare module PageApi {
  export interface Root {
    success: boolean;
    message: string;
    data: Data;
  }

  export interface Data {
    page: Page;
    layout: Layout;
    dataSource: DataSource;
  }

  export interface Page {
    title: string;
    type: string;
  }

  export interface Layout {
    tabs: Tab[];
    actions: Action[];
  }

  export interface Tab {
    name: string;
    title: string;
    data: Daum[];
  }

  export interface Daum {
    title: string;
    dataIndex: string;
    key: string;
    type: string;
    disabled?: boolean;
    data?: Daum2[];
  }

  export interface Daum2 {
    id?: number;
    parent_id?: number;
    name?: string;
    create_time?: string;
    delete_time: any;
    status?: number;
    value: number;
    title: string;
    depth?: number;
    children?: Children[];
  }

  export interface Children {
    id: number;
    parent_id: number;
    name: string;
    create_time: string;
    delete_time: any;
    status: number;
    value: number;
    title: string;
    depth: number;
    children?: Children2[];
  }

  export interface Children2 {
    id: number;
    parent_id: number;
    name: string;
    create_time: string;
    delete_time: any;
    status: number;
    value: number;
    title: string;
    depth: number;
  }

  export interface Action {
    name: string;
    title: string;
    data: Daum3[];
  }

  export interface Daum3 {
    component: string;
    text: string;
    type: string;
    action: string;
    uri?: string;
    method?: string;
  }

  export interface DataSource {
    id: number;
    username: string;
    display_name: string;
    create_time: string;
    update_time: string;
    status: number;
    groups: number[];
  }
}
