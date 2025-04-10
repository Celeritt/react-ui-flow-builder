
export interface DataNode {
  name: string;
  children?: DataNode[];
  type?: 'schema' | 'file';
}

export interface Database {
  database: string;
  tables: string[];
}

export interface Region {
  name: string;
  data: Database[];
}

export interface City {
  city: string;
  regions: Region[];
}

export interface EnterpriseData {
  enterpriseDataViewer: DataNode;
  mapView: {
    worldMap: City[];
  };
}
