import * as React from 'react';
import styles from './Menu.module.scss';
import { IMenuProps } from './IMenuProps';
import { Icon } from 'office-ui-fabric-react';

export default function Menu(props: IMenuProps) {
    return (
        <>
            <h1 className={styles.title}>Menu (PropertyFieldCollectionData)</h1>
            {props.collectionData.map(menuItem => {
                return <a href={menuItem.Url} className={styles.menuItem}>
                    <Icon iconName={menuItem.Icon}/>
                    <span>{menuItem.Title}</span>
                </a>;
            }
            )}
        </>
    );
}