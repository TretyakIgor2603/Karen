import React, { memo, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Components
import { Field } from "redux-form";
import { HiddenInput } from "../../../../all-components";
import FurnitureItem from "../../item/item.component";
// TS types
import { FurnitureItem as FurnitureItemType } from "../../types";

type OwnProps = {
    furniture: FurnitureItemType[];
    checked: boolean;
    initialValue?: number;
    children?: never;
}
type Props = OwnProps

const FurnitureListComponent = (props: Props): ReactElement<Props> => {
    const { furniture, initialValue, checked } = props;

    return (
        <ul className={styles.list}>
            {
                furniture.map((item: FurnitureItemType) => {
                    return (
                        <li className={styles["list-item"]} key={item.value}>
                            <HiddenInput name={`${item.label}-id`} initialValue={item.value} />
                            <Field
                                name={item.label}
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
