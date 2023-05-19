export module BasicListApi {
  export interface Root {
    success: boolean;
    message: string;
    data: Data;
  }

  export interface Data {
    page: Page;
    layout: Layout;
    dataSource: DataSource[];
    meta: Meta;
  }

  export interface Page {
    title: string;
    type: string;
    searchBar: boolean;
    trash: boolean;
  }

  export interface Layout {
    tableColumn: TableColumn[];
    tableToolBar: TableToolBar[];
    batchToolBar: BatchToolBar[];
  }

  export interface TableColumn {
    title: string;
    dataIndex: string;
    key: string;
    type: string;
    data?: Daum[];
    hideInColumn?: boolean;
    sorter?: boolean;
    mode?: string;
    actions?: Action[];
  }

  export interface Daum {
    id?: number;
    parent_id?: number;
    name?: string;
    create_time?: string;
    delete_time: any;
    status?: number;
    value: any;
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
    component: string;
    text: string;
    type: string;
    action: string;
    uri: string;
    method?: string;
  }

  export interface TableToolBar {
    component: string;
    text: string;
    type: string;
    action: string;
    id?: string;
    uri?: string;
  }

  export interface BatchToolBar {
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
    delete_time: any;
    status: number;
    groups: Group[];
  }

  export interface Group {
    id: number;
    parent_id: number;
    name: string;
    create_time: string;
    update_time: string;
    delete_time: any;
    status: number;
    pivot: Pivot;
  }

  export interface Pivot {
    id: number;
    admin_id: number;
    group_id: number;
    create_time: string;
    update_time: string;
    delete_time: any;
    status: number;
  }

  export interface Meta {
    total: number;
    per_page: number;
    page: number;
  }
}
