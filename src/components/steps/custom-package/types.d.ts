export type Room = {
    value: number;
    label: string;
    is_public: boolean;
    icon_url: any,
    custom_label: string
}

export type Furniture = {
    icon_url: { url: null | string };
    is_public: boolean;
    label: string;
    value: number;
    style_design_categories_with_parent: FurnitureItem[];
}

export type FurnitureItem = {
    average_cost: string;
    icon_url: { url: null | string };
    is_backend: true;
    label: string;
    quantity: number;
    relation_id: number;
    remote_icon_url: string | null;
    value: number;
    variation: "essential" | "other" | "not_set";
    children: FurnitureItem[];
}

export type FilterFurniture = {
    label: string;
    essentials: FurnitureItem[];
    others: FurnitureItem[];
}
