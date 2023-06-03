export interface IRole{
    id?: string;
    uid?: string;
    name: string;
    slug?: string;
    description?: string;
}

export interface IPermission{
    id?: string;
    uid?: string;
    feature: IFeature;
    role: IRole;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
}

export interface IFeature{
    id?: string;
    uid?: string;
    name: string;
    slug: string;
    icon?: string;
    subFeatures?: IFeature[]
}