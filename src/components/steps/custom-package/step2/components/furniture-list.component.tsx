import React, { memo } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { get } from "local-storage";
import { CustomPackage } from "../../utils/submitting";
import _kebabCase from "lodash/fp/kebabCase";
// Components
import { Field } from "redux-form";
import { HiddenInput } from "../../../../all-components";
import FurnitureItem from "../../item/item.component";
// TS types
import { FurnitureItem as FurnitureItemType } from "../../../../../types/custom-package";

type OwnProps = {
    furniture: FurnitureItemType[];
    checked?: boolean;
    initialValue?: number;
    children?: never;
    category: string;
}
type Props = OwnProps

const FurnitureListComponent = (props: Props): React.ReactElement<Props> => {
    const { furniture, initialValue, category } = props;
    const checkedCategories: any = get(CustomPackage.CustomPackageStep2);

    return (
        <ul className={styles.list}>
            {
                furniture.map((item: FurnitureItemType) => {
                    const name = `${_kebabCase(category)}---${_kebabCase(item.label)}`;
                    let checked: boolean = false;

                    if (checkedCategories && typeof checkedCategories[name] === "undefined") {
                        checked = item.variation === "essential";
                    } else if (checkedCategories) {
                        checked = checkedCategories[name];
                    } else {
                        checked = item.variation === "essential";
                    }

                    return (
                        <li className={styles["list-item"]} key={item.value}>
                            <HiddenInput name={`${name}-id`} initialValue={item.value} />
                            <Field
                                name={name}
                                component={FurnitureItem}
                                title={item.label}
                                image={item.icon_url.url ? item.icon_url.url : item.remote_icon_url}
                                initialValue={initialValue ? initialValue : item.quantity > 0 ? item.quantity : 1}
                                checked={checked}
                            />
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default memo(FurnitureListComponent);
