declare module "inputModels" {
  export interface IRequestInputModel {
    term?: string;
    field?: string;
    _page?: number;
    _limit?: number;
    order?: "asc" | "desc";
    sort?: "name" | "category";
  }
}
