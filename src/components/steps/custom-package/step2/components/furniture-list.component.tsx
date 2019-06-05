import React, { memo, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import _snakeCase from "lodash/fp/snakeCase";
// Components
import { Field } from "redux-form";
import FurnitureItem from "../../item/item.component";
// TS types
import { FurnitureItem as FurnitureItemType } from "../../types";

type OwnProps = {
    furniture: FurnitureItemType[];
    furnitureName: string;
    checked: boolean;
    initialValue?: number;
    children?: never;
}
type Props = OwnProps

const FurnitureListComponent = (props: Props): ReactElement<Props> => {
    const { furniture, furnitureName, initialValue, checked } = props;

    return (
        <ul className={styles.list}>
            {
                furniture.map((item: FurnitureItemType) => {
                    const name = _snakeCase(`${furnitureName}-${item.label}`);

                    return (
                        <li className={styles["list-item"]} key={name}>
                            <Field
                                name={name}
                                component={FurnitureItem}
                                title={item.label}
                                image={item.icon_url.url ? item.icon_url.url : item.remote_icon_url}
                                initialValue={initialValue ? initialValue : item.quantity}
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
